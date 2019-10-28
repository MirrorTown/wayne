package models

import (
	"time"
)

type HarborStatus int32

const (
	HarborStatusNormal      HarborStatus = 0
	HarborStatusMaintaining HarborStatus = 1

	TableNameHarbor = "harbor"
)

type harborModel struct{}

type Harbor struct {
	Id          int64      `orm:"auto" json:"id,omitempty"`
	Name        string     `orm:"unique;index;size(128)" json:"name,omitempty"`
	Url         string     `orm:"index;size(200)" json:"url,omitempty"` // harbor地址，示例： https://10.172.189.140
	User        string     `orm:"null;size(128)" json:"user,omitempty"`
	Passwd      string     `orm:"size(128)" json:"passwd,omitempty"`
	Project     string     `orm:"null;size(128)" json:"project,omitempty"`
	Description string     `orm:"null;size(512)" json:"description,omitempty"`
	CreateTime  *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime  *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	Namespace   string     `orm:"size(128)" json:"namespace,omitempty"`
	// the harbor status
	Status HarborStatus `orm:"default(0)" json:"status"`
}

func (*Harbor) TableName() string {
	return TableNameHarbor
}

func (*harborModel) GetNames() ([]Harbor, error) {
	harbors := []Harbor{}
	_, err := Ormer().
		QueryTable(new(Harbor)).
		All(&harbors, "Id", "Name")

	if err != nil {
		return nil, err
	}

	return harbors, nil
}

func (*harborModel) GetAllNormal() ([]Harbor, error) {
	harbors := []Harbor{}
	_, err := Ormer().
		QueryTable(new(Harbor)).
		Filter("Status", HarborStatusNormal).
		All(&harbors)

	if err != nil {
		return nil, err
	}

	return harbors, nil
}

func (*harborModel) GetHaborByNS(ns string) ([]Harbor, error) {
	harbors := []Harbor{}
	_, err := Ormer().
		QueryTable(new(Harbor)).
		Filter("Namespace", ns).
		All(&harbors)

	if err != nil {
		return nil, err
	}

	return harbors, nil
}

func (*harborModel) GetByProject(project string) (v *Harbor, err error) {
	v = &Harbor{Project: project}

	if err = Ormer().Read(v, "Project"); err == nil {
		return v, nil
	}
	return nil, err
}

// Add insert a new Harbor into database and returns
// last inserted Id on success.
func (*harborModel) Add(m *Harbor) (id int64, err error) {
	m.CreateTime = nil
	id, err = Ormer().Insert(m)
	return
}

// GetByName retrieves Harbor by Name. Returns error if
// Id doesn't exist
func (*harborModel) GetByName(name string) (v *Harbor, err error) {
	v = &Harbor{Name: name}

	if err = Ormer().Read(v, "Name"); err == nil {
		return v, nil
	}
	return nil, err
}

// GetById retrieves Harbor by Id. Returns error if
// Id doesn't exist
func (*harborModel) GetById(id int64) (v *Harbor, err error) {
	v = &Harbor{Id: id}

	if err = Ormer().Read(v); err == nil {
		return v, nil
	}
	return nil, err
}

// UpdateHarbor updates Harbor by Name and returns error if
// the record to be updated doesn't exist
func (*harborModel) UpdateByName(m *Harbor) (err error) {
	v := Harbor{Name: m.Name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		m.UpdateTime = nil
		_, err = Ormer().Update(m)
		return err
	}
	return
}

// Delete deletes Harbor by Id and returns error if
// the record to be deleted doesn't exist
func (*harborModel) DeleteByName(name string, logical bool) (err error) {
	v := Harbor{Name: name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		_, err = Ormer().Delete(&v)
		return err
	}
	return
}
