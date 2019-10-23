package review

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/client"
	"github.com/Qihoo360/wayne/src/backend/client/api"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/controllers/common"
	"github.com/Qihoo360/wayne/src/backend/controllers/publish"
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
	"k8s.io/apimachinery/pkg/util/json"
	"net/http"
	"time"
)


// 审核相关操作
type ReviewController struct {
	base.APIController
}

func init()  {
	publish.Register("review", &ReviewController{})
}

func (c *ReviewController) URLMapping() {
	c.Mapping("GetNames", c.GetNames)
	c.Mapping("List", c.List)
	c.Mapping("Create", c.Create)
	c.Mapping("Get", c.Get)
	c.Mapping("Update", c.Update)
	c.Mapping("Delete", c.Delete)
}

func (c *ReviewController) Prepare() {
	// Check administration
	c.APIController.Prepare()

	// Check permission
	/*perAction := ""
	_, method := c.GetControllerAndAction()
	switch method {
	case "Create":
		perAction = models.PermissionCreate
	case "Update":
		perAction = models.PermissionUpdate
	case "Delete":
		perAction = models.PermissionDelete
	}
	if perAction != "" && !c.User.Admin {
		c.AbortForbidden("operation need admin permission.")
	}*/
}

// @Title List/
// @Description get all id and names
// @Param	deleted		query 	bool	false		"is deleted,default false."
// @Success 200 {object} []models.Review success
// @router /names [get]
func (c *ReviewController) GetNames() {
	deleted := c.GetDeleteFromQuery()

	services, err := models.ReviewModel.GetNames()
	if err != nil {
		logs.Error("get names error. %v, delete-status %v", err, deleted)
		c.HandleError(err)
		return
	}

	c.Success(services)
}

// @Title Create
// @Description create Review
// @Param	body		body 	models.Review	true		"The app content"
// @Success 200 return id success
// @Failure 403 body is empty
// @router /apps/:appId/deployments/:deploymentId([0-9]+)/tpls/:tplId([0-9]+)/clusters/:cluster [post]
func (c *ReviewController) Create() {
	var review models.Review

	grayPublish := c.GetString("grayPublish")
	deploymentId := c.GetIntParamFromURL(":deploymentId")
	tplId := c.GetIntParamFromURL(":tplId")
	appId := c.GetIntParamFromURL(":appId")

	var kubeDeployment v1beta1.Deployment
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &kubeDeployment)
	if err != nil {
		logs.Error("Invalid deployment tpl %v", string(c.Ctx.Input.RequestBody))
		c.AbortBadRequestFormat("KubeDeployment")
	}
	jsonkubeDeployment, err := json.Marshal(kubeDeployment)
	if err != nil {
		logs.Error(err)
	}

	cluster := c.Ctx.Input.Param(":cluster")

	review.AppId = appId
	review.KubeDeployment = string(jsonkubeDeployment)
	review.Cluster = cluster
	review.TplId = tplId
	review.DeploymentId = deploymentId
	review.GrayPublish = grayPublish
	review.Announcer = c.User.Display

	var deplyment *models.Deployment
	deplyment, err = models.DeploymentModel.GetById(deploymentId)
	if err != nil {
		logs.Error("查询deployment失败,", err)
	}

	review.Name = deplyment.Name
	objectid, err := models.ReviewModel.Add(&review)

	if err != nil {
		logs.Error("create error.%v", err.Error())
		c.HandleError(err)
		return
	}
	c.Success(objectid)
}

// @Title Update
// @Description update the object
// @Param	name		path 	string	true		"The name you want to update"
// @Param	body		body 	models.Review	true		"The body"
// @Success 200 id success
// @Failure 403 :name is empty
// @router /:namespaceid([0-9]+)/:name/status/:status [put]
func (c *ReviewController) Update() {
	name := c.Ctx.Input.Param(":name")
	status := c.GetIntParamFromURL(":status")

	review, err := models.ReviewModel.GetByName(name)
	review.Status = models.ReviewStatus(status)
	review.Auditors = c.User.Display
	review.AnnounceTime = time.Now().Format("2006/1/2 15:04:05")
	err = models.ReviewModel.UpdateByName(review)
	if err != nil {
		logs.Error("update error.%v", err)
		c.HandleError(err)
		return
	}
	if status == 1 {
		c.Deploytok8s(review)
	}else {
		c.Success(review)
	}

}

func (c *ReviewController) Deploytok8s(review *models.Review) {
	var kubeDeployment v1beta1.Deployment
	err := json.Unmarshal([]byte(review.KubeDeployment), &kubeDeployment)
	if err != nil {
		logs.Error("转换json到struct失败!",err)
	}

	cli := c.Manager(review.Cluster)

	namespaceModel, err := models.NamespaceModel.GetNamespaceByAppId(review.AppId)
	if err != nil {
		logs.Error("get getNamespaceMetaData error.%v", err)
		c.HandleError(err)
		return
	}

	clusterModel, err := models.ClusterModel.GetParsedMetaDataByName(review.Cluster)
	if err != nil {
		logs.Error("get cluster error.%v", err)
		c.HandleError(err)
		return
	}

	deploymentModel, err := models.DeploymentModel.GetParseMetaDataById(review.DeploymentId)
	if err != nil {
		logs.Error("get deployment error.%v", err)
		c.HandleError(err)
		return
	}

	common.DeploymentPreDeploy(&kubeDeployment, deploymentModel, clusterModel, namespaceModel)

	publishHistory := &models.PublishHistory{
		Type:         models.PublishTypeDeployment,
		ResourceId:   review.DeploymentId,
		ResourceName: kubeDeployment.Name,
		TemplateId:   review.TplId,
		Cluster:      review.Cluster,
		User:         review.Announcer,
		Image: 		  kubeDeployment.Spec.Template.Spec.Containers[0].Image,
	}

	defer func() {
		//models.PublishHistoryModel.Add(publishHistory)
		webhook.PublishEventDeployment(c.NamespaceId, review.AppId, review.Announcer, c.Ctx.Input.IP(), webhook.UpgradeDeployment, response.Resource{
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

	err = checkResourceAvailable(namespaceModel, cli.KubeClient, &kubeDeployment, review.Cluster)
	if err != nil {
		publishHistory.Status = models.ReleaseFailure
		publishHistory.Message = err.Error()
		c.HandleError(err)
		return
	}

	// 灰度发布新增grayscale字段
	if review.GrayPublish == "True" {
		scaleName := kubeDeployment.ObjectMeta.Name + "-grayscale"
		kubeDeployment.ObjectMeta.Name = scaleName
		kubeDeployment.ObjectMeta.Labels["app"] = scaleName
		kubeDeployment.Spec.Selector.MatchLabels["app"] = scaleName
		kubeDeployment.Spec.Template.ObjectMeta.Labels["app"] = scaleName

	}

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
	err = models.PublishStatusModel.Add(review.DeploymentId, review.TplId, review.Cluster, models.PublishTypeDeployment)
	// 添加发布状态
	if err != nil {
		logs.Error("add deployment deploy status error.%v", err)
		c.HandleError(err)
		return
	}

	// 灰度发布不改变副本数量
	if review.GrayPublish != "True"{
		err = models.DeploymentModel.Update(*kubeDeployment.Spec.Replicas, deploymentModel, review.Cluster)
		if err != nil {
			logs.Error("update deployment metadata error.%v", err)
			c.HandleError(err)
			return
		}
	}

	deploymentTplString, err := models.DeploymentTplModel.GetById(review.TplId)
	deploymentTpl, err := copyTemplateData([]byte(deploymentTplString.Template), kubeDeployment.Spec.Template.Spec.Containers[0].Image)
	deploymentTplString.Template = deploymentTpl
	err = models.DeploymentTplModel.UpdateById(deploymentTplString)
	if err != nil {
		logs.Error("更新发布模板失败, ",err)
	}

	//记录发布状态信息并发送订订讯息
	var recode apimachinery.ClientSet
	recode.Name = kubeDeployment.Spec.Template.Spec.Containers[0].Name + "【灰度】"
	recode.User = review.Announcer
	recode.Cluster = review.Cluster
	recode.Namespace = kubeDeployment.ObjectMeta.Namespace
	recode.ResourceName = kubeDeployment.ObjectMeta.Name
	recode.ResourceType = api.KindToResourceType[kubeDeployment.TypeMeta.Kind]
	status := recode.DeployServer().UpdateDeployStatus(models.Deploying, models.ToBeNotify)
	//recode.NotifyToDingding(recode.Name, "187xxxxxx65")
	fmt.Println(status)

	c.Success("ok")
}

func copyTemplateData(str []byte, image string) (string, error) {
	m := make(map[string]interface{})
	err := json.Unmarshal(str, &m)
	if err != nil {
		logs.Error("Json解析失败")
	}
	m["spec"].(map[string]interface{})["template"].(map[string]interface{})["spec"].
	(map[string]interface{})["containers"].([]interface{})[0].(map[string]interface{})["image"] = image;
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
// @Description find Object by objectid
// @Param	name		path 	string	true		"the name you want to get"
// @Success 200 {object} models.Review success
// @Failure 403 :name is empty
// @router /:name [get]
func (c *ReviewController) Get() {
	name := c.Ctx.Input.Param(":name")

	review, err := models.ReviewModel.GetByName(name)
	if err != nil {
		logs.Error("get error.%v", err)
		c.HandleError(err)
		return
	}
	// 非admin用户不允许查看kubeconfig配置
	/*if !c.User.Admin {
		review.Passwd = ""
	}*/
	c.Success(review)
}

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} []models.Review success
// @router / [get]
func (c *ReviewController) List() {
	param := c.BuildQueryParam()
	reviews := []models.Review{}

	total, err := models.GetTotal(new(models.Review), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		c.HandleError(err)
		return
	}
	err = models.GetAll(new(models.Review), &reviews, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		c.HandleError(err)
		return
	}
	// 非admin用户不允许查看passwd
	/*if !c.User.Admin {
		for i := range reviews {
			reviews[i].Passwd = ""
		}
	}*/

	c.Success(param.NewPage(total, reviews))
	return
}

// @Title Delete
// @Description delete the app
// @Param	name		path 	string	true		"The name you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @Failure 403 name is empty
// @router /:name [delete]
func (c *ReviewController) Delete() {
	name := c.Ctx.Input.Param(":name")

	err := models.ReviewModel.DeleteByName(name)
	if err != nil {
		logs.Error("delete error.%v", err)
		c.HandleError(err)
		return
	}
	c.Success(nil)
}
