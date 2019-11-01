package hongmao

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
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
	appItems := h.getApplication(h.User.Email)
	for v := range appItems.m {
		fmt.Println(v)
	}
}

func (h *HongMaoController) getApplication(email string) *set {
	accessToken := h.getAccessToken()
	client := &http.Client{}
	var req *http.Request
	req, _ = http.NewRequest(http.MethodGet, fmt.Sprintf("https://hongmao.souche-inc.com/aliyun/userApp/getapp?email=%s&access_token=%s", email, accessToken), nil)

	resp, err := client.Do(req)
	if err != nil {
		logs.Error("获取应用信息失败,", err)
	}
	b, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	var mapResult []map[string]interface{}
	err = json.Unmarshal(b, &mapResult)
	if err != nil {
		fmt.Println("JsonToMapDemo err: ", err)
	}
	//var AppItems = make([]string, 0)
	appItems := NewSet()
	for _, v := range mapResult {
		appItems.Add(v["applicationName"].(string))
	}
	return appItems
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
		fmt.Println("JsonToMapDemo err: ", err)
	}

	return mapResult["access_token"].(string)
}
