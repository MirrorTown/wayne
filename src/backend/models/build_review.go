package models

import (
	"errors"
	"time"
)

type BuildReviewStatus int32

const (
	BuildReviewStatusTobe   BuildReviewStatus = 0
	BuildReviewStatusPass   BuildReviewStatus = 1
	BuildReviewStatusReject BuildReviewStatus = 2

	TableNameBuildReview = "build_review"
)

type buildReviewModel struct{}

type BuildReview struct {
	Id           int64      `orm:"auto" json:"id,omitempty"`
	Name         string     `orm:"index;size(128)" json:"name,omitempty"`
	AppId        int64      `orm:"index;column(app_id)" json:"appId,omitempty"`
	DeploymentId int64      `orm:"index;column(deployment_id)" json:"deploymentId,omitempty"`
	Announcer    string     `orm:"size(128)" json:"announcer,omitempty"`
	BuildTime    *time.Time `orm:"auto_now;type(datetime);column(build_time)" json:"buildTime,omitempty"`
	AnnounceTime string     `orm:"type(datetime);column(announce_time)" json:"announceTime,omitempty"`
	Auditors     string     `orm:"null;size(128)" json:"auditors,omitempty"`
	Version      string     `orm:"size(128)" json:"version,omitempty"`
	CreateTime   *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime   *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	// the build review status
	Status BuildReviewStatus `orm:"default(0)" json:"status"`
}

func (*BuildReview) TableName() string {
	return TableNameBuildReview
}

func (*buildReviewModel) GetNames() ([]BuildReview, error) {
	reviews := []BuildReview{}
	_, err := Ormer().
		QueryTable(new(BuildReview)).
		All(&reviews, "Id", "Name")

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

func (*buildReviewModel) GetAll() ([]BuildReview, error) {
	reviews := []BuildReview{}
	_, err := Ormer().
		QueryTable(new(BuildReview)).
		All(&reviews)

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

// Add insert a new BuildReview into database and returns
// last inserted Id on success.
func (*buildReviewModel) Add(m *BuildReview) (id int64, err error) {
	v := &BuildReview{Name: m.Name, Status: BuildReviewStatusTobe}
	if err = Ormer().Read(v, "Name", "Status"); err == nil {
		return 0, errors.New("已有相同应用待审批状态!")
	}
	m.CreateTime = nil
	id, err = Ormer().Insert(m)
	return
}

// GetByName retrieves BuildReview by Name. Returns error if
// Id doesn't exist
func (*buildReviewModel) GetByName(name string) (v *BuildReview, err error) {
	v = &BuildReview{Name: name, Status: BuildReviewStatusTobe}

	if err = Ormer().Read(v, "Name", "Status"); err == nil {
		return v, nil
	}
	return nil, err
}

func (*buildReviewModel) GetLatestByName(name string) (BuildReviewStatus, error) {
	v := &BuildReview{Name: name}
	qs := Ormer().QueryTable(new(BuildReview))
	err := qs.Filter("name", name).OrderBy("-publish_time").One(v)
	return v.Status, err
}

// GetById retrieves BuildReview by Id. Returns error if
// Id doesn't exist
func (*buildReviewModel) GetById(id int64) (v *BuildReview, err error) {
	v = &BuildReview{Id: id}

	if err = Ormer().Read(v); err == nil {
		return v, nil
	}
	return nil, err
}

// UpdateBuildReview updates BuildReview by Name and returns error if
// the record to be updated doesn't exist
func (*buildReviewModel) UpdateByName(m *BuildReview) (err error) {
	v := BuildReview{Name: m.Name, Status: BuildReviewStatusTobe}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name", "Status"); err == nil {
		m.UpdateTime = nil
		_, err = Ormer().Update(m, "Auditors", "Status", "AnnounceTime")
		return err
	}
	return
}

// Delete deletes BuildReview by Id and returns error if
// the record to be deleted doesn't exist
func (*buildReviewModel) DeleteByName(name string) (err error) {
	v := BuildReview{Name: name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		_, err = Ormer().Delete(&v)
		return err
	}
	return
}
