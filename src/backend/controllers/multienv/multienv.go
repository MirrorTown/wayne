package multienv

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
	"github.com/astaxie/beego/orm"
	"k8s.io/api/apps/v1beta1"
	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/labels"
	"net/http"
	"strings"
)

type MultienvController struct {
	base.APIController
}

type Multienv struct {
	Szone    string `json:"szone"`
	Image    string `json:"image"`
	Replicas *int32 `json:"replicas"`
}

func (m *MultienvController) URLMapping() {
	m.Mapping("List", m.List)
	m.Mapping("Get", m.Get)
	m.Mapping("Delete", m.Delete)
	m.Mapping("Create", m.Create)
}

func (m *MultienvController) Prepare() {
	// Check administration
	m.APIController.Prepare()

	methodActionMap := map[string]string{
		"List":   models.PermissionRead,
		"Get":    models.PermissionRead,
		"Delete": models.PermissionDelete,
		"Create": models.PermissionCreate,
	}
	_, method := m.GetControllerAndAction()
	m.PreparePermission(methodActionMap, method, models.PermissionTypeKubeDeployment)
}

func (m *MultienvController) List() {

}

// @Title Get
// @Description find deployment info
// @Param	name		path 	string	true		"the name you want to get"
// @Success 200 {object} models.Review success
// @Failure 403 :name is empty
// @router /:name [get]
func (m *MultienvController) Get() {

}

func (m *MultienvController) Delete() {

}

// @Title Create
// @Description create K8s deploy from api
// @Param	body		body 	models.DeploymentTpl	true		"The app content"
// @Success 200 return id success
// @Failure 403 body is empty
// @router /app/:appName/ns/:namespace/cluster/:cluster [post]
func (m *MultienvController) Create() {
	appName := m.Ctx.Input.Param(":appName")
	ns := m.Ctx.Input.Param(":namespace")
	var multienv Multienv
	err := json.Unmarshal(m.Ctx.Input.RequestBody, &multienv)
	if err != nil {
		logs.Error("Invalid Multienv %v", string(m.Ctx.Input.RequestBody))
		m.AbortBadRequestFormat("Multienv")
	}

	//params: multienv.Szone + "-" + appName => souche-appName
	deployTpl, err := models.DeploymentTplModel.GetLatestDeptplByName(ns, multienv.Szone, multienv.Szone+"-"+appName)
	if err == orm.ErrNoRows {
		err := cloneWayneTemplate(multienv.Szone, appName)
		if err != nil {
			logs.Error(err)
			m.AbortInternalServerError("clone from db err")
		}
		deployTpl, err = models.DeploymentTplModel.GetLatestDeptplByName(ns, multienv.Szone, multienv.Szone+"-"+appName)
		if err != nil {
			logs.Error(err)
			m.AbortInternalServerError("cat not get deploymentTmp from db")
		}
	} else if err != nil {
		logs.Error(err)
		m.AbortInternalServerError("cat not get deploymentTmp from db")
	}

	var kubeDeployment v1beta1.Deployment
	err = json.Unmarshal([]byte(deployTpl.Template), &kubeDeployment)
	if err != nil {
		logs.Error("Invalid deployment tpl %v", string(m.Ctx.Input.RequestBody))
		m.AbortBadRequestFormat("KubeDeployment")
	}

	//缺少imgae和replica数量
	deploymentId := deployTpl.Deployment.Id
	tplId := deployTpl.Id
	cluster := m.Ctx.Input.Param(":cluster")
	cli := m.Manager(cluster)

	dep, err := models.DeploymentModel.GetById(deploymentId)
	if err != nil {
		logs.Error("Can not get deployment from db %v", err)
		m.AbortInternalServerError("cat not get deployment from db")
	}
	appId := dep.AppId
	namespace, err := models.NamespaceModel.GetByName(ns)
	if err != nil {
		logs.Error("Can not get namespace from db %v", err)
		m.AbortInternalServerError("cat not get namespace from db")
	}

	namespaceModel, err := models.NamespaceModel.GetNamespaceByAppId(appId)
	if err != nil {
		logs.Error("get getNamespaceMetaData error.%v", err)
		m.HandleError(err)
		return
	}

	clusterModel, err := models.ClusterModel.GetParsedMetaDataByName(cluster)
	if err != nil {
		logs.Error("get cluster error.%v", err)
		m.HandleError(err)
		return
	}

	deploymentModel, err := models.DeploymentModel.GetParseMetaDataById(int64(deploymentId))
	if err != nil {
		logs.Error("get deployment error.%v", err)
		m.HandleError(err)
		return
	}

	common.DeploymentPreDeploy(&kubeDeployment, deploymentModel, clusterModel, namespaceModel)
	//增加k8s deployment hostalias配置
	common.DeploymentAddHostAlias(&kubeDeployment, appId, namespace.Id)
	//添加通过api接口传入的image和replicas信息、并自动根据pod内存配置容器内存
	kubeDeployment.Spec.Replicas = multienv.Replicas
	kubeDeployment.Spec.Template.Spec.Containers[0].Image = multienv.Image

	if !checkEnvJavaOpts(kubeDeployment.Spec.Template.Spec.Containers[0].Env) {
		//unit is: b, but i need Mi
		reqMem := kubeDeployment.Spec.Template.Spec.Containers[0].Resources.Requests.Memory().Value() / 1024 / 1024
		envJava := v1.EnvVar{
			Name:  "JAVA_OPTS",
			Value: fmt.Sprintf("-Xms%vm -Xmx%vm", reqMem, reqMem),
		}

		kubeDeployment.Spec.Template.Spec.Containers[0].Env = append(kubeDeployment.Spec.Template.Spec.Containers[0].Env, envJava)
	}

	publishHistory := &models.PublishHistory{
		Type:         models.PublishTypeDeployment,
		ResourceId:   int64(deploymentId),
		ResourceName: kubeDeployment.Name,
		TemplateId:   int64(tplId),
		Cluster:      cluster,
		User:         m.User.Display,
		Image:        kubeDeployment.Spec.Template.Spec.Containers[0].Image,
	}

	defer func() {
		models.PublishHistoryModel.Add(publishHistory)
		webhook.PublishEventDeployment(namespace.Id, appId, m.User.Name, m.Ctx.Input.IP(), webhook.UpgradeDeployment, response.Resource{
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
		m.HandleError(err)
		return
	}

	//// 灰度发布新增grayscale字段
	//if grayPublish == "True" {
	//	scaleName := kubeDeployment.ObjectMeta.Name + "-grayscale"
	//	kubeDeployment.ObjectMeta.Name = scaleName
	//	kubeDeployment.ObjectMeta.Labels["app"] = scaleName
	//	kubeDeployment.Spem.Selector.MatchLabels["app"] = scaleName
	//	kubeDeployment.Spem.Template.ObjectMeta.Labels["app"] = scaleName
	//
	//}

	// 发布资源到k8s平台
	_, err = deployment.CreateOrUpdateDeployment(cli.Client, &kubeDeployment)
	if err != nil {
		publishHistory.Status = models.ReleaseFailure
		publishHistory.Message = err.Error()
		logs.Error("deploy deployment error.%v", err)
		m.HandleError(err)
		return
	}
	publishHistory.Status = models.ReleaseSuccess
	err = models.PublishStatusModel.Add(deploymentId, tplId, cluster, models.PublishTypeDeployment)
	// 添加发布状态
	if err != nil {
		logs.Error("add deployment deploy status error.%v", err)
		m.HandleError(err)
		return
	}

	//// 灰度发布不改变副本数量
	//if grayPublish != "True"{
	//	err = models.DeploymentModel.Update(*kubeDeployment.Spem.Replicas, deploymentModel, cluster)
	//	if err != nil {
	//		logs.Error("update deployment metadata error.%v", err)
	//		m.HandleError(err)
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
	recode.Name = kubeDeployment.ObjectMeta.Name
	recode.User = m.LoggedInController.User.Display
	recode.Cluster = cluster
	recode.Namespace = kubeDeployment.ObjectMeta.Namespace
	recode.ResourceName = kubeDeployment.ObjectMeta.Name
	recode.ResourceType = api.KindToResourceType[kubeDeployment.TypeMeta.Kind]
	status := recode.DeployServer().UpdateDeployStatus(models.Deploying, models.ToBeNotify)

	m.Success(status)
}

func cloneWayneTemplate(szone, appName string) error {
	wayneTpl, err := models.DeploymentTplModel.GetDeptplByName(szone + "-wayne-template")
	if err != nil {
		logs.Error(err)
		return err
	}
	appDeployment, _ := models.DeploymentModel.GetByName(szone + "-" + appName)
	appTpl := &models.DeploymentTemplate{
		Name:         szone + "-" + appName,
		Template:     strings.ReplaceAll(wayneTpl.Template, "wayne-template", appName),
		Description:  szone + "-" + appName + "模板",
		User:         "Robot",
		Deleted:      false,
		DeploymentId: appDeployment.Id,
	}

	_, err = models.DeploymentTplModel.Add(appTpl)
	if err != nil {
		return err
	}
	return nil
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

//true: have "JAVA_OPTS" setted; false: no "JAVA_OPTS" have setted
func checkEnvJavaOpts(envVars []v1.EnvVar) bool {
	if len(envVars) == 0 {
		return false
	}
	for _, v := range envVars {
		if v.Name == "JAVA_OPTS" {
			return true
		}
	}
	return false
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
