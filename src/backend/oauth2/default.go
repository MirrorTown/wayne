package oauth2

import (
	"encoding/json"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/astaxie/beego"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/astaxie/beego/httplib"
	"golang.org/x/oauth2"
)

var _ OAuther = &OAuth2Default{}

type OAuth2Default struct {
	*oauth2.Config
	ApiUrl     string
	AttrUrl    string
	AttrToken  string
	ApiMapping map[string]string
}

func (o *OAuth2Default) UserInfo(token string) (*BasicUserInfo, error) {
	userinfo := &BasicUserInfo{}

	response, err := httplib.Get(o.ApiUrl).Header("Authorization", fmt.Sprintf("Bearer %s", token)).DoRequest()

	if err != nil {
		return nil, fmt.Errorf("Error getting user info: %s", err)
	}

	result, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	if len(o.ApiMapping) == 0 {
		err = json.Unmarshal(result, userinfo)
		if err != nil {
			return nil, fmt.Errorf("Error Unmarshal user info: %s", err)
		}
	} else {
		usermap := make(map[string]interface{})
		if err := json.Unmarshal(result, &usermap); err != nil {
			return nil, fmt.Errorf("Error Unmarshal user info: %s", err)
		}
		if usermap[o.ApiMapping["name"]] != nil {
			userinfo.Name = usermap[o.ApiMapping["name"]].(string)
		}
		if usermap[o.ApiMapping["email"]] != nil {
			userinfo.Email = usermap[o.ApiMapping["email"]].(string)
		}
		if usermap[o.ApiMapping["display"]] != nil {
			userinfo.Display = usermap[o.ApiMapping["display"]].(string)
		}

		//获取用户属性
		attrToken, err := o.getAttrToken()
		if err != nil {
			logs.Error(err)
		} else {
			attrResponse, err := httplib.Get(o.AttrUrl+"/"+usermap["sub"].(string)).Header("Authorization", fmt.Sprintf("Bearer %s", attrToken)).DoRequest()

			if err != nil {
				logs.Error(fmt.Errorf("Error getting user attr: %s", err))
			} else {
				attrResult, err := ioutil.ReadAll(attrResponse.Body)
				if err != nil {
					return nil, err
				}

				attrmap := make(map[string]interface{})
				if err := json.Unmarshal(attrResult, &attrmap); err != nil {
					return nil, fmt.Errorf("Error Unmarshal user attr: %s", err)
				}
				if attrmap["attributes"] != nil && userinfo.Name == "" {
					userinfo.Name = attrmap["attributes"].(map[string]interface{})[o.ApiMapping["name"]].([]interface{})[0].(string)
				}
			}
		}
	}
	if userinfo.Name == "" {
		userinfo.Name = userinfo.Display
	}

	return userinfo, nil
}

func (o *OAuth2Default) getAttrToken() (string, error) {
	payload := strings.NewReader(fmt.Sprintf("client_id=admin-cli&grant_type=password&username=%s&password=%s", beego.AppConfig.String("kc_username"), beego.AppConfig.String("kc_password")))

	req, _ := http.NewRequest("POST", o.AttrToken, payload)

	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("cache-control", "no-cache")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("No token Found")
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	resultmap := make(map[string]interface{})
	if err := json.Unmarshal(body, &resultmap); err != nil {
		return "", fmt.Errorf("Error Unmarshal token: %s", err)
	}
	if resultmap["access_token"] != nil {
		return resultmap["access_token"].(string), nil
	}

	return "", fmt.Errorf("No token found")
}
