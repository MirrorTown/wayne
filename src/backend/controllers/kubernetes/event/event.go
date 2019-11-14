package event

import (
	"fmt"
	"net/http"

	"github.com/Qihoo360/wayne/src/backend/client/api"
	"github.com/Qihoo360/wayne/src/backend/common"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	erroresult "github.com/Qihoo360/wayne/src/backend/models/response/errors"
	"github.com/Qihoo360/wayne/src/backend/resources/event"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

type KubeEventController struct {
	base.APIController
}

func (c *KubeEventController) URLMapping() {
	c.Mapping("List", c.List)
	c.Mapping("ListEvent", c.ListEvent)
}

func (c *KubeEventController) Prepare() {
	// Check administration
	/*c.APIController.Prepare()

	methodActionMap := map[string]string{
		"List": models.PermissionRead,
		"ListEvent": models.PermissionRead,
	}
	_, method := c.GetControllerAndAction()
	c.PreparePermission(methodActionMap, method, models.PermissionTypeKubePod)*/
}

// @Title GetPodEvent
// @Description Get Pod Event by resource type and name
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Param	type		query 	string	true		"the query type. deployments, statefulsets, daemonsets,cronjobs"
// @Param	name		query 	string	true		"the query resource name."
// @Success 200 {object} models.Deployment success
// @router /namespaces/:namespace/clusters/:cluster [get]
func (c *KubeEventController) List() {
	cluster := c.Ctx.Input.Param(":cluster")
	namespace := c.Ctx.Input.Param(":namespace")
	resourceType := c.Input().Get("type")
	resourceName := c.Input().Get("name")
	param := c.BuildKubernetesQueryParam()
	manager := c.Manager(cluster)
	var result *common.Page
	var err error
	switch resourceType {
	case api.ResourceNameCronJob:
		result, err = event.GetPodsEventByCronJobPage(manager.KubeClient, namespace, resourceName, param)
	default:
		err = &erroresult.ErrorResult{
			Code: http.StatusBadRequest,
			Msg:  fmt.Sprintf("Unsupported resource type (%s). ", resourceType),
		}
	}
	if err != nil {
		logs.Error("Get kubernetes events by type error.", cluster, namespace, resourceType, resourceName, err)
		c.HandleError(err)
		return
	}
	c.Success(result)
}

// @Title ListK8sEvent
// @Description Get K8s Cluster Event by cluster name
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Param	name		query 	string	true		"the query cluster name."
// @Success 200 {object} models.Deployment success
// @router /clusters/:cluster [get]
func (c *KubeEventController) ListEvent() {
	cluster := c.Ctx.Input.Param(":cluster")
	param := c.BuildKubernetesQueryParam()
	manager := c.Manager(cluster)
	events, err := event.GetK8sEvents(manager.CacheFactory, param)
	if err != nil {
		logs.Error(fmt.Sprintf("获取集群%s 事件信息失败,", cluster), err)
	}

	c.Success(events)
}
