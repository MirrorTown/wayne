package hostAlias

import (
	"encoding/json"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"strings"
)

type HostAliasController struct {
	base.APIController
}

type HostAliasMap struct {
	Id        int64    `json:"id,omitempty"`
	Ip        string   `json:"ip,omitempty"`
	Hostnames []string `json:"hostnames,omitempty"`
}

func (h *HostAliasController) URLMapping() {
	h.Mapping("Create", h.Create)
	h.Mapping("List", h.List)
	h.Mapping("Delete", h.Delete)
}

func (h *HostAliasController) Prepare() {
	// Check administration
	h.APIController.Prepare()

	// Check permission
	if !h.User.Admin {
		h.AbortForbidden("operation need admin permission.")
	}
}

// @Title Create
// @Description create HostAlias
// @Param	body		body 	models.HostAlias
// @Success 200 return id success
// @Failure 403 body is empty
// @router /namespace/:nsId/apps/:appId [post]
func (h *HostAliasController) Create() {
	nsId := h.GetIntParamFromURL(":nsId")
	appId := h.GetIntParamFromURL(":appId")
	var hostaliasMap []*HostAliasMap
	err := json.Unmarshal(h.Ctx.Input.RequestBody, &hostaliasMap)
	if err != nil {
		logs.Error("解析前端HostAlias信息失败")
		return
	}
	for _, v := range hostaliasMap {
		_, err := models.HostAliasModel.Add(models.HostAlias{
			AppId:       appId,
			NamespaceId: nsId,
			Ip:          v.Ip,
			Hostnames:   strings.Join(v.Hostnames, ","),
		})
		if err != nil {
			logs.Error("插入HostAlias失败, ", err)
			h.HandleError(err)
			return
		}
	}
	h.Success("ok")
}

// @Title Update
// @Description create HostAlias
// @Param	body		body 	models.HostAlias
// @Success 200 return id success
// @Failure 403 body is empty
// @router / [put]
func (h *HostAliasController) Update() {
	var hostaliasMap []*HostAliasMap
	err := json.Unmarshal(h.Ctx.Input.RequestBody, &hostaliasMap)
	if err != nil {
		logs.Error("解析前端HostAlias信息失败, ", err)
		return
	}

	err = models.HostAliasModel.Update(&models.HostAlias{
		Id:        hostaliasMap[0].Id,
		Ip:        hostaliasMap[0].Ip,
		Hostnames: strings.Join(hostaliasMap[0].Hostnames, ","),
	})
	if err != nil {
		logs.Error("插入HostAlias失败, ", err)
		h.HandleError(err)
		return
	}
	h.Success("ok")
}

// @Title List
// @Description get all objects
// @Param	pageNo		query 	int	false		"the page current no"
// @Param	pageSize		query 	int	false		"the page size"
// @Success 200 {object} []models.HostAlias success
// @router /namespace/:nsId/apps/:appId [get]
func (h *HostAliasController) List() {
	param := h.BuildQueryParam()
	nsId := h.GetIntParamFromURL(":nsId")
	appId := h.GetIntParamFromURL(":appId")
	if appId != 0 {
		param.Query["AppId__exact"] = appId
	}

	if nsId != 0 {
		param.Query["NamespaceId__exact"] = nsId
	}
	total, err := models.GetTotal(new(models.HostAlias), param)
	if err != nil {
		logs.Error("获取Hostalias总数失败")
		h.HandleError(err)
		return
	}

	hostaliases := []models.HostAlias{}
	err = models.GetAll(new(models.HostAlias), &hostaliases, param)
	if err != nil {
		logs.Error("获取HostAlias失败, ", err)
		h.HandleError(err)
		return
	}

	h.Success(param.NewPage(total, hostaliases))
}

// @Title Delete
// @Description delete the HostAlias
// @Param	id		path 	int	true		"The id you want to delete"
// @Param	logical		query 	bool	false		"is logical deletion,default true"
// @Success 200 {string} delete success!
// @router /:id([0-9]+) [delete]
func (h *HostAliasController) Delete() {
	id := h.GetIDFromURL()

	err := models.HostAliasModel.DeleteById(int64(id))
	if err != nil {
		logs.Error("delete %d error.%v", id, err)
		h.HandleError(err)
		return
	}
	h.Success(nil)
}
