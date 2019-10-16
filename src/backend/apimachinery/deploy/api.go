package deploy

import (
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

func (d *deploy) GetDeployStatus() string {
	m := models.Deploy{
		Name:   d.publishName,
		Status: d.publishStatus,
	}

	publishStatus, err := m.GetPublishStatusByName()
	if err != nil {
		panic(err)
	}
	return publishStatus
}

func (d *deploy) UpdateDeployStatus(status string, notify int) string {
	m := models.Deploy{
		User:   d.publishUser,
		Name:   d.publishName,
		Cluster: d.publishCluster,
		Namespace:  d.publishNamespace,
		ResourceName: d.publishResourceName,
		ResourceType: d.publishResourceType,
		Status: status,
		Notify: notify,
	}

	err := m.UpdatePublishStatus(&m)
	if err != nil {
		logs.Error("update deploy status failed, " , err)
	}

	return "ok"
}

func (d *deploy) GetDeploys() ([]models.Deploy) {
	m := models.Deploy{}

	filter := make(map[string]interface{})
	filter["status"] = d.publishStatus
	filter["notify"] = d.notify
	deploys, err := m.GetDeploys(filter)
	if err != nil {
		panic(err)
	}
	return deploys
}
