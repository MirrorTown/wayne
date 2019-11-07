package models

import (
	"errors"
	"time"
)

type ReviewStatus int32

const (
	ReviewStatusTobe   ReviewStatus = 0
	ReviewStatusPass   ReviewStatus = 1
	ReviewStatusReject ReviewStatus = 2

	TableNameReview = "review"
)

type reviewModel struct{}

type Review struct {
	Id           int64      `orm:"auto" json:"id,omitempty"`
	Name         string     `orm:"index;size(128)" json:"name,omitempty"`
	AppId        int64      `orm:"index;column(app_id)" json:"appId,omitempty"`
	TplId        int64      `orm:"index;column(tpl_id)" json:"tplId,omitempty"`
	DeploymentId int64      `orm:"index;column(deployment_id)" json:"deploymentId,omitempty"`
	Announcer    string     `orm:"size(128)" json:"announcer,omitempty"`
	PublishTime  *time.Time `orm:"auto_now;type(datetime);column(publish_time)" json:"publishTime,omitempty"`
	AnnounceTime string     `orm:"type(datetime);column(announce_time)" json:"announceTime,omitempty"`
	Auditors     string     `orm:"null;size(128)" json:"auditors,omitempty"`
	CreateTime   *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime   *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	// the review status
	Status         ReviewStatus `orm:"default(0)" json:"status"`
	KubeDeployment string       `orm:"null;type(text);column(kube_deployment)" json:"kubeDeployment,omitempty"`
	Cluster        string       `orm:"null;size(128)" json:"cluster,omitempty"`
	GrayPublish    string       `orm:"null;size(128);column(gray_publish)" json:"grayPublish,omitempty"`
	NamespaceId    int64        `orm:"-" json:"namespaceid,omitempty"`
}

func (*Review) TableName() string {
	return TableNameReview
}

func (*reviewModel) GetNames() ([]Review, error) {
	reviews := []Review{}
	_, err := Ormer().
		QueryTable(new(Review)).
		All(&reviews, "Id", "Name")

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

func (*reviewModel) GetAll() ([]Review, error) {
	reviews := []Review{}
	_, err := Ormer().
		QueryTable(new(Review)).
		All(&reviews)

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

// Add insert a new Review into database and returns
// last inserted Id on success.
func (*reviewModel) Add(m *Review) (id int64, err error) {
	v := &Review{Name: m.Name, Status: ReviewStatusTobe}
	if err = Ormer().Read(v, "Name", "Status"); err == nil {
		return 0, errors.New("已有相同应用待审批状态!")
	}
	m.CreateTime = nil
	id, err = Ormer().Insert(m)
	return
}

// GetByName retrieves Review by Name. Returns error if
// Id doesn't exist
func (*reviewModel) GetByName(name string) (v *Review, err error) {
	v = &Review{Name: name, Status: ReviewStatusTobe}

	if err = Ormer().Read(v, "Name", "Status"); err == nil {
		return v, nil
	}
	return nil, err
}

// GetById retrieves Review by Id. Returns error if
// Id doesn't exist
func (*reviewModel) GetById(id int64) (v *Review, err error) {
	v = &Review{Id: id}

	if err = Ormer().Read(v); err == nil {
		return v, nil
	}
	return nil, err
}

// UpdateReview updates Review by Name and returns error if
// the record to be updated doesn't exist
func (*reviewModel) UpdateByName(m *Review) (err error) {
	v := Review{Name: m.Name, Status: ReviewStatusTobe}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name", "Status"); err == nil {
		m.UpdateTime = nil
		_, err = Ormer().Update(m, "Auditors", "Status", "AnnounceTime")
		return err
	}
	return
}

// Delete deletes Review by Id and returns error if
// the record to be deleted doesn't exist
func (*reviewModel) DeleteByName(name string) (err error) {
	v := Review{Name: name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		_, err = Ormer().Delete(&v)
		return err
	}
	return
}
