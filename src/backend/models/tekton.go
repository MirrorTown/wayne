package models

import (
	"time"
)

const (
	TektonStatusDone  = 1
	TektonStatusCheck = 0
	TableNameTekton   = "tekton"
)

type tektonModel struct{}

type Tekton struct {
	Id         int64      `orm:"auto" json:"id,omitempty"`
	Name       string     `orm:"unique;index;size(128)" json:"name,omitempty"`
	Group      string     `orm:"index;size(128)" json:"group,omitempty"`
	Version    string     `orm:"index;size(128)" json:"version,omitempty"`
	Kind       string     `orm:"index;size(128)" json:"kind,omitempty"`
	Cluster    string     `orm:"index;size(128)" json:"cluster,omitempty"`
	Namespace  string     `orm:"index;size(128)" json:"namespace,omitempty"`
	MetaData   string     `orm:"type(text)" json:"metaData,omitempty"`
	Status     int32      `orm:"index;default(0)" json:"status"`
	CreateTime *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
}

func (*Tekton) TableName() string {
	return TableNameTekton
}

func (*tektonModel) GetNames() ([]Tekton, error) {
	tekton := []Tekton{}
	_, err := Ormer().
		QueryTable(new(Tekton)).
		All(&tekton, "Id", "Name")

	if err != nil {
		return nil, err
	}

	return tekton, nil
}

func (*tektonModel) GetAllNeedCheck() ([]Tekton, error) {
	tekton := []Tekton{}
	_, err := Ormer().
		QueryTable(new(Tekton)).
		Filter("Kind", "pipelineruns").
		Filter("Status", TektonStatusCheck).
		All(&tekton)

	if err != nil {
		return nil, err
	}

	return tekton, nil
}

func (*tektonModel) GetTektonByArgs(name string) ([]Tekton, error) {
	tekton := []Tekton{}
	_, err := Ormer().
		QueryTable(new(Tekton)).
		Filter("Name", name).
		All(&tekton)

	if err != nil {
		return nil, err
	}

	return tekton, nil
}

// Add insert a new Tekton into database and returns
// last inserted Id on success.
func (*tektonModel) AddOrUpdate(m *Tekton) (err error) {
	v := &Tekton{Name: m.Name}

	//查询是否存在该记录
	if err = Ormer().Read(v, "Name"); err == nil {
		m.UpdateTime = nil
		m.Id = v.Id
		_, err = Ormer().Update(m, "MetaData")
		return
	}
	m.CreateTime = nil
	_, err = Ormer().Insert(m)
	return
}

// GetByName retrieves Tekton by Name. Returns error if
// Id doesn't exist
func (*tektonModel) GetByName(name string) (v *Tekton, err error) {
	v = &Tekton{Name: name}

	if err = Ormer().Read(v, "Name"); err == nil {
		return v, nil
	}
	return nil, err
}

// GetById retrieves Tekton by Id. Returns error if
// Id doesn't exist
func (*tektonModel) GetById(id int64) (v *Tekton, err error) {
	v = &Tekton{Id: id}

	if err = Ormer().Read(v); err == nil {
		return v, nil
	}
	return nil, err
}

// UpdateTekton updates Tekton by Name and returns error if
// the record to be updated doesn't exist
func (*tektonModel) UpdateByName(m *Tekton) (err error) {
	v := Tekton{Name: m.Name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		m.UpdateTime = nil
		_, err = Ormer().Update(m)
		return err
	}
	return
}

// Delete deletes Tekton by Id and returns error if
// the record to be deleted doesn't exist
func (*tektonModel) DeleteByName(name string, logical bool) (err error) {
	v := Tekton{Name: name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		_, err = Ormer().Delete(&v)
		return err
	}
	return
}
