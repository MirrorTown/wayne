package initial

import "github.com/Qihoo360/wayne/src/backend/apimachinery/cronjob"

func InitCronJob()  {
	job := cronjob.CronJob{}
	job.Name = "发布状态定时任务"

	job.StartDeployStatuJob()
}
