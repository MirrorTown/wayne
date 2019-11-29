package workstep

import (
	"github.com/Qihoo360/wayne/src/backend/apimachinery/deploy"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/astaxie/beego/orm"
)

type WorkStepController struct {
	base.APIController
}

func (w *WorkStepController) URLMapping() {
	w.Mapping("Get", w.Get)
	w.Mapping("Update", w.Update)
}

func (w *WorkStepController) Prepare() {
	w.APIController.Prepare()
}

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} int64 success
// @router /namespace/:nsId/apps/:appId/deployment/:depId [get]
func (w *WorkStepController) Get() {
	/*nsId := w.GetIntParamFromURL(":nsId")
	appId := w.GetIntParamFromURL(":appId")*/
	depId := w.GetIntParamFromURL(":depId")

	deploymentName, err := models.DeploymentTplModel.GetOneById(depId)
	if err == orm.ErrNoRows {
		w.Success(models.StepNotBegin)
		return
	} else if err != nil {
		logs.Error(err)
		w.AbortInternalServerError("查询流程失败")
	}
	statusReview, err := models.ReviewModel.GetLatestByName(deploymentName)
	if err == orm.ErrNoRows {
		logs.Error(err)
		w.Success(models.StepNotBegin)
		return
	} else if err != nil {
		logs.Error(err)
		w.AbortInternalServerError("查询流程失败")
		return
	}

	statusDeploy, err := deploy.NewDeployInterface(w.User.Display, deploymentName, "", "", "", "", "", -1).
		GetDeployStatus()
	if err == orm.ErrNoRows && statusReview == models.ReviewStatusReject {
		w.Success(models.StepVerifyFail)
		return
	} else if err != nil {
		logs.Error(err)
		w.AbortInternalServerError("查询流程失败")
		return
	}
	//Stepflow 1:发布流程进行中 2:发布流程结束
	if statusDeploy.Stepflow == 2 {
		switch statusDeploy.Status {
		case models.DeploySuc:
			w.Success(models.StepOverSuc)
			return
		case models.DeployFail:
			w.Success(models.StepOverFail)
			return
		case models.DeployReject:
			w.Success(models.StepVerifyFail)
			return
		}
	}

	//审核通过或则正式发布发布中皆为审核通过状态
	if statusReview == models.ReviewStatusPass || statusDeploy.Status == models.Deploying {
		//审核通过后，如果为发布中状态则变更状态为发布中
		if statusDeploy.Status == models.Deploying {
			w.Success(models.StepDeploy)
		} else {
			w.Success(models.StepVerify)
		}
	} else if statusReview == models.ReviewStatusTobe {
		w.Success(models.StepBegin)
	}

}

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} int64 success
// @router /namespace/:nsId/apps/:appId/deployment/:depId [post]
func (w *WorkStepController) Update() {
	/*nsId := w.GetIntParamFromURL(":nsId")
	appId := w.GetIntParamFromURL(":appId")*/
	depId := w.GetIntParamFromURL(":depId")

	deploymentName, err := models.DeploymentTplModel.GetOneById(depId)
	if err != nil {
		logs.Error(err)
		w.AbortInternalServerError("更新流程失败")
	}

	deploy := &models.Deploy{
		Name:     deploymentName,
		Status:   models.DeployFail,
		Stepflow: 2,
	}
	err = deploy.UpdatePublishStepflow(deploy)
	if err != nil {
		logs.Error("更新工作流失败: ", err)
		w.AbortInternalServerError("更新工作流失败")
	}

	w.Success("更新工作流成功")
}
