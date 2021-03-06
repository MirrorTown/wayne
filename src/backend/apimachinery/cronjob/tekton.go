package cronjob

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/client"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/resources/crd"
	"github.com/Qihoo360/wayne/src/backend/resources/proxy"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/robfig/cron"
	"time"
)

type Tekton struct {
	Name string
}

func (t *Tekton) StartTektonCron() (err error) {
	var cli apimachinery.ClientSet

	go func() {
		defer func() {
			if err := recover(); err != nil {
				fmt.Println(err)
				logs.Error(err)
			}
		}()
		tpns := beego.AppConfig.Strings("tekton_pod_namespace")

		for range time.Tick(time.Second * 10) {
			//tektonList, err := models.TektonModel.GetAllNeedCheck()
			clusterList, err := models.ClusterModel.GetAllNormal()
			if err != nil {
				logs.Error(err)
			}
			for _, cluster := range clusterList {
				for _, ns := range tpns {
					client := cli.Manager(cluster.Name)
					//namespace := "wireless-ci"
					if client == nil {
						continue
					}
					kind := "pods"
					result, err := proxy.GetTekton(client.KubeClient, kind, ns)
					if err != nil {
						logs.Error(err)
					}
					t.HandlerTekton(client, ns, cluster.Name, result)

				}
			}
		}
	}()

	return nil
}

//这边调用tekton启动pipeline行为是创建Run非重复使用Run，所以需要清理太久的无用元信息
func (t *Tekton) CleanTektonCRD() {
	var cli apimachinery.ClientSet

	c := cron.New()
	tCrdNSs := beego.AppConfig.Strings("tekton_crd_namespace")
	c.AddFunc("@daily", func() {
		clusterList, err := models.ClusterModel.GetAllNormal()
		if err != nil {
			logs.Error(err)
		}
		for _, cluster := range clusterList {
			for _, ns := range tCrdNSs {
				client := cli.Manager(cluster.Name)
				err := crd.CleanCustomCRDDelList(client.Client, "tekton.dev", "v1alpha1", ns)
				if err != nil {
					logs.Error(err)
				}
			}
		}
	})

	c.Start()
}

func (t *Tekton) HandlerTekton(client *client.ClusterManager, ns string, cluster string, result []proxy.PodCell) {
	for _, pod := range result {
		if pod.Status.Phase == "Succeeded" || pod.Status.Phase == "Failed" {
			var status int32 = models.TektonStatusCheck
			lableMap := t.GetPodLableMap(pod)
			name := lableMap["tekton.dev/pipelineRun"]
			if name == "" {
				continue
			}
			s := strings.Split(name, "-")
			if pod.Status.Phase == "Succeeded" {
				status = models.TektonStatusSuc
				_ = models.TektonBuildModel.UpdateByExecuteId(s[len(s)-1], 4)
			} else {
				status = models.TektonStatusFail
				_ = models.TektonBuildModel.UpdateByExecuteId(s[len(s)-1], -3)
				//新流程muji 回调构建失败结果需要 name="muji-build-128-prod-2020070809-1" or name="muji-build-128-2020070809-1"
				if strings.Contains(name, "muji") {
					logs.Info("muji name: ", s, s[len(s)-2])
					recordId, _ := strconv.Atoi(s[len(s)-2])
					callbackUrl := beego.AppConfig.String("muji_callback_url_test")
					if strings.Contains(name, "prod") {
						callbackUrl = beego.AppConfig.String("muji_callback_url_prod")
						go t.callbackFailed2Muji(recordId, callbackUrl)
					} else {
						go t.callbackFailed2Muji(recordId, callbackUrl)
					}

				}
			}
			crdData, err := crd.GetCustomCRD(client.Client, "tekton.dev", "v1alpha1", "pipelineruns", ns, name)
			if err != nil {
				logs.Error("获取pipelineruns crd信息失败, ", err)
				return
			}
			newMetaData, err := json.Marshal(&crdData)
			if err != nil {
				logs.Error("deployment metadata marshal error.%v", err)
				return
			}

			gitRegexp := regexp.MustCompile(`git@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w]).*?\.git?`)
			gitParam := gitRegexp.FindString(string(newMetaData))
			fmt.Println("git: " + gitParam)

			tekton := &models.Tekton{
				Name:      name,
				Group:     "tekton.dev",
				Version:   "v1alpha1",
				Kind:      "pipelineruns",
				Cluster:   cluster,
				Namespace: ns,
				Git:       gitParam,
				MetaData:  string(newMetaData),
				Status:    status,
			}
			err = models.TektonModel.AddOrUpdate(tekton)
			if err != nil {
				logs.Error(err)
			}

			defaultPropagationPolicy := meta_v1.DeletePropagationBackground
			defaultDeleteOptions := meta_v1.DeleteOptions{
				PropagationPolicy: &defaultPropagationPolicy,
			}
			err = client.KubeClient.Delete("pods", ns, pod.ObjectMeta.Name, &defaultDeleteOptions)
			if err != nil {
				logs.Error(err)
			}
		}
	}
}

func (t *Tekton) GetPodLableMap(pod proxy.PodCell) map[string]string {
	lableMap := make(map[string]string)
	lableMap = pod.Labels
	return lableMap
}

func (t *Tekton) callbackFailed2Muji(recordId int, callbackUrl string) (err error) {
	defer func() {
		if err := recover(); err != nil {
			logs.Error("回调请求失败, ", err)
		}
	}()
	//请求地址模板
	content := `{"status": "failed","notifyParams": {"recordId": %d}}`
	//创建一个请求
	body := fmt.Sprintf(content, recordId)
	jsonValue := []byte(body)
	req, err := http.NewRequest("POST", callbackUrl, bytes.NewBuffer(jsonValue))
	if err != nil {
		// handle error
		logs.Error(err)
	}

	client := &http.Client{}
	//设置请求头
	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	//发送请求
	resp, err := client.Do(req)
	//关闭请求
	defer resp.Body.Close()

	if err != nil {
		// handle error
		logs.Error(err)
	}

	return nil
}
