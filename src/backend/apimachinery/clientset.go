package apimachinery

import (
	"bytes"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery/deploy"
	"github.com/Qihoo360/wayne/src/backend/client"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
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
	/*robot := dingrobot.New(beego.AppConfig.String("access_token"))
	robot.AtMobiles(mobile).Markdown("发布通知", msg)*/
	webHook := "https://oapi.dingtalk.com/robot/send?access_token=" + beego.AppConfig.String("access_token")
	content := `{"msgtype": "text",
				"text": {
				"title": "发布通知",
				"content": "%s"
				},
				"at": {
					"atMobiles": [
						"%s"
					],
					"isAtAll": "false"
					}
				}`
	//创建一个请求
	body := fmt.Sprintf(content, msg, mobile)
	jsonValue := []byte(body)
	req, err := http.NewRequest("POST", webHook, bytes.NewBuffer(jsonValue))
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

func (*ClientSet) Manager(cluster string) *client.ClusterManager {
	kubeManager, err := client.Manager(cluster)
	if err != nil {
		logs.Error(err)
	}
	return kubeManager
}
