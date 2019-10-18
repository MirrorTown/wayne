package review

import (
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/util/json"
)


// 审核相关操作
type ReviewController struct {
	base.APIController
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
// @router / [post]
func (c *ReviewController) Create() {
	var review models.Review
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &review)
	if err != nil {
		logs.Error("get body error. %v", err)
		c.AbortBadRequestFormat("Review")
	}

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
// @router /:name [put]
func (c *ReviewController) Update() {
	name := c.Ctx.Input.Param(":name")

	var review models.Review
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &review)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		c.AbortBadRequestFormat("Review")
	}
	review.Name = name
	err = models.ReviewModel.UpdateByName(&review)
	if err != nil {
		logs.Error("update error.%v", err)
		c.HandleError(err)
		return
	}
	c.Success(review)
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
