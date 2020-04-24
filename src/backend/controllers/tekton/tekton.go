package tekton

import (
	"encoding/json"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/controllers/hongmao"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/resources/crd"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/runtime"

	pipelinev1 "github.com/tektoncd/pipeline/pkg/apis/pipeline/v1alpha1"
	"github.com/tektoncd/triggers/pkg/apis/triggers/v1alpha1"
	corev1 "k8s.io/api/core/v1"
)

type TektonController struct {
	base.APIController
}

const (
	TektonAdd    = "ADD"
	TektonUpdate = "UPDATE"
	TektonDel    = "DELETE"
)

type GetApplication interface {
	GetApplication(url string) []map[string]interface{}
}

func (t *TektonController) URLMapping() {
	t.Mapping("GetNames", t.GetNames)
	t.Mapping("List", t.List)
	t.Mapping("Create", t.Create)
	t.Mapping("Get", t.Get)
	t.Mapping("Update", t.Update)
	t.Mapping("UpdateOrders", t.UpdateOrders)
	t.Mapping("Delete", t.Delete)
}

func (t *TektonController) Prepare() {
	// Check administration
	t.APIController.Prepare()
	// Check permission
	perAction := ""
	_, method := t.GetControllerAndAction()
	switch method {
	case "Get", "List", "GetNames":
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

// @Title List/
// @Description get all id and names
// @Param	appId		query 	int	false		"the app id"
// @Param	deleted		query 	bool	false		"is deleted,default false."
// @Success 200 {object} []models.TektonParam success
// @router /names [get]
func (t *TektonController) GetNames() {
	filters := make(map[string]interface{})
	deleted := t.GetDeleteFromQuery()
	filters["Deleted"] = deleted
	if t.AppId != 0 {
		filters["App__Id"] = t.AppId
	}

	deployments, err := models.TektonParamModel.GetNames(filters)
	if err != nil {
		logs.Error("get names error. %v, delete-status %v", err, deleted)
		t.HandleError(err)
		return
	}

	t.Success(deployments)
}

// @Title GetAll
// @Description get all Deployment
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Param	appId		query 	int	false		"the app id"
// @Param	name		query 	string	false		"name filter"
// @Param	deleted		query 	bool	false		"is deleted, default list all"
// @Success 200 {object} []models.TektonParam success
// @router / [get]
func (t *TektonController) List() {
	param := t.BuildQueryParam()
	name := t.Input().Get("name")
	if name != "" {
		param.Query["name__contains"] = name
	}

	//非Admin用户和非项目负责人仅可操作授权于虹猫相关项目权限的应用
	if !t.User.Admin {
		operator := t.GetBoolParamFromQuery("operator")
		if !operator {
			app, err := models.AppModel.GetById(t.AppId)
			if err != nil {
				logs.Error("查询数据库表App失败, ", err)
				return
			}
			var items = make([]string, 0)
			url := fmt.Sprintf("https://hongmao.souche-inc.com/aliyun/userApp/getapp?email=%s&access_token=", t.User.Email)
			itemsMap := GetApplication(&hongmao.HongMaoController{}).GetApplication(url)
			for item := range itemsMap {
				items = append(items, app.Name+"-"+itemsMap[item]["applicationName"].(string))
			}
			param.Query["Name__in"] = items
		}
	}

	tektonParam := []models.TektonParam{}
	if t.AppId != 0 {
		param.Query["App__Id"] = t.AppId
	} else if !t.User.Admin {
		param.Query["App__AppUsers__User__Id__exact"] = t.User.Id
		perName := models.PermissionModel.MergeName(models.PermissionTypeDeployment, models.PermissionRead)
		param.Query["App__AppUsers__Group__Permissions__Permission__Name__contains"] = perName
		param.Groupby = []string{"Id"}
	}

	total, err := models.GetTotal(new(models.TektonParam), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		t.HandleError(err)
		return
	}

	err = models.GetAll(new(models.TektonParam), &tektonParam, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		t.HandleError(err)
		return
	}
	for key, one := range tektonParam {
		tektonParam[key].AppId = one.App.Id
	}

	t.Success(param.NewPage(total, tektonParam))
	return
}

// @Title Create
// @Description create Deployment
// @Param	body		body 	models.TektonParam	true		"The Deployment content"
// @Success 200 return models.TektonParam success
// @router / [post]
func (t *TektonController) Create() {
	var tektonParam models.TektonParam
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tektonParam)
	if err != nil {
		logs.Error("get body error. %v", err)
		t.AbortBadRequestFormat("TektonParam")
	}

	tektonParam.User = t.User.Name
	id, err := models.TektonParamModel.Add(&tektonParam)

	if err != nil {
		logs.Error("create error.%v", err.Error())
		t.HandleError(err)
		return
	}

	flag := t.generateTrigger(id, tektonParam, TektonAdd)
	if !flag {
		t.AbortInternalServerError("发布tekton trigger失败")
	}
	t.Success(tektonParam)
}

func (t *TektonController) generateTrigger(id int64, tektonParam models.TektonParam, ops string) bool {
	metaDataObj, err := models.TektonParamModel.GetParseMetaDataById(id)
	if err != nil {
		logs.Error("get tektonparam error. %v", err.Error())
		return false
	}

	var tektonTriggerBinding v1alpha1.TriggerBinding
	tektonTriggerBinding.APIVersion = "tekton.dev/v1alpha1"
	tektonTriggerBinding.Kind = "TriggerBinding"
	tektonTriggerBinding.ObjectMeta.Name = tektonParam.Name + "-triggerbinding"
	ns, _ := models.NamespaceModel.GetById(t.NamespaceId)
	tektonTriggerBinding.ObjectMeta.Namespace = ns.Name

	var tektonTriggerTemplate v1alpha1.TriggerTemplate
	tektonTriggerTemplate.APIVersion = "tekton.dev/v1alpha1"
	tektonTriggerTemplate.Kind = "TriggerTemplate"
	tektonTriggerTemplate.ObjectMeta.Name = tektonParam.Name + "-triggertemplate"
	tektonTriggerTemplate.ObjectMeta.Namespace = ns.Name

	var tektonEventListener apimachinery.EventListener
	tektonEventListener.APIVersion = "tekton.dev/v1alpha1"
	tektonEventListener.Kind = "EventListener"
	tektonEventListener.ObjectMeta.Name = tektonParam.Name + "-eventlistener"
	tektonEventListener.ObjectMeta.Namespace = ns.Name
	tektonEventListener.Spec.ServiceAccountName = metaDataObj.MetaDataObj.Sa

	tektonEventListener.Spec.Triggers = append(tektonEventListener.Spec.Triggers, apimachinery.EventListenerTrigger{
		Template:          apimachinery.EventListenerTemplate{Name: tektonTriggerTemplate.ObjectMeta.Name},
		Name:              tektonParam.Name + "-trigger",
		DeprecatedBinding: &apimachinery.EventListenerBinding{Name: tektonTriggerBinding.ObjectMeta.Name},
	})

	var pipline pipelinev1.Pipeline
	pipline.APIVersion = "tekton.dev/v1alpha1"
	pipline.Kind = "Pipeline"
	pipline.ObjectMeta.Name = tektonParam.Name + "-pipeline"
	pipline.ObjectMeta.Namespace = ns.Name

	var pipelineTask pipelinev1.PipelineTask
	pipelineTask.Resources = &pipelinev1.PipelineTaskResources{}
	pipelineTask.Name = tektonParam.Name + "-task"
	pipelineTask.Resources.Inputs = append(pipelineTask.Resources.Inputs, pipelinev1.PipelineTaskInputResource{
		Name:     "source-" + tektonParam.Name,
		Resource: "source-" + tektonParam.Name,
	})
	pipelineTask.TaskRef = pipelinev1.TaskRef{
		Name: tektonParam.Name + "-task",
	}

	prParams := make([]pipelinev1.Param, 0)
	for _, v := range metaDataObj.MetaDataObj.Params {
		var param pipelinev1.Param
		var prParam pipelinev1.Param
		var paramspec pipelinev1.ParamSpec

		param.Name = v
		prParam.Name = v
		param.Value.Type = "string"
		prParam.Value.Type = "string"
		param.Value.StringVal = "$(body." + v + ")"
		prParam.Value.StringVal = "$(params." + v + ")"
		paramspec.Name = v
		paramspec.Description = v

		tektonTriggerBinding.Spec.Params = append(tektonTriggerBinding.Spec.Params, param)
		tektonTriggerTemplate.Spec.Params = append(tektonTriggerTemplate.Spec.Params, paramspec)
		pipline.Spec.Params = append(pipline.Spec.Params, paramspec)
		pipelineTask.Params = append(pipelineTask.Params, prParam)
		prParams = append(prParams, prParam)
	}

	var pResource pipelinev1.PipelineDeclaredResource
	pResource.Name = "source-" + tektonParam.Name
	pResource.Type = "git"
	pipline.Spec.Resources = append(pipline.Spec.Resources, pResource)
	pipline.Spec.Tasks = append(pipline.Spec.Tasks, pipelineTask)

	tT, err := t.generateTriggerResourceTemplate(ns.Name, metaDataObj, prParams)
	if err != nil {
		return false
	}
	tektonTriggerTemplate.Spec.ResourceTemplates = tT
	fmt.Println(string(tektonTriggerTemplate.Spec.ResourceTemplates[0].RawMessage))

	tektonTt, err := json.Marshal(tektonTriggerTemplate)
	if err != nil {
		logs.Error("json marshall tektonTriggerTemplate error. %v", err.Error())
		return false
	}

	tektonTb, err := json.Marshal(tektonTriggerBinding)
	if err != nil {
		logs.Error("json marshall tektonTriggerBinding error. v%", err.Error())
		return false
	}

	tektonEl, err := json.Marshal(tektonEventListener)
	if err != nil {
		logs.Error("json marshall tektonEventListener error. v%", err.Error())
		return false
	}

	tektonPipeline, err := json.Marshal(pipline)
	if err != nil {
		logs.Error("json marshall pipline error. v%", err.Error())
		return false
	}

	for _, clu := range metaDataObj.MetaDataObj.Clusters {
		cli := t.Client(clu)
		if ops == TektonAdd {
			reslutPp, err := crd.CreatTektonCRD(cli, "pipelines", ns.Name, tektonPipeline)
			if err != nil {
				logs.Error("create Pipeline by cluster (%s) error.%v", clu, err)
				return false
			}
			fmt.Println(reslutPp)

			resultTb, err := crd.CreatTektonCRD(cli, "triggerbindings", ns.Name, tektonTb)
			if err != nil {
				logs.Error("create triggerBinding by cluster (%s) error.%v", clu, err)
				return false
			}
			fmt.Println(resultTb)

			resultTt, err := crd.CreatTektonCRD(cli, "triggertemplates", ns.Name, tektonTt)
			if err != nil {
				logs.Error("create triggerTemplate by cluster (%s) error.%v", clu, err)
				return false
			}
			fmt.Println(resultTt)

			resultEl, err := crd.CreatTektonCRD(cli, "eventlisteners", ns.Name, tektonEl)
			if err != nil {
				logs.Error("create eventListener by cluster (%s) error.%v", clu, err)
				return false
			}
			fmt.Println(resultEl)

		} else if ops == TektonUpdate {
			obj, err := crd.GetTektonCRD(cli, "pipelines", ns.Name, pipline.ObjectMeta.Name)
			if err != nil {
				logs.Error("get task by cluster error.%v", err)
				t.AbortInternalServerError("发布失败")
			} else {
				var object pipelinev1.Pipeline
				err = json.Unmarshal(obj.(*runtime.Unknown).Raw, &object)
				pipline.ObjectMeta = object.ObjectMeta
				tektonPipeline, _ := json.Marshal(pipline)

				resultPp, err := crd.UpdateTektonCRD(cli, "pipelines", ns.Name, pipline.ObjectMeta.Name, tektonPipeline)
				if err != nil {
					logs.Error("update triggerTemplate by cluster (%s) error.%v", clu, err)
					return false
				}
				fmt.Println(resultPp)
			}

			obj, err = crd.GetTektonCRD(cli, "triggerbindings", ns.Name, tektonTriggerBinding.ObjectMeta.Name)
			if err != nil {
				logs.Error("get task by cluster error.%v", err)
				t.AbortInternalServerError("发布失败")
			} else {
				var object v1alpha1.TriggerBinding
				err = json.Unmarshal(obj.(*runtime.Unknown).Raw, &object)
				tektonTriggerBinding.ObjectMeta = object.ObjectMeta
				tektonTb, _ := json.Marshal(tektonTriggerBinding)

				resultTb, err := crd.UpdateTektonCRD(cli, "triggerbindings", ns.Name, tektonTriggerBinding.ObjectMeta.Name, tektonTb)
				if err != nil {
					logs.Error("update triggerTemplate by cluster (%s) error.%v", clu, err)
					return false
				}
				fmt.Println(resultTb)
			}

			obj, err = crd.GetTektonCRD(cli, "triggertemplates", ns.Name, tektonTriggerTemplate.ObjectMeta.Name)
			if err != nil {
				logs.Error("get task by cluster error.%v", err)
				t.AbortInternalServerError("发布失败")
			} else {
				var object v1alpha1.TriggerTemplate
				err = json.Unmarshal(obj.(*runtime.Unknown).Raw, &object)
				tektonTriggerTemplate.ObjectMeta = object.ObjectMeta
				tektonTt, _ := json.Marshal(tektonTriggerTemplate)
				resultTt, err := crd.UpdateTektonCRD(cli, "triggertemplates", ns.Name, tektonTriggerTemplate.ObjectMeta.Name, tektonTt)
				if err != nil {
					logs.Error("update triggerTemplate by cluster (%s) error.%v", clu, err)
					return false
				}
				fmt.Println(resultTt)
			}

			obj, err = crd.GetTektonCRD(cli, "eventlisteners", ns.Name, tektonEventListener.ObjectMeta.Name)
			if err != nil {
				logs.Error("get task by cluster error.%v", err)
				t.AbortInternalServerError("发布失败")
			} else {
				var object v1alpha1.EventListener
				err = json.Unmarshal(obj.(*runtime.Unknown).Raw, &object)
				tektonEventListener.ObjectMeta = object.ObjectMeta
				tektonEl, _ := json.Marshal(tektonEventListener)

				resultEl, err := crd.UpdateTektonCRD(cli, "eventlisteners", ns.Name, tektonEventListener.ObjectMeta.Name, tektonEl)
				if err != nil {
					logs.Error("update eventlistener by cluster (%s) error.%v", clu, err)
					return false
				}
				fmt.Println(resultEl)
			}

		} else if ops == TektonDel {

		}
	}
	return true
}

func (t *TektonController) generateTriggerResourceTemplate(ns string, tektonParam *models.TektonParam, prParams []pipelinev1.Param) ([]v1alpha1.TriggerResourceTemplate, error) {
	var pipelineResource pipelinev1.PipelineResource
	pipelineResource.APIVersion = "tekton.dev/v1alpha1"
	pipelineResource.Kind = "PipelineResource"
	pipelineResource.ObjectMeta.Name = "source-" + tektonParam.Name + "-$(uid)"
	pipelineResource.ObjectMeta.Namespace = ns
	pipelineResource.Spec.Params = append(pipelineResource.Spec.Params, pipelinev1.ResourceParam{
		Name:  "revision",
		Value: "$(params.gitReversion)",
	})
	pipelineResource.Spec.Params = append(pipelineResource.Spec.Params, pipelinev1.ResourceParam{
		Name:  "url",
		Value: "$(params.gitUrl)",
	})
	pipelineResource.Spec.Type = "git"

	var pipelineRun pipelinev1.PipelineRun
	pipelineRun.APIVersion = "tekton.dev/v1alpha1"
	pipelineRun.Kind = "PipelineRun"
	pipelineRun.ObjectMeta.Name = tektonParam.Name + "-$(params.pipelineExecuteId)"
	pipelineRun.ObjectMeta.Namespace = ns
	pipelineRun.Spec.Params = prParams
	var pipelinRef pipelinev1.PipelineRef
	pipelinRef.Name = tektonParam.Name + "-pipeline"
	pipelineRun.Spec.PipelineRef = &pipelinRef

	//Tekton-TriggerTemplate podTemplate
	if tektonParam.MetaDataObj.Volumns["volumn"].(map[string]interface{})["checked"].(bool) {
		var volumn corev1.Volume
		volumn.Name = tektonParam.MetaDataObj.Volumns["volumn"].(map[string]interface{})["name"].(string)
		var pvvs corev1.PersistentVolumeClaimVolumeSource
		pvvs.ClaimName = tektonParam.MetaDataObj.Volumns["volumn"].(map[string]interface{})["pvc"].(string)
		volumn.PersistentVolumeClaim = &pvvs
		pipelineRun.Spec.PodTemplate.Volumes = append(pipelineRun.Spec.PodTemplate.Volumes, volumn)
	}

	var resource pipelinev1.PipelineResourceBinding
	resource.Name = "source-" + tektonParam.Name
	resource.ResourceRef = &pipelinev1.PipelineResourceRef{Name: "source-" + tektonParam.Name + "-$(uid)"}
	pipelineRun.Spec.Resources = append(pipelineRun.Spec.Resources, resource)

	pipelineRun.Spec.ServiceAccountName = tektonParam.MetaDataObj.Sa

	var tT []v1alpha1.TriggerResourceTemplate
	pResourceByte, err := json.Marshal(pipelineResource)
	if err != nil {
		logs.Error(err)
		return nil, err
	}
	tT = append(tT, v1alpha1.TriggerResourceTemplate{pResourceByte})

	pRunByte, err := json.Marshal(pipelineRun)
	if err != nil {
		logs.Error(err)
		return nil, err
	}
	tT = append(tT, v1alpha1.TriggerResourceTemplate{pRunByte})

	return tT, nil
}

// @Title Get
// @Description find Object by id
// @Param	id		path 	int	true		"the id you want to get"
// @Success 200 {object} models.TektonParam success
// @router /:id([0-9]+) [get]
func (t *TektonController) Get() {
	id := t.GetIDFromURL()

	tektonParam, err := models.TektonParamModel.GetById(int64(id))
	if err != nil {
		logs.Error("get by id (%d) error.%v", id, err)
		t.HandleError(err)
		return
	}

	t.Success(tektonParam)
}

// @Title Update
// @Description update the Deployment
// @Param	id		path 	int	true		"The id you want to update"
// @Param	body		body 	models.TektonParam	true		"The body"
// @Success 200 models.TektonParam success
// @router /:id([0-9]+) [put]
func (t *TektonController) Update() {
	id := t.GetIDFromURL()

	var tektonParam models.TektonParam
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tektonParam)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		t.AbortBadRequestFormat("Deployment")
	}

	tektonParam.Id = int64(id)
	err = models.TektonParamModel.UpdateById(&tektonParam)
	if err != nil {
		logs.Error("update error.%v", err)
		t.HandleError(err)
		return
	}

	flag := t.generateTrigger(int64(id), tektonParam, TektonUpdate)
	if !flag {
		t.AbortInternalServerError("发布tekton trigger失败")
	}
	t.Success(tektonParam)
}

// @Title UpdateOrders
// @Description batch update the Orders
// @Param	body		body 	[]models.TektonParam	true		"The body"
// @Success 200 models.TektonParam success
// @router /updateorders [put]
func (t *TektonController) UpdateOrders() {
	var tektonParam []*models.TektonParam
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tektonParam)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		t.AbortBadRequestFormat("Deployments")
	}

	err = models.TektonParamModel.UpdateOrders(tektonParam)
	if err != nil {
		logs.Error("update orders (%v) error.%v", tektonParam, err)
		t.HandleError(err)
		return
	}
	t.Success("ok!")
}

// @Title Delete
// @Description delete the Deployment
// @Param	id		path 	int	true		"The id you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @router /:id([0-9]+) [delete]
func (t *TektonController) Delete() {
	id := t.GetIDFromURL()

	//logical := t.GetLogicalFromQuery()

	flag := t.deleteTrigger(int64(id))
	if !flag {
		logs.Error("delete crd trigger error. v%")
		t.AbortInternalServerError("delete crd trigger error")
	}

	err := models.TektonParamModel.DeleteById(int64(id), false)
	if err != nil {
		logs.Error("delete %d error.%v", id, err)
		t.HandleError(err)
		return
	}

	t.Success(nil)
}

func (t *TektonController) deleteTrigger(id int64) bool {
	ns, err := models.NamespaceModel.GetById(t.NamespaceId)
	if err != nil {
		logs.Error("orm get namespace error. v%", err.Error())
		return false
	}

	metaDataObj, err := models.TektonParamModel.GetParseMetaDataById(id)
	if err != nil {
		logs.Error("get tektonparam error. %v", err.Error())
		return false
	}

	for _, clu := range metaDataObj.MetaDataObj.Clusters {
		cli := t.Client(clu)
		err := crd.DeleteTektonCRD(cli, "triggertemplates", ns.Name, metaDataObj.Name+"-triggertemplate")
		if err != nil {
			logs.Error("delete TriggerTemplate error.v%", err.Error())
			return false
		}

		err = crd.DeleteTektonCRD(cli, "triggerbindings", ns.Name, metaDataObj.Name+"-triggerbinding")
		if err != nil {
			logs.Error("delete TriggerBinding error.v%", err.Error())
			return false
		}

		err = crd.DeleteTektonCRD(cli, "eventlisteners", ns.Name, metaDataObj.Name+"-eventlistener")
		if err != nil {
			logs.Error("delete EventListener error.v%", err.Error())
			return false
		}

		err = crd.DeleteTektonCRD(cli, "pipelines", ns.Name, metaDataObj.Name+"-pipeline")
		if err != nil {
			logs.Error("delete pipelines error.v%", err.Error())
			return false
		}
	}
	return true
}
