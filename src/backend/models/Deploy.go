package models

import (
	"github.com/astaxie/beego/orm"
	"time"
)

const (
	TableNameDeploy = "deploy"
)

type Deploy struct {
	Id           int64      `orm:"auto" json:"id,omitempty"`
	User         string     `orm:"size(20)" json:"user,omitempty"`
	Name         string     `orm:"unique;index;size(200)" json:"name,omitempty"`
	Cluster      string     `orm:"index;size(200)" json:"name,omitempty"`
	Namespace    string     `orm:"size(200)" json:"resourcename,omitempty"`
	ResourceName string     `orm:"size(200)" json:"resourcename,omitempty"`
	ResourceType string     `orm:"size(200)" json:"resourcetype,omitempty"`
	Status       string     `orm:"index;size(200)" json:"status,omitempty"`
	Notify       int        `orm:"index;default(0)" json:"notify"`
	Stepflow     int        `orm:"index;default(0)" json:"stepflow"`
	CreateTime   *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime   *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
}

func (*Deploy) TableName() string {
	return TableNameDeploy
}

func (d *Deploy) GetPublishStatusByName() (v Deploy, err error) {
	v = Deploy{Name: d.Name}
	// ascertain publishName exists in the database
	if err := Ormer().Read(&v, "name"); err == nil {
		return v, nil
	}

	return
}

func (*Deploy) UpdatePublishStatus(m *Deploy) (err error) {
	v := &Deploy{Name: m.Name}
	if err := Ormer().Read(v, "name"); err == nil {
		//Ormer update data is dependied by Id(pk)
		m.Id = v.Id
		_, err = Ormer().Update(m, "user", "name", "status", "notify", "resource_name", "resource_type", "namespace", "cluster", "update_time", "stepflow")
		return err
	} else if err == orm.ErrNoRows {
		_, err = Ormer().Insert(m)
		return err
	}
	return
}

func (d *Deploy) UpdatePublishStepflow(m *Deploy) error {
	v := &Deploy{Name: m.Name}
	if err := Ormer().Read(v, "name"); err == nil {
		m.Id = v.Id
		_, err = Ormer().Update(m, "name", "status", "cluster", "stepflow")
		return err
	}
	return nil
}

func (d *Deploy) GetDeploys(filters map[string]interface{}) ([]Deploy, error) {
	deploys := []Deploy{}
	qs := Ormer().QueryTable(new(Deploy))
	if len(filters) > 0 {
		for k, v := range filters {
			qs = qs.Filter(k, v)
		}
	}
	_, err := qs.All(&deploys)

	if err != nil {
		return nil, err
	}

	return deploys, nil
}
