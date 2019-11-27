package models

const (
	Deploying    = "发布中"
	DeploySuc    = "发布成功"
	DeployReject = "审核拒绝"
	DeployWait   = "等待审核"
	DeployFail   = "发布异常"
	RUNNING      = "Running"
	PENDDING     = "Pendding"
	Notified     = 1
	ToBeNotify   = 0
)

const (
	StepNotBegin   = -999
	StepBegin      = 0
	StepVerify     = 1
	StepVerifyFail = -1
	StepDeploy     = 2
	StepOverSuc    = 3
	StepOverFail   = -3
)
