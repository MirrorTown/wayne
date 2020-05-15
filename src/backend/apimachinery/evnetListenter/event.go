package evnetListenter

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/apimachinery/deploy"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/astaxie/beego"
	"strings"
	"time"

	//kubeinformers "k8s.io/client-go/informers"
	"k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/fields"
	"k8s.io/client-go/tools/cache"
)

type PodeEvent struct {
	cluster   string
	namespace string
}

func (p *PodeEvent) ListenPod() {
	//ticker := time.NewTicker(time.Second * 10)
	//select {

	//case t := <-ticker.C:
	//	fmt.Println(t.String())
	time.Sleep(time.Second * 10)
	var cli apimachinery.ClientSet

	clusterList, err := models.ClusterModel.GetAllNormal()
	if err != nil {
		logs.Error(err)
	}

	nsList := beego.AppConfig.Strings("pod_namespace")

	for _, cluster := range clusterList {
		clientset := cli.Manager(cluster.Name).Client

		for _, ns := range nsList {
			//kubeinformers.NewSharedInformerFactory(clientset, time.Second*30).Core().V1().Events().Informer().AddEventHandler()
			watchlist := cache.NewListWatchFromClient(clientset.CoreV1().RESTClient(), string(v1.ResourcePods), ns,
				fields.Everything())
			_, controller := cache.NewInformer(
				watchlist,
				&v1.Pod{},
				time.Second*0,
				cache.ResourceEventHandlerFuncs{
					AddFunc: func(obj interface{}) {
						fmt.Printf("add: %s %s \n", obj.(*v1.Pod).Name, obj.(*v1.Pod).Status.Phase)
					},
					DeleteFunc: func(obj interface{}) {
						fmt.Printf("delete:%s %s \n", obj.(*v1.Pod).Name, obj.(*v1.Pod).Status.Phase)
					},
					UpdateFunc: func(oldObj, newObj interface{}) {
						//监听短暂性任务结果
						if (newObj.(*v1.Pod).Status.Phase == "Succeeded" && oldObj.(*v1.Pod).Status.Phase == "Succeeded") || (newObj.(*v1.Pod).Status.Phase == "Failed" && oldObj.(*v1.Pod).Status.Phase == "Failed") {
							name := newObj.(*v1.Pod).Labels["tekton.dev/pipelineRun"]
							if name != "" {
								s := strings.Split(name, "-")
								if newObj.(*v1.Pod).Status.Phase == "Succeeded" && oldObj.(*v1.Pod).Status.Phase == "Succeeded" {
									_ = models.TektonBuildModel.UpdateByExecuteId(s[len(s)-1], 4)
								} else if newObj.(*v1.Pod).Status.Phase == "Failed" && oldObj.(*v1.Pod).Status.Phase == "Failed" {
									_ = models.TektonBuildModel.UpdateByExecuteId(s[len(s)-1], -3)
								}
							}
							fmt.Printf("old:%s %s, new:%s %s \n", oldObj.(*v1.Pod).Name, oldObj.(*v1.Pod).Status.Phase, newObj.(*v1.Pod).Name, newObj.(*v1.Pod).Status.Phase)
						} else if newObj.(*v1.Pod).Status.ContainerStatuses != nil && oldObj.(*v1.Pod).Status.ContainerStatuses != nil &&
							newObj.(*v1.Pod).Status.ContainerStatuses[0].RestartCount > oldObj.(*v1.Pod).Status.ContainerStatuses[0].RestartCount {
							msg := fmt.Sprintf(deploy.RESTARTWARN, newObj.(*v1.Pod).Status.Phase, newObj.(*v1.Pod).Name, newObj.(*v1.Pod).Status.ContainerStatuses[0].RestartCount, time.Now().Format("2006 01/02 15:04:05.000"))
							err := cli.NotifyToDingding(msg, "")
							if err != nil {
								logs.Error("发送DingTalk失败, ", err)
							}
						}
					},
				},
			)
			stop := make(chan struct{})
			//defer close(stop)
			go controller.Run(stop)
		}
	}

}
