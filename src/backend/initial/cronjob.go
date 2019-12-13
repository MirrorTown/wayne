package initial

import (
	"github.com/Qihoo360/wayne/src/backend/apimachinery/cronjob"
	"github.com/Qihoo360/wayne/src/backend/apimachinery/evnetListenter"
)

func InitCronJob() {
	job := cronjob.CronJob{}
	job.Name = "发布状态定时任务"

	job.StartDeployStatuJob()

	tektonJob := cronjob.Tekton{}
	tektonJob.Name = "tekton定时任务"

	tektonJob.StartTektonCron()

	podevent := evnetListenter.PodeEvent{}
	podevent.ListenPod()
}
