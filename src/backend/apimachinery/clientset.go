package apimachinery

import (
	"bytes"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery/deploy"
	"github.com/Qihoo360/wayne/src/backend/client"
	"github.com/astaxie/beego"
	"net/http"
)

type ClientSetInterface interface {
	DeployServer() deploy.DeployInterface
}

type ClientSet struct {
	Client       client.ResourceHandler
	Cluster      string
	Name         string
	User         string
	Namespace    string
	ResourceName string
	ResourceType string
	Status       string
	Notify       int
}

func (cs *ClientSet) DeployServer() deploy.DeployInterface {
	return deploy.NewDeployInterface(cs.User, cs.Name, cs.Cluster, cs.Namespace, cs.ResourceName, cs.ResourceType, cs.Status, cs.Notify)
}

//NotifyToDingding
func (cs *ClientSet) NotifyToDingding(msg string, mobile string) (err error) {
	//请求地址模板
	webHook := "https://oapi.dingtalk.com/robot/send?access_token=" + beego.AppConfig.String("access_token")
	content := `{"msgtype": "markdown",
				"markdown": {
				"title": "发布通知",
				"text": "%s"
				},
				"at": {
					"atMobiles": [
						"%s"
					],
					"isAtAll": "False"
					}
				}`
	//创建一个请求
	body := fmt.Sprintf(content, msg, mobile)
	fmt.Println(body)
	jsonValue := []byte(body)
	req, err := http.NewRequest("POST", webHook, bytes.NewBuffer(jsonValue))
	if err != nil {
		// handle error
		panic(err)
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
		panic(err)
	}

	return nil
}

func (*ClientSet) Manager(cluster string) *client.ClusterManager {
	kubeManager, err := client.Manager(cluster)
	if err != nil {
		panic(err)
	}
	return kubeManager
}
