package models

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/Qihoo360/wayne/src/backend/util/hack"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

const (
	TableNameTektonParam = "tekton_param"
)

type tektonParamModel struct{}

type TektonParamMetaData struct {
	Clusters []string               `json:"clusters"`
	Params   []string               `json:"params,omitempty"`
	Volumns  map[string]interface{} `json:"volumns"`
	Sa       string                 `json:"sa"`
}

type TektonParam struct {
	Id   int64  `orm:"auto" json:"id,omitempty"`
	Name string `orm:"unique;index;size(128)" json:"name,omitempty"`
	/* 存储部署元数据
	{
	  "cluster": ["K8S"],
	  "params":[
			"gitUrl",
			"gitRevision"
	  ],
	  "volumns": {"name": "test",
			"checked": true,
			"pvc": "test-pvc"}
	  "sa": "serviceAccount"
	}
	*/
	MetaData    string              `orm:"type(text)" json:"metaData,omitempty"`
	MetaDataObj TektonParamMetaData `orm:"-" json:"-"`
	App         *App                `orm:"index;rel(fk)" json:"app,omitempty"`
	Description string              `orm:"null;size(512)" json:"description,omitempty"`
	OrderId     int64               `orm:"index;default(0)" json:"order"`

	CreateTime *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	User       string     `orm:"size(128)" json:"user,omitempty"`
	Deleted    bool       `orm:"default(false)" json:"deleted,omitempty"`

	AppId int64 `orm:"-" json:"appId,omitempty"`
}

type TriggerBinding struct {
	ApiVersion string `json:"apiVersion"`
}

func (*TektonParam) TableName() string {
	return TableNameTektonParam
}

func (*tektonParamModel) GetNames(filters map[string]interface{}) ([]TektonParam, error) {
	tektonParams := []TektonParam{}
	qs := Ormer().
		QueryTable(new(TektonParam))

	if len(filters) > 0 {
		for k, v := range filters {
			qs = qs.Filter(k, v)
		}
	}
	_, err := qs.All(&tektonParams, "Id", "Name")

	if err != nil {
		return nil, err
	}

	return tektonParams, nil
}

func (*tektonParamModel) UpdateOrders(tektonParams []*TektonParam) error {
	if len(tektonParams) < 1 {
		return errors.New("tektonParams' length should greater than 0. ")
	}
	batchUpateSql := fmt.Sprintf("UPDATE `%s` SET `order_id` = CASE ", TableNameTektonParam)
	ids := make([]string, 0)
	for _, tektonParam := range tektonParams {
		ids = append(ids, strconv.Itoa(int(tektonParam.Id)))
		batchUpateSql = fmt.Sprintf("%s WHEN `id` = %d THEN %d ", batchUpateSql, tektonParam.Id, tektonParam.OrderId)
	}
	batchUpateSql = fmt.Sprintf("%s END WHERE `id` IN (%s)", batchUpateSql, strings.Join(ids, ","))

	_, err := Ormer().Raw(batchUpateSql).Exec()
	return err
}

func (*tektonParamModel) GetAllByName(items []string) ([]TektonParam, error) {
	tektonParams := []TektonParam{}
	qs := Ormer().
		QueryTable(new(TektonParam))

	qs = qs.Filter("name__in", strings.Join(items, ","))
	_, err := qs.All(&tektonParams)

	if err != nil {
		return nil, err
	}

	return tektonParams, nil
}

func (*tektonParamModel) Add(m *TektonParam) (id int64, err error) {
	m.App = &App{Id: m.AppId}
	m.CreateTime = nil
	id, err = Ormer().Insert(m)
	return
}

func (*tektonParamModel) UpdateById(m *TektonParam) (err error) {
	v := TektonParam{Id: m.Id}
	// ascertain id exists in the database
	if err = Ormer().Read(&v); err == nil {
		m.App = &App{Id: m.AppId}
		m.UpdateTime = nil
		_, err = Ormer().Update(m)
		return err
	}
	return
}

func (*tektonParamModel) GetById(id int64) (v *TektonParam, err error) {
	v = &TektonParam{Id: id}

	if err = Ormer().Read(v); err == nil {
		v.AppId = v.App.Id
		return v, nil
	}
	return nil, err
}

func (*tektonParamModel) GetParseMetaDataById(id int64) (v *TektonParam, err error) {
	v = &TektonParam{Id: id}

	if err = Ormer().Read(v); err == nil {
		v.AppId = v.App.Id
		err = json.Unmarshal(hack.Slice(v.MetaData), &v.MetaDataObj)
		if err != nil {
			logs.Error("parse tektonParam metaData error.", v.MetaData)
			return nil, err
		}
		return v, nil
	}
	return nil, err
}

func (*tektonParamModel) GetByName(name string) (v *TektonParam, err error) {
	v = &TektonParam{Name: name}

	if err = Ormer().Read(v, "name"); err == nil {
		v.AppId = v.App.Id
		return v, nil
	}
	return nil, err
}

func (*tektonParamModel) GetUniqueDepByName(ns, app, tektonParam string) (v *TektonParam, err error) {
	v = &TektonParam{}
	// use orm
	qs := Ormer().QueryTable(new(TektonParam))
	err = qs.Filter("App__Namespace__Name", ns).Filter("App__Name", app).Filter("Name", tektonParam).Filter("Deleted", 0).One(v)
	// use raw sql
	// err = Ormer().Raw("SELECT d.* FROM tektonParam as d left join app as a on d.app_id=a.id left join namespace as n on a.namespace_id=n.id WHERE n.name= ? and a.Name = ? and d.Name = ?", ns, app, tektonParam).QueryRow(v)
	if err == nil {
		v.AppId = v.App.Id
		return v, nil
	}
	return nil, err
}

func (*tektonParamModel) DeleteById(id int64, logical bool) (err error) {
	v := TektonParam{Id: id}
	// ascertain id exists in the database
	if err = Ormer().Read(&v); err == nil {
		if logical {
			v.Deleted = true
			_, err = Ormer().Update(&v)
			return err
		}
		_, err = Ormer().Delete(&v)
		return err
	}
	return
}

func (d *tektonParamModel) Update(replicas int32, deploy *TektonParam, cluster []string) (err error) {
	deploy.MetaDataObj.Clusters = cluster
	newMetaData, err := json.Marshal(&deploy.MetaDataObj)
	if err != nil {
		logs.Error("tektonParam metadata marshal error.%v", err)
		return
	}
	deploy.MetaData = string(newMetaData)
	err = d.UpdateById(deploy)
	if err != nil {
		logs.Error("tektonParam metadata update error.%v", err)
	}
	return
}
