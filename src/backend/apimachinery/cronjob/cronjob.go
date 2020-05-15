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
	mm, _ := time.ParseDuration("5m")

	go func() {
		defer func() {
			if err := recover(); err != nil {
				logs.Error(err)
			}
			_ = cli.NotifyToDingding("wayne流程检查定时任务失败，请检查!", "18768129565")
		}()
		for range time.Tick(time.Second * 10) {
			//获取发布列表
			deploylist := cli.DeployServer().GetDeploys()
			for _, sub := range deploylist {
				logs.Info("step 1")
				var client = cli.Manager(sub.Cluster)
				if client == nil {
					continue
				}
				podlist, err := pod.GetPodListByType(client.KubeClient, sub.Namespace, sub.ResourceName, sub.ResourceType)
				if err != nil {
					logs.Error("获取pod列表失败, ", err)
				}
				//var sendFlag bool
				logs.Info("step 2")
				var sendFlag bool = true
				if sub.Status == models.Deploying && len(podlist) > 0 {
					for _, podSpec := range podlist {
						//当容器状态非Ready时处理方法,并剔除被终止的deployment影响
						if sub.UpdateTime.Add(mm).Unix() < time.Now().Unix() && (podSpec.Status.ContainerStatuses == nil || len(podSpec.Status.ContainerStatuses) == 0) {
							logs.Error("k8s资源不足，请检查!")
							_ = cli.NotifyToDingding("k8s资源不足，请检查!", "18768129565")
							continue
						} else if podSpec.Status.ContainerStatuses == nil {
							logs.Info("step2.1")
							sendFlag = false
							break
						}
						logs.Info("step 3")
						if podSpec.ObjectMeta.DeletionTimestamp.IsZero() && podSpec.Status.ContainerStatuses[0].Ready == false &&
							podSpec.ObjectMeta.Labels["work-app"] == sub.ResourceName {
							logs.Info("step 4")
							//容器重启或则超出超市时间，将强制发布失败
							if podSpec.Status.ContainerStatuses[0].RestartCount > 0 || sub.UpdateTime.Add(mm).Unix() < time.Now().Unix() {
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
						//由正式发布完成后自动删除灰度容器；由灰度发布后成功的容器不删除
						if !strings.Contains(sub.ResourceName, "grayscale") {
							err := deployment.DeleteDeployment(cli.Manager(sub.Cluster).Client, sub.ResourceName+"-grayscale", sub.Namespace)
							if err != nil {
								logs.Info("Cann't Delete deployment (%s) by cluster (%s). Because %v", sub.Name, sub.Cluster, err)
							}
						}
					}
				}

				time.Sleep(1 * time.Second)
			}
		}
	}()

	return nil
}

func senfMsg(status string, notify int, sub models.Deploy, cli apimachinery.ClientSet) error {
	sub.Status = status
	sub.Notify = notify
	cli.User, cli.Name, cli.ResourceType, cli.ResourceName, cli.Cluster, cli.Namespace =
		sub.User, sub.Name, sub.ResourceType, sub.ResourceName, sub.Cluster, sub.Namespace
	//发布成功
	cli.DeployServer().UpdateDeployStatus(sub.Status, sub.Notify)
	user, _ := models.UserModel.GetUserByDisplay(sub.User)
	var msg string
	if strings.Contains(sub.ResourceName, "grayscale") {
		msg = fmt.Sprintf(deploy.RELEASEBEGIN, deploy.GRAY, sub.Status, sub.Name, sub.User, time.Now().Unix()-sub.UpdateTime.Unix(),
			sub.UpdateTime.Format("2006 01/02 15:04:05.000"))
	} else {
		msg = fmt.Sprintf(deploy.RELEASEBEGIN, deploy.PROD, sub.Status, sub.Name, sub.User, time.Now().Unix()-sub.UpdateTime.Unix(),
			sub.UpdateTime.Format("2006 01/02 15:04:05.000"))
	}
	err := cli.NotifyToDingding(msg, user.Name)
	if err != nil {
		logs.Error("发送DingTalk失败, ", err)
	}
	return nil
}
