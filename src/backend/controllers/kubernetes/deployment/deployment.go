package deployment

import (
	"encoding/json"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/client"
	"github.com/Qihoo360/wayne/src/backend/client/api"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/controllers/common"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/models/response"
	"github.com/Qihoo360/wayne/src/backend/models/response/errors"
	"github.com/Qihoo360/wayne/src/backend/resources/deployment"
	"github.com/Qihoo360/wayne/src/backend/resources/namespace"
	"github.com/Qihoo360/wayne/src/backend/util"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/Qihoo360/wayne/src/backend/workers/webhook"
	"k8s.io/api/apps/v1beta1"
	"k8s.io/apimachinery/pkg/labels"
	"net/http"
	"strings"
)

type KubeDeploymentController struct {
	base.APIController
}

type Replica struct {
	Num int32
}

func (c *KubeDeploymentController) URLMapping() {
	c.Mapping("List", c.List)
	c.Mapping("Get", c.Get)
	c.Mapping("Delete", c.Delete)
	c.Mapping("Create", c.Create)
}

func (c *KubeDeploymentController) Prepare() {
	// Check administration
	c.APIController.Prepare()

	methodActionMap := map[string]string{
		"List":   models.PermissionRead,
		"Get":    models.PermissionRead,
		"Delete": models.PermissionDelete,
		"Create": models.PermissionCreate,
	}
	_, method := c.GetControllerAndAction()
	c.PreparePermission(methodActionMap, method, models.PermissionTypeKubeDeployment)
}

// @Title List deployment
// @Description get all deployment
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Param	filter		query 	string	false		"column filter, ex. filter=name=test"
// @Param	sortby		query 	string	false		"column sorted by, ex. sortby=-id, '-' representation desc, and sortby=id representation asc"
// @Param	cluster		path 	string	true		"the cluster name"
// @Param	namespace		path 	string	true		"the namespace name"
// @Success 200 {object} common.Page success
// @router /namespaces/:namespace/clusters/:cluster [get]
func (c *KubeDeploymentController) List() {
	param := c.BuildQueryParam()
	cluster := c.Ctx.Input.Param(":cluster")
	namespace := c.Ctx.Input.Param(":namespace")

	manager := c.Manager(cluster)

	result, err := deployment.GetDeploymentPage(manager.CacheFactory, namespace, param)
	if err != nil {
		logs.Error("list kubernetes deployments error.", cluster, namespace, err)
		c.HandleError(err)
		return
	}
	c.Success(result)
}

// @Title deploy
// @Description deploy tpl
// @Param	body	body 	string	true	"The tpl content"
// @Success 200 return ok success
// @router /:deploymentId([0-9]+)/tpls/:tplId([0-9]+)/clusters/:cluster [post]
func (c *KubeDeploymentController) Create() {

	//grayPublish := c.GetString("grayPublish")
	deploymentId := c.GetIntParamFromURL(":deploymentId")
	tplId := c.GetIntParamFromURL(":tplId")

	var kubeDeployment v1beta1.Deployment
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &kubeDeployment)
	if err != nil {
		logs.Error("Invalid deployment tpl %v", string(c.Ctx.Input.RequestBody))
		c.AbortBadRequestFormat("KubeDeployment")
	}

	cluster := c.Ctx.Input.Param(":cluster")
	cli := c.Manager(cluster)

	namespaceModel, err := models.NamespaceModel.GetNamespaceByAppId(c.AppId)
	if err != nil {
		logs.Error("get getNamespaceMetaData error.%v", err)
		c.HandleError(err)
		return
	}

	clusterModel, err := models.ClusterModel.GetParsedMetaDataByName(cluster)
	if err != nil {
		logs.Error("get cluster error.%v", err)
		c.HandleError(err)
		return
	}

	deploymentModel, err := models.DeploymentModel.GetParseMetaDataById(int64(deploymentId))
	if err != nil {
		logs.Error("get deployment error.%v", err)
		c.HandleError(err)
		return
	}

	common.DeploymentPreDeploy(&kubeDeployment, deploymentModel, clusterModel, namespaceModel)
	//增加k8s deployment hostalias配置
	common.DeploymentAddHostAlias(&kubeDeployment, c.AppId, c.NamespaceId)

	publishHistory := &models.PublishHistory{
		Type:         models.PublishTypeDeployment,
		ResourceId:   int64(deploymentId),
		ResourceName: kubeDeployment.Name,
		TemplateId:   int64(tplId),
		Cluster:      cluster,
		User:         c.User.Display,
		Image:        kubeDeployment.Spec.Template.Spec.Containers[0].Image,
	}

	defer func() {
		models.PublishHistoryModel.Add(publishHistory)
		webhook.PublishEventDeployment(c.NamespaceId, c.AppId, c.User.Name, c.Ctx.Input.IP(), webhook.UpgradeDeployment, response.Resource{
			Type:         publishHistory.Type,
			ResourceId:   publishHistory.ResourceId,
			ResourceName: publishHistory.ResourceName,
			TemplateId:   publishHistory.TemplateId,
			Cluster:      publishHistory.Cluster,
			Status:       publishHistory.Status,
			Message:      publishHistory.Message,
			Object:       kubeDeployment,
		})
	}()

	err = checkResourceAvailable(namespaceModel, cli.KubeClient, &kubeDeployment, cluster)
	if err != nil {
		publishHistory.Status = models.ReleaseFailure
		publishHistory.Message = err.Error()
		c.HandleError(err)
		return
	}

	//// 灰度发布新增grayscale字段
	//if grayPublish == "True" {
	//	scaleName := kubeDeployment.ObjectMeta.Name + "-grayscale"
	//	kubeDeployment.ObjectMeta.Name = scaleName
	//	kubeDeployment.ObjectMeta.Labels["app"] = scaleName
	//	kubeDeployment.Spec.Selector.MatchLabels["app"] = scaleName
	//	kubeDeployment.Spec.Template.ObjectMeta.Labels["app"] = scaleName
	//
	//}

	// 发布资源到k8s平台
	_, err = deployment.CreateOrUpdateDeployment(cli.Client, &kubeDeployment)
	if err != nil {
		publishHistory.Status = models.ReleaseFailure
		publishHistory.Message = err.Error()
		logs.Error("deploy deployment error.%v", err)
		c.HandleError(err)
		return
	}
	publishHistory.Status = models.ReleaseSuccess
	err = models.PublishStatusModel.Add(deploymentId, tplId, cluster, models.PublishTypeDeployment)
	// 添加发布状态
	if err != nil {
		logs.Error("add deployment deploy status error.%v", err)
		c.HandleError(err)
		return
	}

	//// 灰度发布不改变副本数量
	//if grayPublish != "True"{
	//	err = models.DeploymentModel.Update(*kubeDeployment.Spec.Replicas, deploymentModel, cluster)
	//	if err != nil {
	//		logs.Error("update deployment metadata error.%v", err)
	//		c.HandleError(err)
	//		return
	//	}
	//}

	deploymentTplString, err := models.DeploymentTplModel.GetById(tplId)
	deploymentTpl, err := copyTemplateData([]byte(deploymentTplString.Template), kubeDeployment.Spec.Template.Spec.Containers[0].Image)
	deploymentTplString.Template = deploymentTpl
	err = models.DeploymentTplModel.UpdateById(deploymentTplString)
	if err != nil {
		logs.Error("更新发布模板失败, ", err)
	}

	//记录发布状态信息并发送订订讯息
	var recode apimachinery.ClientSet
	recode.Name = kubeDeployment.Spec.Template.Spec.Containers[0].Name
	recode.User = c.LoggedInController.User.Display
	recode.Cluster = cluster
	recode.Namespace = kubeDeployment.ObjectMeta.Namespace
	recode.ResourceName = kubeDeployment.ObjectMeta.Name
	recode.ResourceType = api.KindToResourceType[kubeDeployment.TypeMeta.Kind]
	status := recode.DeployServer().UpdateDeployStatus(models.Deploying, models.ToBeNotify)

	c.Success(status)
}

func copyTemplateData(str []byte, image string) (string, error) {
	m := make(map[string]interface{})
	err := json.Unmarshal(str, &m)
	if err != nil {
		logs.Error("Json解析失败")
	}
	m["spec"].(map[string]interface{})["template"].(map[string]interface{})["spec"].(map[string]interface{})["containers"].([]interface{})[0].(map[string]interface{})["image"] = image
	//fmt.Println(m["spec"]["template"]["spec"]["containers"]["image"])
	jsonStr, err := json.Marshal(m)
	return string(jsonStr), err
}

func checkResourceAvailable(ns *models.Namespace, cli client.ResourceHandler, kubeDeployment *v1beta1.Deployment, cluster string) error {
	// this namespace can't use current cluster.
	clusterMetas, ok := ns.MetaDataObj.ClusterMetas[cluster]
	if !ok {
		return &errors.ErrorResult{
			Code:    http.StatusForbidden,
			SubCode: http.StatusForbidden,
			Msg:     fmt.Sprintf("Current namespace (%s) can't use current cluster (%s).Please contact administrator. ", ns.Name, cluster),
		}

	}

	// check resources
	selector := labels.SelectorFromSet(map[string]string{
		util.NamespaceLabelKey: ns.Name,
	})
	namespaceResourceUsed, err := namespace.ResourcesUsageByNamespace(cli, ns.KubeNamespace, selector.String())

	requestResourceList, err := deployment.GetDeploymentResource(cli, kubeDeployment)
	if err != nil {
		logs.Error("get deployment (%v) resource list error.%v", kubeDeployment, err)
		return err
	}

	if clusterMetas.ResourcesLimit.Memory != 0 &&
		clusterMetas.ResourcesLimit.Memory-(namespaceResourceUsed.Memory+requestResourceList.Memory)/(1024*1024*1024) < 0 {
		return &errors.ErrorResult{
			Code:    http.StatusForbidden,
			SubCode: base.ErrorSubCodeInsufficientResource,
			Msg:     fmt.Sprintf("request namespace resource (memory:%dGi) is not enough for this deploy", requestResourceList.Memory/(1024*1024*1024)),
		}
	}

	if clusterMetas.ResourcesLimit.Cpu != 0 &&
		clusterMetas.ResourcesLimit.Cpu-(namespaceResourceUsed.Cpu+requestResourceList.Cpu)/1000 < 0 {
		return &errors.ErrorResult{
			Code:    http.StatusForbidden,
			SubCode: base.ErrorSubCodeInsufficientResource,
			Msg:     fmt.Sprintf("request namespace resource (cpu:%d) is not enough for this deploy", requestResourceList.Cpu/1000),
		}

	}
	return nil
}

// @Title Get
// @Description find Deployment by cluster
// @Param	cluster		path 	string	true		"the cluster name"
// @Param	namespace		path 	string	true		"the namespace name"
// @Success 200 {object} models.Deployment success
// @router /:deployment/detail/namespaces/:namespace/clusters/:cluster [get]
func (c *KubeDeploymentController) Get() {
	cluster := c.Ctx.Input.Param(":cluster")
	namespace := c.Ctx.Input.Param(":namespace")
	name := c.Ctx.Input.Param(":deployment")
	manager := c.Manager(cluster)
	resultGray, errGray := deployment.GetDeploymentDetail(manager.Client, manager.CacheFactory, name+"-grayscale", namespace)
	result, err := deployment.GetDeploymentDetail(manager.Client, manager.CacheFactory, name, namespace)
	if err != nil && errGray != nil {
		logs.Info("get kubernetes deployment detail error.", cluster, namespace, name, err)
		c.HandleError(err)
		return
	} else if err != nil && errGray == nil {
		result = resultGray
	}
	c.Success(result)
}

// @Title Delete
// @Description delete the Deployment
// @Param	cluster		path 	string	true		"the cluster want to delete"
// @Param	namespace		path 	string	true		"the namespace want to delete"
// @Param	deployment		path 	string	true		"the deployment name want to delete"
// @Success 200 {string} delete success!
// @router /:deployment/namespaces/:namespace/clusters/:cluster [delete]
func (c *KubeDeploymentController) Delete() {
	cluster := c.Ctx.Input.Param(":cluster")
	namespace := c.Ctx.Input.Param(":namespace")
	name := c.Ctx.Input.Param(":deployment")
	cli := c.Client(cluster)

	err := deployment.DeleteDeployment(cli, name, namespace)
	//如果正式下线，灰度强制下线
	if !strings.Contains(name, "grayscale") {
		_ = deployment.DeleteDeployment(cli, name+"-grayscale", namespace)
	}
	if err != nil {
		logs.Info("Delete deployment (%s) by cluster (%s) error.%v", name, cluster, err)
		c.HandleError(err)
		return
	}
	webhook.PublishEventDeployment(c.NamespaceId, c.AppId, c.User.Name, c.Ctx.Input.IP(), webhook.DeleteDeployment, response.Resource{
		Type:         models.PublishTypeDeployment,
		ResourceName: name,
		Cluster:      cluster,
	})
	c.Success("ok!")
}

// @Title UpdateScale
// @Description Update the number of replica for target deployment
// @Param	cluster		path 	string	true		"the target k8s cluster"
// @Param	namespace		path 	string	true		"the namespace that the target deployment belong to"
// @Param	deployment		path 	string	true		"the target deployment name"
// @Param   replica         body        int32   true        "number of replica"
// @Success 200 {string} ok success
// @router /:deployment/namespaces/:namespace/clusters/:cluster/updatescale [post]
func (c *KubeDeploymentController) UpdateScale() {
	cluster := c.Ctx.Input.Param(":cluster")
	namespace := c.Ctx.Input.Param(":namespace")
	name := c.Ctx.Input.Param(":deployment")
	cli := c.Client(cluster)

	var replica Replica
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &replica)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		c.AbortBadRequestFormat("replica num")
	}
	err = deployment.UpdateScale(cli, name, namespace, replica.Num)
	if err != nil {
		logs.Info("Update scale for deployment (%s) by cluster (%s) error.%v", name, cluster, err)
		c.HandleError(err)
		return
	}

	c.Success("ok!")
}
