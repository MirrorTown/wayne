package deploy

import (
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

func (d *deploy) GetDeployStatus() (models.Deploy, error) {
	m := models.Deploy{
		Name:   d.publishName,
		Status: d.publishStatus,
	}

	publishStatus, err := m.GetPublishStatusByName()
	return publishStatus, err
}

func (d *deploy) UpdateDeployStatus(status string, notify int) string {
	m := models.Deploy{
		User:         d.publishUser,
		Name:         d.publishName,
		Cluster:      d.publishCluster,
		Namespace:    d.publishNamespace,
		ResourceName: d.publishResourceName,
		ResourceType: d.publishResourceType,
		Status:       status,
		Notify:       notify,
	}

	//发布成功或异常 可设定发布流程结束
	if status == models.DeploySuc || status == models.DeployFail {
		m.Stepflow = 2
	} else if status == models.Deploying {
		m.Stepflow = 1
	}
	err := m.UpdatePublishStatus(&m)
	if err != nil {
		logs.Error("update deploy status failed, ", err)
	}

	return "ok"
}

func (d *deploy) GetDeploys() []models.Deploy {
	m := models.Deploy{}

	filter := make(map[string]interface{})
	filter["status"] = d.publishStatus
	filter["notify"] = d.notify
	deploys, err := m.GetDeploys(filter)
	if err != nil {
		logs.Error("get deploy error, ", err)
	}
	return deploys
}
