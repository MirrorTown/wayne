package pipeline

import (
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/util/json"
)

type PipelineController struct {
	base.APIController
}

func (p *PipelineController) URLMapping() {
	p.Mapping("List", p.List)
	p.Mapping("All", p.All)
	p.Mapping("Get", p.Get)
	p.Mapping("Create", p.Create)
	p.Mapping("Update", p.Update)
	p.Mapping("Delete", p.Delete)
}

func (t *PipelineController) Prepare() {
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

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} []models.Pipeline success
// @router / [get]
func (p *PipelineController) List() {
	param := p.BuildQueryParam()
	pipelines := []models.Pipeline{}

	total, err := models.GetTotal(new(models.Pipeline), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		p.HandleError(err)
		return
	}
	err = models.GetAll(new(models.Pipeline), &pipelines, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		p.HandleError(err)
		return
	}

	for index := range pipelines {
		tektonBuilds, _ := models.PipelineModel.GetTektonBuildById(pipelines[index].Id)
		pipelines[index].TektonBuilds = tektonBuilds
	}

	p.Success(param.NewPage(total, pipelines))
}

// @Title All
// @Description get all objects
// @Success 200 {object} []models.Pipeline success
// @router /all [get]
func (p *PipelineController) All() {
	pipelines, err := models.PipelineModel.List()
	if err != nil {
		logs.Error("List Pipeline error. %v", err)
		p.HandleError(err)
		return
	}

	p.Success(pipelines)
}

// @Title Get
// @Description find Object by id
// @Param	id		path 	int	true		"the id you want to get"
// @Success 200 {object} models.Pipeline success
// @router /:id([0-9]+) [get]
func (p *PipelineController) Get() {
	id := p.GetIntParamFromURL(":id")

	pipeline, err := models.PipelineModel.GetById(id)
	if err != nil {
		logs.Error("get error.%v", err)
		p.HandleError(err)
		return
	}

	p.Success(pipeline)
}

// @Title Create
// @Description update the Pipeline
// @Param	body		body 	models.Pipeline	true		"The body"
// @Success 200 models.Pipeline success
// @router / [post]
func (p *PipelineController) Create() {
	var pipeline models.Pipeline
	err := json.Unmarshal(p.Ctx.Input.RequestBody, &pipeline)
	if err != nil {
		logs.Error("get body error. %v", err)
		p.AbortBadRequestFormat("Pipeline")
	}

	err = models.PipelineModel.Add(&pipeline)

	if err != nil {
		logs.Error("create pipeline error.%v", err.Error())
		p.HandleError(err)
		return
	}
	p.Success("success")
}

// @Title Update
// @Description update the Pipeline
// @Param	id		path 	int	true		"The id you want to update"
// @Param	body		body 	models.Pipeline	true		"The body"
// @Success 200 models.Pipeline success
// @router /:id([0-9]+) [put]
func (p *PipelineController) Update() {
	id := p.GetIntParamFromURL(":id")

	var pipeline models.Pipeline
	err := json.Unmarshal(p.Ctx.Input.RequestBody, &pipeline)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		p.AbortBadRequestFormat("Pipeline")
	}

	pipeline.Id = id
	err = models.PipelineModel.Update(&pipeline)
	if err != nil {
		logs.Error("update pipeline error.%v", err)
		p.HandleError(err)
		return
	}
	p.Success(pipeline)
}

// @Title Delete
// @Description delete the app
// @Param	name		path 	string	true		"The name you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @Failure 403 name is empty
// @router /:id([0-9]+) [delete]
func (p *PipelineController) Delete() {
	id := p.GetIntParamFromURL(":id")

	logical := p.GetLogicalFromQuery()

	err := models.PipelineModel.Delete(id, logical)
	if err != nil {
		logs.Error("delete error.%v", err)
		p.HandleError(err)
		return
	}
	p.Success(nil)
}
