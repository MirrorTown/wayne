package models

import (
	"encoding/json"
	"strings"
	"time"

	"github.com/Qihoo360/wayne/src/backend/util/hack"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

const (
	TableNameTektonBuild = "tekton_build"
)

type tektonBuildModel struct{}

type TektonBuildMetaData struct {
	Params []map[string]string `json:"params,omitempty"`
}

type TektonBuild struct {
	Id           int64               `orm:"auto" json:"id,omitempty"`
	Name         string              `orm:"unique;index;size(128)" json:"name,omitempty"`
	MetaData     string              `orm:"type(text)" json:"metaData,omitempty"`
	MetaDataObj  TektonBuildMetaData `orm:"-" json:"-"`
	App          *App                `orm:"index;rel(fk)" json:"app,omitempty"`
	Pipeline     *Pipeline           `orm:"index;rel(fk)" json:"app,omitempty"`
	Description  string              `orm:"null;size(512)" json:"description,omitempty"`
	DeploymentId int64               `orm:"index;default(0)" json:"deploymentId"`
	Stepflow     int                 `orm:"index;default(0)" json:"stepflow"`
	Status       string              `orm:"size(128)" json:"status,omitempty"`

	CreateTime        *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime        *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	User              string     `orm:"size(128)" json:"user,omitempty"`
	PipelineExecuteId string     `orm:"size(128)" json:"pipelineExecuteId,omitempty"`

	AppId      int64  `orm:"-" json:"appId,omitempty"`
	LogUri     string `orm:"-" json:"logUri,omitempty"`
	PipelineId int64  `orm:"-" json:"pipelineId,omitempty"`
}

func (*TektonBuild) TableName() string {
	return TableNameTektonBuild
}

func (*tektonBuildModel) GetNames(filters map[string]interface{}) ([]TektonBuild, error) {
	tektonParams := []TektonBuild{}
	qs := Ormer().
		QueryTable(new(TektonBuild))

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

func (*tektonBuildModel) GetAllByName(items []string) ([]TektonBuild, error) {
	tektonParams := []TektonBuild{}
	qs := Ormer().
		QueryTable(new(TektonBuild))

	qs = qs.Filter("name__in", strings.Join(items, ","))
	_, err := qs.All(&tektonParams)

	if err != nil {
		return nil, err
	}

	return tektonParams, nil
}

func (*tektonBuildModel) Edit(m *TektonBuild) (id int64, err error) {
	if m.Id == 0 {
		m.App = &App{Id: m.AppId}
		m.Pipeline = &Pipeline{Id: m.PipelineId}
		m.CreateTime = nil
		m.UpdateTime = nil
		id, err = Ormer().Insert(m)
	} else {
		v := TektonBuild{Id: m.Id}
		// ascertain id exists in the database
		if err = Ormer().Read(&v); err == nil {
			m.App = &App{Id: m.AppId}
			m.Pipeline = &Pipeline{Id: m.PipelineId}
			m.UpdateTime = nil
			_, err = Ormer().Update(m, "Name", "MetaData", "Description", "DeploymentId",
				"UpdateTime", "User", "Status", "Stepflow", "PipelineExecuteId", "Pipeline")
			return m.Id, err
		}
	}

	return
}

func (t *tektonBuildModel) UpdateById(m *TektonBuild) (err error) {
	v := TektonBuild{Id: m.Id}
	// ascertain id exists in the database
	if err = Ormer().Read(&v); err == nil {
		m.App = &App{Id: m.AppId}
		m.UpdateTime = nil
		_, err = Ormer().Update(m)
		return err
	}
	return
}

func (*tektonBuildModel) GetByDeploymentId(deploymentId int64) (v *TektonBuild, err error) {
	v = &TektonBuild{DeploymentId: deploymentId}

	if err = Ormer().Read(v, "DeploymentId"); err == nil {
		v.AppId = v.App.Id
		v.PipelineId = v.Pipeline.Id
		return v, nil
	}
	return nil, err
}

func (*tektonBuildModel) GetParseMetaDataById(id int64) (v *TektonBuild, err error) {
	v = &TektonBuild{Id: id}

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

func (*tektonBuildModel) GetByName(name string) (v *TektonBuild, err error) {
	v = &TektonBuild{Name: name}

	if err = Ormer().Read(v, "name"); err == nil {
		v.AppId = v.App.Id
		return v, nil
	}
	return nil, err
}

func (*tektonBuildModel) GetUniqueDepByName(ns, app, tektonParam string) (v *TektonBuild, err error) {
	v = &TektonBuild{}
	// use orm
	qs := Ormer().QueryTable(new(TektonBuild))
	err = qs.Filter("App__Namespace__Name", ns).Filter("App__Name", app).Filter("Name", tektonParam).Filter("Deleted", 0).One(v)
	// use raw sql
	// err = Ormer().Raw("SELECT d.* FROM tektonParam as d left join app as a on d.app_id=a.id left join namespace as n on a.namespace_id=n.id WHERE n.name= ? and a.Name = ? and d.Name = ?", ns, app, tektonParam).QueryRow(v)
	if err == nil {
		v.AppId = v.App.Id
		return v, nil
	}
	return nil, err
}

func (*tektonBuildModel) DeleteById(id int64, logical bool) (err error) {
	v := TektonBuild{Id: id}
	// ascertain id exists in the database
	if err = Ormer().Read(&v); err == nil {
		if logical {
			_, err = Ormer().Update(&v)
			return err
		}
		_, err = Ormer().Delete(&v)
		return err
	}
	return
}

func (d *tektonBuildModel) Update(buildName string, stepFlow int, pipelineExecuteId ...string) (err error) {
	v := &TektonBuild{Name: buildName}
	if err = Ormer().Read(v, "Name"); err == nil {
		v.UpdateTime = nil
		v.Stepflow = stepFlow
		if len(pipelineExecuteId) > 0 {
			v.PipelineExecuteId = pipelineExecuteId[0]
			_, err = Ormer().Update(v, "UpdateTime", "Stepflow", "PipelineExecuteId")
		}
		_, err = Ormer().Update(v, "UpdateTime", "Stepflow")

		return err
	}
	return
}

func (d *tektonBuildModel) UpdateByExecuteId(pipelineExecuteId string, stepFlow int) (err error) {
	v := &TektonBuild{PipelineExecuteId: pipelineExecuteId}
	if err = Ormer().Read(v, "PipelineExecuteId"); err == nil {
		v.UpdateTime = nil
		v.Stepflow = stepFlow
		_, err = Ormer().Update(v, "UpdateTime", "Stepflow")

		return err
	}
	return
}
