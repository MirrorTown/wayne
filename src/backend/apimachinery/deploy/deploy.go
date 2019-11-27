package deploy

import "github.com/Qihoo360/wayne/src/backend/models"

type DeployInterface interface {
	GetDeploys() []models.Deploy
	GetDeployStatus() models.Deploy
	UpdateDeployStatus(status string, notify int) string
}

func NewDeployInterface(User string, Name string, Cluster string, Namespace string, ResourceName string, ResourceType string, Status string, notify int) DeployInterface {
	return &deploy{
		publishUser:         User,
		publishName:         Name,
		publishCluster:      Cluster,
		publishNamespace:    Namespace,
		publishResourceName: ResourceName,
		publishResourceType: ResourceType,
		publishStatus:       Status,
		notify:              notify,
	}
}

type deploy struct {
	publishUser         string
	publishName         string
	publishCluster      string
	publishNamespace    string
	publishResourceName string
	publishResourceType string
	publishStatus       string
	notify              int
}
