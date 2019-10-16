package harbor

import (
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/util/json"
)

// 镜像相关操作
type HarborController struct {
	base.APIController
}

func (c *HarborController) URLMapping() {
	c.Mapping("GetNames", c.GetNames)
	c.Mapping("List", c.List)
	c.Mapping("Create", c.Create)
	c.Mapping("Get", c.Get)
	c.Mapping("Update", c.Update)
	c.Mapping("Delete", c.Delete)
}

func (c *HarborController) Prepare() {
	// Check administration
	c.APIController.Prepare()

	// Check permission
	perAction := ""
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
	}
}

// @Title List/
// @Description get all id and names
// @Param	deleted		query 	bool	false		"is deleted,default false."
// @Success 200 {object} []models.Harbor success
// @router /names [get]
func (c *HarborController) GetNames() {
	deleted := c.GetDeleteFromQuery()

	services, err := models.HarborModel.GetNames()
	if err != nil {
		logs.Error("get names error. %v, delete-status %v", err, deleted)
		c.HandleError(err)
		return
	}

	c.Success(services)
}

// @Title Create
// @Description create Harbor
// @Param	body		body 	models.Harbor	true		"The app content"
// @Success 200 return id success
// @Failure 403 body is empty
// @router / [post]
func (c *HarborController) Create() {
	var harbor models.Harbor
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &harbor)
	if err != nil {
		logs.Error("get body error. %v", err)
		c.AbortBadRequestFormat("Harbor")
	}

	objectid, err := models.HarborModel.Add(&harbor)

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
// @Param	body		body 	models.Harbor	true		"The body"
// @Success 200 id success
// @Failure 403 :name is empty
// @router /:name [put]
func (c *HarborController) Update() {
	name := c.Ctx.Input.Param(":name")

	var harbor models.Harbor
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &harbor)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		c.AbortBadRequestFormat("Harbor")
	}
	harbor.Name = name
	err = models.HarborModel.UpdateByName(&harbor)
	if err != nil {
		logs.Error("update error.%v", err)
		c.HandleError(err)
		return
	}
	c.Success(harbor)
}

// @Title Get
// @Description find Object by objectid
// @Param	name		path 	string	true		"the name you want to get"
// @Success 200 {object} models.Harbor success
// @Failure 403 :name is empty
// @router /:name [get]
func (c *HarborController) Get() {
	name := c.Ctx.Input.Param(":name")

	harbor, err := models.HarborModel.GetByName(name)
	if err != nil {
		logs.Error("get error.%v", err)
		c.HandleError(err)
		return
	}
	// 非admin用户不允许查看kubeconfig配置
	if !c.User.Admin {
		harbor.Passwd = ""
	}
	c.Success(harbor)
}

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} []models.Harbor success
// @router / [get]
func (c *HarborController) List() {
	param := c.BuildQueryParam()
	harbors := []models.Harbor{}

	total, err := models.GetTotal(new(models.Harbor), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		c.HandleError(err)
		return
	}
	err = models.GetAll(new(models.Harbor), &harbors, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		c.HandleError(err)
		return
	}
	// 非admin用户不允许查看passwd
	if !c.User.Admin {
		for i := range harbors {
			harbors[i].Passwd = ""
		}
	}

	c.Success(param.NewPage(total, harbors))
	return
}

// @Title Delete
// @Description delete the app
// @Param	name		path 	string	true		"The name you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @Failure 403 name is empty
// @router /:name [delete]
func (c *HarborController) Delete() {
	name := c.Ctx.Input.Param(":name")

	logical := c.GetLogicalFromQuery()

	err := models.HarborModel.DeleteByName(name, logical)
	if err != nil {
		logs.Error("delete error.%v", err)
		c.HandleError(err)
		return
	}
	c.Success(nil)
}
