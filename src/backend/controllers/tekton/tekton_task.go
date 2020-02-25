package tekton

import (
	"encoding/json"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/resources/crd"
	"k8s.io/apimachinery/pkg/runtime"

	"k8s.io/api/apps/v1beta1"
	corev1 "k8s.io/api/core/v1"

	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/hack"
	"github.com/Qihoo360/wayne/src/backend/util/logs"

	pipelinev1 "github.com/tektoncd/pipeline/pkg/apis/pipeline/v1alpha1"
)

type TektonTaskController struct {
	base.APIController
}

func (t *TektonTaskController) URLMapping() {
	t.Mapping("List", t.List)
	t.Mapping("Publish", t.Publish)
	t.Mapping("Offline", t.Offline)
	t.Mapping("Create", t.Create)
	t.Mapping("Get", t.Get)
	t.Mapping("Update", t.Update)
	t.Mapping("Delete", t.Delete)
}

func (t *TektonTaskController) Prepare() {
	// Check administration
	t.APIController.Prepare()
	// Check permission
	perAction := ""
	_, method := t.GetControllerAndAction()
	switch method {
	case "Get", "List":
		perAction = models.PermissionRead
	case "Create":
		perAction = models.PermissionCreate
	case "Update":
		perAction = models.PermissionUpdate
	case "Delete":
		perAction = models.PermissionDelete
	}
	if perAction != "" {
		t.CheckPermission(models.PermissionTypeDeployment, perAction)
	}
}

// @Title GetAll
// @Description get all DeploymentTemplate
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Param	deploymentId		query 	int	false		"deployment id"
// @Param	isOnline		query 	bool	false		"only show online tpls,default false"
// @Param	name		query 	string	false		"name filter"
// @Param	deleted		query 	bool	false		"is deleted"
// @Success 200 {object} []models.DeploymentTemplate success
// @router / [get]
func (t *TektonTaskController) List() {
	param := t.BuildQueryParam()

	name := t.Input().Get("name")
	if name != "" {
		param.Query["name__contains"] = name
	}
	isOnline := t.GetIsOnlineFromQuery()

	tektonParamId := t.Input().Get("tektonParamId")
	if tektonParamId != "" {
		param.Query["tekton_param_id"] = tektonParamId
	}
	var tektonTask []models.TektonTask
	total, err := models.ListTemplate(&tektonTask, param, models.TableNameTektonTask, models.PublishTypeTekton, isOnline)
	if err != nil {
		logs.Error("list by param (%v) error. %v", param, err)
		t.HandleError(err)
		return
	}
	for index, tpl := range tektonTask {
		tektonTask[index].TektonParamId = tpl.TektonParam.Id
	}

	t.Success(param.NewPage(total, tektonTask))
	return
}

// @Title Publish
// @Description create DeploymentTemplate
// @Param	body		body 	models.TektonTask	true		"The TektonTask content"
// @Success 200 return models.TektonTask success
// @router /:taskName/clusters/:cluster [delete]
func (t *TektonTaskController) Offline() {
	cluster := t.Ctx.Input.Param(":cluster")
	taskName := t.Ctx.Input.Param(":taskName")
	cli := t.Client(cluster)
	ns, _ := models.NamespaceModel.GetById(t.NamespaceId)

	err := crd.DeleteTektonCRD(cli, "tasks", ns.Name, taskName+"-task")
	if err != nil {
		logs.Error("delete task error. v%", err)
		t.AbortInternalServerError("删除失败")
	}

	t.Success("ok")
}

// @Title Publish
// @Description create DeploymentTemplate
// @Param	body		body 	models.TektonTask	true		"The TektonTask content"
// @Success 200 return models.TektonTask success
// @router /:tektonId([0-9]+)/:tektonTaskId([0-9]+)/clusters/:cluster [post]
func (t *TektonTaskController) Publish() {
	cluster := t.Ctx.Input.Param(":cluster")
	tektonParamId := t.GetIntParamFromURL(":tektonId")
	tektonTaskId := t.GetIntParamFromURL(":tektonTaskId")
	cli := t.Client(cluster)

	var deployment v1beta1.Deployment
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &deployment)
	if err != nil {
		logs.Error("can not unmarshal tektonTask")
		t.AbortBadRequestFormat("tektonTask")
	}

	tektonParam, err := models.TektonParamModel.GetParseMetaDataById(tektonParamId)
	if err != nil {
		logs.Error("get tektonParam error.v%", err)
		t.AbortInternalServerError("orm query faild")
	}

	ns, _ := models.NamespaceModel.GetById(t.NamespaceId)
	var task pipelinev1.Task

	task.APIVersion = "tekton.dev/v1alpha1"
	task.Kind = "Task"
	task.ObjectMeta.Name = tektonParam.Name + "-task"
	task.ObjectMeta.Namespace = ns.Name
	task.Spec.Inputs = &pipelinev1.Inputs{}

	for _, v := range tektonParam.MetaDataObj.Params {
		var paramspec pipelinev1.ParamSpec
		paramspec.Name = v
		paramspec.Description = v

		task.Spec.Inputs.Params = append(task.Spec.Inputs.Params, paramspec)
	}
	var taskResource pipelinev1.TaskResource
	taskResource.Name = "source-" + tektonParam.Name
	taskResource.Type = "git"
	taskResource.TargetPath = "source-code"

	task.Spec.Inputs.Resources = append(task.Spec.Inputs.Resources, taskResource)
	for _, v := range deployment.Spec.Template.Spec.Containers {
		var step pipelinev1.Step
		step.Container = v
		task.Spec.Steps = append(task.Spec.Steps, step)
	}
	for _, v := range deployment.Spec.Template.Spec.Volumes {
		var volume corev1.Volume
		volume = v
		task.Spec.Volumes = append(task.Spec.Volumes, volume)
	}

	tektonTask, err := json.Marshal(task)
	if err != nil {
		logs.Error("json marshall error. v%", err.Error())
		t.AbortInternalServerError("task struct marshall error")
	}

	_, err = crd.CreatTektonCRD(cli, "tasks", ns.Name, tektonTask)
	if err != nil {
		obj, err := crd.GetTektonCRD(cli, "tasks", ns.Name, task.ObjectMeta.Name)
		if err != nil {
			logs.Error("get task by cluster (%s) error.%v", cluster, err)
			t.AbortInternalServerError("发布失败")
		} else {
			var object pipelinev1.Task
			err = json.Unmarshal(obj.(*runtime.Unknown).Raw, &object)
			task.ObjectMeta = object.ObjectMeta
			tektonTask, _ := json.Marshal(task)

			_, err = crd.UpdateTektonCRD(cli, "tasks", ns.Name, task.ObjectMeta.Name, tektonTask)
			if err != nil {
				logs.Error("create task by cluster (%s) error.%v", cluster, err)
				t.AbortInternalServerError("发布失败")
			}
		}
	}

	// 添加发布状态
	publishStatus := models.PublishStatus{
		ResourceId: int64(tektonParamId),
		TemplateId: int64(tektonTaskId),
		Type:       models.PublishTypeTekton,
		Cluster:    cluster,
	}
	err = models.PublishStatusModel.Publish(&publishStatus)
	if err != nil {
		logs.Error("publish publishStatus (%v) to db error.%v", publishStatus, err)
		t.HandleError(err)
		return
	}

	t.Success("ok")
}

// @Title Create
// @Description create DeploymentTemplate
// @Param	body		body 	models.DeploymentTemplate	true		"The DeploymentTemplate content"
// @Success 200 return models.DeploymentTemplate success
// @router / [post]
func (t *TektonTaskController) Create() {
	var tektonTask models.TektonTask
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tektonTask)
	if err != nil {
		logs.Error("get body error. %v", err)
		t.AbortBadRequestFormat("TektonTask")
	}
	if err = validDeploymentTemplate(tektonTask.Template); err != nil {
		logs.Error("valid template err %v", err)
		t.AbortBadRequestFormat("TektonTask.Template")
	}

	tektonTask.User = t.User.Display
	_, err = models.TektonTaskModel.Add(&tektonTask)

	if err != nil {
		logs.Error("create error.%v", err.Error())
		t.HandleError(err)
		return
	}
	t.Success(tektonTask)
}

func validDeploymentTemplate(deployStr string) error {
	deployment := v1beta1.Deployment{}
	err := json.Unmarshal(hack.Slice(deployStr), &deployment)
	if err != nil {
		return fmt.Errorf("deployment template format error.%v", err.Error())
	}
	return nil
}

// @Title Get
// @Description find Object by id
// @Param	id		path 	int	true		"the id you want to get"
// @Success 200 {object} models.TektonTask success
// @router /:id([0-9]+) [get]
func (t *TektonTaskController) Get() {
	id := t.GetIDFromURL()

	tektonTask, err := models.TektonTaskModel.GetById(int64(id))
	if err != nil {
		logs.Error("get template error %v", err)
		t.HandleError(err)
		return
	}

	t.Success(tektonTask)
	return
}

// @Title Update
// @Description update the DeploymentTemplate
// @Param	id		path 	int	true		"The id you want to update"
// @Param	body		body 	models.DeploymentTemplate	true		"The body"
// @Success 200 models.DeploymentTemplate success
// @router /:id [put]
func (t *TektonTaskController) Update() {
	id := t.GetIDFromURL()

	var tektonTask models.TektonTask
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tektonTask)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		t.AbortBadRequestFormat("DeploymentTemplate")
	}
	if err = validDeploymentTemplate(tektonTask.Template); err != nil {
		logs.Error("valid template err %v", err)
		t.AbortBadRequestFormat("KubeDeployment")
	}

	tektonTask.Id = int64(id)
	err = models.TektonTaskModel.UpdateById(&tektonTask)
	if err != nil {
		logs.Error("update error.%v", err)
		t.HandleError(err)
		return
	}
	t.Success(tektonTask)
}

// @Title Delete
// @Description delete the DeploymentTemplate
// @Param	id		path 	int	true		"The id you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @router /:id [delete]
func (t *TektonTaskController) Delete() {
	id := t.GetIDFromURL()
	logical := t.GetLogicalFromQuery()

	err := models.TektonTaskModel.DeleteById(int64(id), logical)
	if err != nil {
		logs.Error("delete %d error.%v", id, err)
		t.HandleError(err)
		return
	}
	t.Success(nil)
}
