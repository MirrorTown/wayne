package cronjob

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/apimachinery/deploy"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/resources/deployment"
	"github.com/Qihoo360/wayne/src/backend/resources/pod"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"strings"
	"time"
)

type CronJob struct {
	Name string
}

//StartDeployStatuJob 发布状态定时任务 最好改为分布式定时任务
func (c *CronJob) StartDeployStatuJob() (err error) {
	var cli apimachinery.ClientSet
	cli.Status = models.Deploying
	cli.Notify = models.ToBeNotify

	go func() {
		fmt.Println("enter")
		for range time.Tick(time.Second * 10) {
			//获取发布列表
			deploylist := cli.DeployServer().GetDeploys()
			for _, sub := range deploylist {
				//TODO 检测pod发布状态，同步到数据库并发送订订信息
				podlist,err := pod.GetPodListByType(cli.Manager(sub.Cluster).KubeClient,sub.Namespace, sub.ResourceName, sub.ResourceType)
				if err != nil {
					logs.Error("获取pod列表失败, ", err)
				}
				//var sendFlag bool
				var sendFlag bool = true
				if sub.Status == models.Deploying && len(podlist) >0 {
					for _, podSpec := range podlist {
						//当容器状态非Ready时处理方法,并剔除被终止的deployment影响
						if podSpec.ObjectMeta.DeletionTimestamp.IsZero() && podSpec.Status.ContainerStatuses[0].Ready == false{
							if podSpec.Status.ContainerStatuses[0].RestartCount > 0 {
								//发送发布失败信息
								senfMsg(models.DeployFail, models.Notified, sub, cli)
							}
							sendFlag = false
							break
						}
					}
					//发布成功并可通知状态
					if sendFlag && sub.Notify == models.ToBeNotify {
						senfMsg(models.DeploySuc, models.Notified, sub, cli)
						//发布完成后自动删除灰度容器
						if !strings.Contains(sub.ResourceName, "grayscale") {
							err := deployment.DeleteDeployment(cli.Manager(sub.Cluster).Client, sub.ResourceName + "-grayscale", sub.Namespace)
							if err != nil {
								logs.Info("Cann't Delete deployment (%s) by cluster (%s). Because %v", sub.Name, sub.Cluster, err)
							}
						}
					}
				}

				time.Sleep(2*time.Second)
			}
		}
	}()

	fmt.Println("out")
	return nil
}

func senfMsg(status string, notify int, sub models.Deploy, cli apimachinery.ClientSet ) error {
	sub.Status = status
	sub.Notify = notify
	cli.User, cli.Name, cli.ResourceType, cli.ResourceName, cli.Cluster, cli.Namespace =
		sub.User, sub.Name, sub.ResourceType, sub.ResourceName, sub.Cluster, sub.Namespace
	//发布成功
	cli.DeployServer().UpdateDeployStatus(sub.Status, sub.Notify)
	msg := fmt.Sprintf(deploy.RELEASEBEGIN, sub.Status, sub.Name, sub.User, time.Now().Unix()-sub.UpdateTime.Unix(), time.Now().Format("2006 01/02 15:04:05.000"))
	fmt.Println(msg)
	//err := cli.NotifyToDingding(msg, "1876xxxxx65")
	return nil
}
