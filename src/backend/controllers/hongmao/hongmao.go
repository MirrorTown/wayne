package hongmao

import (
	"errors"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/astaxie/beego"
	"io/ioutil"
	"k8s.io/apimachinery/pkg/util/json"
	"net/http"
	"net/url"
	"strings"
)

type HongMaoController struct {
	base.APIController
}

type set struct {
	m map[string]struct{}
}

func NewSet() *set {
	s := &set{}
	s.m = make(map[string]struct{})
	return s
}

func (s *set) Add(v string) {
	s.m[v] = struct{}{}
}

func (s *set) Contain(v string) bool {
	_, exist := s.m[v]
	return exist
}

func (s *set) Remove(v string) {
	delete(s.m, v)
}

func (h *HongMaoController) URLMapping() {
	h.Mapping("Sysnc", h.Sysnc)
}

func (h *HongMaoController) Prepare() {
	h.APIController.Prepare()
}

// @Title Create
// @Description create Review
// @Param	body		body 	models.Application	true		"The app content"
// @Success 200 return id success
// @Failure 403 body is empty
// @router /app/sysnc [get]
func (h *HongMaoController) Sysnc() {
	var name = make([]string, 0)
	name = append(name, "wayne-template")
	deploymentTemplate, err := models.DeploymentModel.GetAllByName(name)
	if err != nil || len(deploymentTemplate) == 0 {
		logs.Error("获取模板失败,", err)
		h.HandleError(errors.New("获取模板失败"))
		return
	}

	apps, err := models.AppModel.GetNames(false)
	for appI := range apps {
		allAppUrl := fmt.Sprintf("https://hongmao.souche-inc.com/aliyun/application/selectAppBySzoneName?szoneName=%s&access_token=", apps[appI].Name)
		allAppMap := h.GetApplication(allAppUrl)

		for index := range allAppMap {
			models.DeploymentModel.Add(&models.Deployment{
				Name:        apps[appI].Name + "-" + strings.TrimSpace(allAppMap[index]["name"].(string)),
				MetaData:    deploymentTemplate[0].MetaData,
				Description: getDes(allAppMap[index]["description"]),
				OrderId:     0,
				User:        h.User.Display,
				Deleted:     false,
				AppId:       apps[appI].Id,
			})
		}
	}

	h.Success("Sync success")
	return
}

func getDes(desc interface{}) string {
	if desc == nil {
		return ""
	}
	return desc.(string)
}

func (h *HongMaoController) GetApplication(url string) []map[string]interface{} {
	accessToken := h.getAccessToken()
	client := &http.Client{}
	var req *http.Request
	req, _ = http.NewRequest(http.MethodGet, url+accessToken, nil)

	resp, err := client.Do(req)
	if err != nil {
		logs.Error("获取应用信息失败,", err)
	}
	b, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	var mapResult []map[string]interface{}
	if resp.StatusCode == http.StatusOK {
		err = json.Unmarshal(b, &mapResult)
		if err != nil {
			logs.Error("JsonToMapDemo err: ", err)
			h.HandleError(err)
			return nil
		}
	}

	return mapResult
}

func (h *HongMaoController) getAccessToken() string {
	client := &http.Client{}
	var req *http.Request
	DataUrlVal := url.Values{}
	DataUrlVal.Add("client_id", beego.AppConfig.String("clientId"))
	DataUrlVal.Add("grant_type", beego.AppConfig.String("grantType"))
	DataUrlVal.Add("refresh_token", beego.AppConfig.String("refreshToken"))
	DataUrlVal.Add("client_secret", beego.AppConfig.String("clientSecret"))
	req, _ = http.NewRequest(http.MethodPost, beego.AppConfig.String("authUrl"), strings.NewReader(DataUrlVal.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	resp, err := client.Do(req)
	if err != nil {
		logs.Error("获取access_token信息失败,", err)
	}
	b, _ := ioutil.ReadAll(resp.Body)

	defer resp.Body.Close()
	var mapResult map[string]interface{}
	err = json.Unmarshal(b, &mapResult)
	if err != nil {
		logs.Error("JsonToMapDemo err: ", err)
	}

	return mapResult["access_token"].(string)
}
