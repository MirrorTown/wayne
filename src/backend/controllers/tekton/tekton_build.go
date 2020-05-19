package tekton

import (
	"bytes"
	"errors"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/hack"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"k8s.io/apimachinery/pkg/util/json"
	"net/http"
	"time"
)

var ErrNoRows = errors.New("<QuerySeter> no row found")

type TektonBuildController struct {
	base.APIController
}

func (t *TektonBuildController) URLMapping() {
	t.Mapping("Get", t.Get)
	t.Mapping("Edit", t.Edit)
	t.Mapping("Create", t.Create)
	t.Mapping("List", t.List)
	t.Mapping("Publish", t.Publish)
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

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} []models.BuildReview success
// @router / [get]
func (t *TektonBuildController) List() {
	param := t.BuildQueryParam()
	buildReviews := []models.BuildReview{}

	total, err := models.GetTotal(new(models.BuildReview), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		t.HandleError(err)
		return
	}
	err = models.GetAll(new(models.BuildReview), &buildReviews, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		t.HandleError(err)
		return
	}
	// 非admin用户不允许查看passwd
	/*if !c.User.Admin {
		for i := range reviews {
			reviews[i].Passwd = ""
		}
	}*/

	t.Success(param.NewPage(total, buildReviews))
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

// @Title Create
// @Description update the TektonBuild
// @Param	id		path 	int	true		"The id you want to update"
// @Param	body		body 	models.TektonBuild	true		"The body"
// @Success 200 models.TektonBuild success
// @router / [post]
func (t *TektonBuildController) Create() {
	var tektonBuild models.TektonBuild
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &tektonBuild)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		t.AbortBadRequestFormat("TektonBuild")
	}

	var tektonBuildMetaData models.TektonBuildMetaData
	err = json.Unmarshal(hack.Slice(tektonBuild.MetaData), &tektonBuildMetaData)
	if err != nil {
		logs.Error("Unmarshal tektonBuild metadata (%s) error. %v", tektonBuild.MetaData, err)
		t.AbortBadRequestFormat("Bad MetaData")
	}

	if tektonBuild.Status == "关闭审核" {
		pipelineExecuteId := time.Now().Format("20060102150405")
		err = models.TektonBuildModel.Update(tektonBuild, 2, pipelineExecuteId)
		if err != nil {
			logs.Error("Update TektonBuild error.%v", err)
			t.AbortBadRequestFormat("Update TektonBuild error")
		}

		err = t.deploy(tektonBuild.Name, pipelineExecuteId)
		if err != nil {
			logs.Error("构建失败", err)
			t.AbortInternalServerError("构建时出现异常")
		}
		t.Success("构建成功")
		return
	}
	//开启审核时所需信息
	var buildVersion string
	for _, metaMap := range tektonBuildMetaData.Params {
		if metaMap["key"] == "repoRevision" || metaMap["key"] == "gitRevision" || metaMap["key"] == "gitReversion" {
			buildVersion = metaMap["value"]
			break
		}
	}
	tektonBuild.Stepflow = 1
	_, err = models.TektonBuildModel.Edit(&tektonBuild)
	if err != nil {
		logs.Error("更新tektonBuild表数据失败")
		t.AbortInternalServerError("更新tektonBuild表数据失败")
	}

	_, err = models.BuildReviewModel.Add(&models.BuildReview{
		Name:         tektonBuild.Name,
		AppId:        tektonBuild.AppId,
		DeploymentId: tektonBuild.DeploymentId,
		Announcer:    t.User.Display,
		BuildTime:    nil,
		CreateTime:   nil,
		Version:      buildVersion,
		Status:       0,
	})

	t.Success("ok")
}

// @Title Publish
// @Description update the object
// @Param	name		path 	string	true		"The name you want to update"
// @Param	body		body 	models.BuildReview	true		"The body"
// @Success 200 id success
// @Failure 403 :name is empty
// @router /publish [put]
func (t *TektonBuildController) Publish() {
	var buildReview models.BuildReview
	err := json.Unmarshal(t.Ctx.Input.RequestBody, &buildReview)
	if err != nil {
		logs.Error("Invalid param body.%v", err)
		t.AbortBadRequestFormat("Bad BuildReview")
	}

	buildReview.Auditors = t.User.Display
	buildReview.AnnounceTime = time.Now().Format("2006/1/2 15:04:05")
	err = models.BuildReviewModel.UpdateByName(&buildReview)
	if err != nil {
		logs.Error("Update BuildReview error.%v", err)
		t.AbortBadRequestFormat("Update BuildReview Error")
	}

	if buildReview.Status == models.BuildReviewStatusPass {
		pipelineExecuteId := time.Now().Format("20060102150405")
		err = models.TektonBuildModel.UpdateByName(buildReview.Name, 2, pipelineExecuteId)
		if err != nil {
			logs.Error("Update TektonBuild error.%v", err)
			t.AbortBadRequestFormat("Update TektonBuild error")
		}

		t.deploy(buildReview.Name, pipelineExecuteId)
	} else {
		err = models.TektonBuildModel.UpdateByName(buildReview.Name, -1)
		if err != nil {
			logs.Error("Update TektonBuild error.%v", err)
			t.AbortBadRequestFormat("Update TektonBuild error")
		}
	}

	t.Success("success")
}

func (t *TektonBuildController) deploy(buildName, pipelineExecuteId string) error {
	tektonBuild, err := models.TektonBuildModel.GetByName(buildName)

	pipeline, err := models.PipelineModel.GetById(tektonBuild.PipelineId)
	if err != nil {
		logs.Error("查询pipeline. %v 失败, %v", tektonBuild.PipelineId, err)
		return err
	}
	postUri := pipeline.BuildUri

	var tektonBuildMetaData models.TektonBuildMetaData
	err = json.Unmarshal(hack.Slice(tektonBuild.MetaData), &tektonBuildMetaData)
	if err != nil {
		logs.Error("Unmarshal tektonBuild metadata (%s) error. %v", tektonBuild.MetaData, err)
		return err
	}
	var meataMap = make(map[string]string, 0)
	for _, v := range tektonBuildMetaData.Params {
		if v["key"] == "pipelineExecuteId" {
			meataMap[v["key"]] = pipelineExecuteId
		} else {
			meataMap[v["key"]] = v["value"]
		}
	}

	body, err := json.Marshal(meataMap)

	client := &http.Client{}
	var req *http.Request
	req, _ = http.NewRequest(http.MethodPost, postUri, bytes.NewReader(body))

	resp, err := client.Do(req)
	if err != nil {
		logs.Error("发送构建信息失败,", err)
		_ = models.TektonBuildModel.UpdateByExecuteId(pipelineExecuteId, -2)
		return err
	}
	//b, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	//models.TektonBuildModel.UpdateByExecuteId(pipelineExecuteId, -3)

	return nil
}

// @Title Get
// @Description find Object by id
// @Param	buildId		path 	int	true		"the id you want to get"
// @Success 200 {object} models.TektonBuild success
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

	if tektonBuild.PipelineId != 0 {
		pipeline, err := models.PipelineModel.GetById(tektonBuild.PipelineId)
		if err != nil {
			logs.Error("查询pipeline. %v 失败, %v", tektonBuild.PipelineId, err)
			t.AbortInternalServerError("查询pipeline表失败")
			return
		}

		tektonBuild.LogUri = pipeline.LogUri
	}

	t.Success(tektonBuild)
}
