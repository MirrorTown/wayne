package tekton

import (
	"errors"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/util/json"
)

var ErrNoRows = errors.New("<QuerySeter> no row found")

type TektonBuildController struct {
	base.APIController
}

func (t *TektonBuildController) URLMapping() {
	t.Mapping("Get", t.Get)
	t.Mapping("Edit", t.Edit)
}

func (t *TektonBuildController) Prepare() {
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

// @Title Create
// @Description create TektonBuild
// @Param	body		body 	models.TektonBuild	true		"The TektonBuild content"
// @Success 200 return models.TektonBuild success
// @router / [post]
func (t *TektonBuildController) Edit() {
	var tb models.TektonBuild
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tb)
	if err != nil {
		logs.Error("get body error. %v", err)
		t.AbortBadRequestFormat("TektonBuild")
	}

	tb.User = t.User.Name
	tbId, err := models.TektonBuildModel.Edit(&tb)
	if err != nil {
		logs.Error("Edit error.%v", err.Error())
		t.HandleError(err)
		return
	}

	t.Success(tbId)
}

// @Title Get
// @Description find Object by id
// @Param	buildId		path 	int	true		"the id you want to get"
// @Success 200 {object} models.TektonParam success
// @router /:deploymentId([0-9]+) [get]
func (t *TektonBuildController) Get() {
	deploymentId := t.GetIntParamFromURL(":deploymentId")

	tektonBuild, err := models.TektonBuildModel.GetByDeploymentId(deploymentId)
	if err != nil && err.Error() == ErrNoRows.Error() {
		t.Success("No Row Found")
		return
	} else if err != nil {
		logs.Error("获取构建模版信息失败, ", err)
		t.HandleError(err)
		return
	}

	t.Success(tektonBuild)
}
