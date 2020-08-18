package pipeline

import (
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/util/json"
)

type ConfigMapHulkController struct {
	base.APIController
}

func (p *ConfigMapHulkController) URLMapping() {
	p.Mapping("List", p.List)
	p.Mapping("All", p.All)
	p.Mapping("Get", p.Get)
	p.Mapping("Create", p.Create)
	p.Mapping("Update", p.Update)
	p.Mapping("Delete", p.Delete)
}

func (t *ConfigMapHulkController) Prepare() {
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
// @Success 200 {object} []models.ConfigMapHulk success
// @router / [get]
func (p *ConfigMapHulkController) List() {
	param := p.BuildQueryParam()
	configs := []models.ConfigMapHulk{}

	total, err := models.GetTotal(new(models.ConfigMapHulk), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		p.HandleError(err)
		return
	}
	err = models.GetAll(new(models.ConfigMapHulk), &configs, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		p.HandleError(err)
		return
	}

	p.Success(param.NewPage(total, configs))
}

// @Title All
// @Description get all objects
// @Success 200 {object} []models.ConfigmapHulk success
// @router /all [get]
func (p *ConfigMapHulkController) All() {
	configs, err := models.ConfigmapHulkModel.List()
	if err != nil {
		logs.Error("List Pipeline error. %v", err)
		p.HandleError(err)
		return
	}

	p.Success(configs)
}

// @Title Get
// @Description find Object by id
// @Param	id		path 	int	true		"the id you want to get"
// @Success 200 {object} models.ConfigmapHulk success
// @router /:id([0-9]+) [get]
func (p *ConfigMapHulkController) Get() {
	id := p.GetIntParamFromURL(":id")

	config, err := models.ConfigmapHulkModel.GetById(id)
	if err != nil {
		logs.Error("get error.%v", err)
		p.HandleError(err)
		return
	}

	p.Success(config)
}

// @Title Create
// @Description update the ConfigmapHulk
// @Param	body		body 	models.ConfigmapHulk	true		"The body"
// @Success 200 models.ConfigmapHulk success
// @router / [post]
func (p *ConfigMapHulkController) Create() {
	var config models.ConfigMapHulk
	err := json.Unmarshal(p.Ctx.Input.RequestBody, &config)
	if err != nil {
		logs.Error("get body error. %v", err)
		p.AbortBadRequestFormat("Pipeline")
	}

	err = models.ConfigmapHulkModel.Add(&config)

	if err != nil {
		logs.Error("create pipeline error.%v", err.Error())
		p.HandleError(err)
		return
	}
	p.Success("success")
}

// @Title Update
// @Description update the ConfigmapHulk
// @Param	id		path 	int	true		"The id you want to update"
// @Param	body		body 	models.ConfigmapHulk	true		"The body"
// @Success 200 models.ConfigmapHulk success
// @router /:id([0-9]+) [put]
func (p *ConfigMapHulkController) Update() {
	id := p.GetIntParamFromURL(":id")

	var config models.ConfigMapHulk
	err := json.Unmarshal(p.Ctx.Input.RequestBody, &config)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		p.AbortBadRequestFormat("Pipeline")
	}

	config.Id = id
	err = models.ConfigmapHulkModel.Update(&config)
	if err != nil {
		logs.Error("update pipeline error.%v", err)
		p.HandleError(err)
		return
	}
	p.Success(config)
}

// @Title Delete
// @Description delete the app
// @Param	name		path 	string	true		"The name you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @Failure 403 name is empty
// @router /:id([0-9]+) [delete]
func (p *ConfigMapHulkController) Delete() {
	id := p.GetIntParamFromURL(":id")
	logical := p.GetLogicalFromQuery()

	err := models.ConfigmapHulkModel.Delete(id, logical)
	if err != nil {
		logs.Error("delete error.%v", err)
		p.HandleError(err)
		return
	}
	p.Success(nil)
}
