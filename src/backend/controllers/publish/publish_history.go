package publish

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/resources/deployment"
	"io/ioutil"
	"k8s.io/apimachinery/pkg/util/json"
	"strconv"

	//"k8s.io/apimachinery/pkg/util/json"
	"time"

	"github.com/Qihoo360/wayne/src/backend/client"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

type PublishController struct {
	base.APIController
}

var register = make(map[string]DeployToK8s)

type DeployToK8s interface {
	Deploytok8s(review *models.Review)
}

func Register(name string, registry DeployToK8s) {
	if _, dub := register[name]; dub {
		logs.Info("It's already exist!")
		return
	}

	register[name] = registry
}

func (c *PublishController) URLMapping() {
	c.Mapping("List", c.List)
	c.Mapping("RollBack", c.RollBack)
	c.Mapping("Chart", c.Chart)
}

func (c *PublishController) Prepare() {
	// Check administration
	c.APIController.Prepare()
}

// @Title kubernetes deploy statistics
// @Description kubernetes statistics
// @Param	start_time	query 	string	false		"the statistics start time"
// @Param	end_time	query 	string	false		"the statistics end time"
// @Success 200 {object} node.NodeStatistics success
// @router /statistics [get]
func (c *PublishController) Statistics() {
	startTimeStr := c.Input().Get("start_time")
	startTime, err := time.Parse(time.RFC3339, startTimeStr)
	if err != nil {
		logs.Info("request start time (%s) error.", startTimeStr, err)
		c.AbortBadRequestFormat("start_time")
	}
	endTimeStr := c.Input().Get("end_time")
	endTime, err := time.Parse(time.RFC3339, endTimeStr)
	if err != nil {
		logs.Info("request end time (%s) error.", endTimeStr, err)
		c.AbortBadRequestFormat("end_time")
	}

	result, err := models.PublishHistoryModel.GetDeployCountByDay(startTime, endTime)
	if err != nil {
		logs.Error("get publishhistory by day (%s)(%s) error. %v", startTime, endTimeStr, err)
		c.HandleError(err)
		return
	}

	c.Success(result)
}

// @Title kubernetes deploy chart
// @Description kubernetes chart
// @Param	start_time	query 	string	false		"the chart start time"
// @Param	end_time	query 	string	false		"the chart end time"
// @Param	resource_name	query 	string	false		"the chart resource name"
// @Param	cluster	query 	string	false		"the chart cluster"
// @Param	user	query 	string	false		"the chart user"
// @Param	resource_type	query 	int	false		"the chart resource_type"
// @Success 200 {object} node.NodeStatistics success
// @router /chart/:type [get]
func (c *PublishController) Chart() {
	startTimeStr := c.Input().Get("start_time")
	startTime, err := time.Parse(time.RFC3339, startTimeStr)
	if err != nil {
		logs.Info("request start time (%s) error.", startTimeStr, err)
		c.AbortBadRequestFormat("start_time")
	}
	endTimeStr := c.Input().Get("end_time")
	endTime, err := time.Parse(time.RFC3339, endTimeStr)
	if err != nil {
		logs.Info("request end time (%s) error.", endTimeStr, err)
		c.AbortBadRequestFormat("end_time")
	}

	resource_name := c.Input().Get("resource_name")
	cluster := c.Input().Get("cluster")
	user := c.Input().Get("user")
	paramStr := c.Ctx.Input.Param(":type")
	var resource_type int64 = -1
	if paramStr != "undefined" {
		resource_type, err = strconv.ParseInt(paramStr, 10, 64)
		if err != nil || resource_type < 0 {
			c.AbortBadRequest(fmt.Sprintf("Invalid %s in URL", paramStr))
		}
	}

	result, err := models.PublishHistoryModel.GetDeployChart(startTime, endTime, resource_name, cluster, user, resource_type)
	if err != nil {
		logs.Error("get publishhistory by day (%s)(%s) error. %v", startTime, endTimeStr, err)
		c.HandleError(err)
		return
	}

	c.Success(result)
}

// @Title GetAll
// @Description get all PublishHistory
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Param	resourceId		query 	int	true		"the ResourceId id,e.g. deployment id"
// @Param	type		query 	int	true		"the ResourceId type ,	 DEPLOYMENT 0 SERVICE 1 CONFIGMAP 2 SECRET 3"
// @Success 200 {object} []models.PublishHistory success
// @router /histories [get]
func (c *PublishController) List() {
	param := c.BuildQueryParam()

	if c.Input().Get("type") != "" {
		param.Query["Type"] = c.Input().Get("type")
	}
	if c.Input().Get("resourceId") != "" {
		param.Query["ResourceId"] = c.Input().Get("resourceId")
	}

	publishHistories := []models.PublishHistory{}
	total, err := models.GetTotal(new(models.PublishHistory), param)
	if err != nil {
		logs.Error("get total count by param (%s) error. %v", param, err)
		c.HandleError(err)
		return
	}

	err = models.GetAll(new(models.PublishHistory), &publishHistories, param)
	if err != nil {
		logs.Error("list by param (%s) error. %v", param, err)
		c.HandleError(err)
		return
	}

	c.Success(param.NewPage(total, publishHistories))
	return
}

// @Title RollBack
// @Description rollback Publish to special version
// @Param	body		body 	models.PublishHistory	true		"The app content"
// @Success 200 return id success
// @Failure 403 body is empty
// @router /tpl/:tplId([0-9]+)/namespace/:nsId([0-9]+)/clusters/:cluster [post]
func (c *PublishController) RollBack() {
	temp, _ := ioutil.ReadAll(c.Ctx.Request.Body)
	var tmpHistory *models.PublishHistory
	err := json.Unmarshal(temp, &tmpHistory)
	if err != nil {
		logs.Error("获取回滚模板失败,", err)
		c.AbortBadRequest("获取回滚模板失败")
		return
	}
	instHistory := models.PublishHistory{
		Type:         tmpHistory.Type,
		ResourceId:   tmpHistory.ResourceId,
		ResourceName: tmpHistory.ResourceName,
		TemplateId:   tmpHistory.TemplateId,
		Cluster:      tmpHistory.Cluster,
		Message:      "回滚操作",
		User:         c.User.Display,
		Image:        tmpHistory.Image,
	}

	nsid := c.GetIntParamFromURL(":nsId")
	cluster := c.Ctx.Input.Param(":cluster")
	tplid := c.GetIntParamFromURL(":tplId")
	image := c.GetString("image")

	kubeDeploymentTpl, err := models.DeploymentTplModel.GetById(tplid)
	if err != nil {
		logs.Error("获取deploymentTpl表数据失败!", err)
		return
	}

	var mapResult map[string]interface{}
	err = json.Unmarshal([]byte(kubeDeploymentTpl.Template), &mapResult)
	if err != nil {
		logs.Error("JsonToMapDemo err: ", err)
	}
	mapResult["spec"].(map[string]interface{})["template"].(map[string]interface{})["spec"].(map[string]interface{})["containers"].([]interface{})[0].(map[string]interface{})["image"] = image

	jsonTempl, _ := json.Marshal(mapResult)
	kubeDeploymentTpl.Template = string(jsonTempl)
	err = models.DeploymentTplModel.UpdateById(kubeDeploymentTpl)
	if err != nil {
		logs.Error("更新deploymenttpl模板失败, ", err)
	}

	namespace, err := models.NamespaceModel.GetById(nsid)
	if err != nil {
		logs.Error("获取namespace表数据失败!", err)
		return
	}

	cli, err := client.Client(cluster)
	if err != nil {
		logs.Error("获取k8s客户端失败!", err)
		return
	}
	newDeployment, err := deployment.GetDeployment(cli, kubeDeploymentTpl.Name, namespace.KubeNamespace)
	if err != nil {
		logs.Error("获取k8s接口数据失败!", err)
		return
	}
	newDeployment.Spec.Template.Spec.Containers[0].Image = image
	_, err = deployment.UpdateDeployment(cli, newDeployment)
	if err != nil {
		instHistory.Status = models.ReleaseFailure
		logs.Error("回滚失败!", err)
		c.HandleError(err)
		return
	}
	instHistory.Status = models.ReleaseSuccess

	defer func() {
		_, err = models.PublishHistoryModel.Add(&instHistory)
		if err != nil {
			logs.Error("插入历史操作记录失败,", err)
		}
	}()

	c.Success("回滚完成")
}
