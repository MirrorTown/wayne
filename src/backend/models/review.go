package models

import (
	"time"
)

type ReviewStatus int32

const (
	ReviewStatusTobe      ReviewStatus = 0
	ReviewStatusPass 	  ReviewStatus = 1
	ReviewStatusReject    ReviewStatus = 2

	TableNameReview = "review"
)

type reviewModel struct{}

type Review struct {
	Id   int64  `orm:"auto" json:"id,omitempty"`
	Name string `orm:"index;size(128)" json:"name,omitempty"`
	AppId    string     `orm:"index;column(app_id)" json:"appId,omitempty"`
	Announcer      string     `orm:"size(128)" json:"announcer,omitempty"`
	PublishTime  string     `orm:"auto_now;type(datetime);column(publish_time)" json:"publishTime,omitempty"`
	Auditors string     `orm:"null;size(128)" json:"auditors,omitempty"`
	CreateTime  *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime  *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	// the review status
	Status ReviewStatus `orm:"default(0)" json:"status"`
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
	m.CreateTime = nil
	id, err = Ormer().Insert(m)
	return
}

// GetByName retrieves Review by Name. Returns error if
// Id doesn't exist
func (*reviewModel) GetByName(name string) (v *Review, err error) {
	v = &Review{Name: name}

	if err = Ormer().Read(v, "Name"); err == nil {
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
	v := Review{Name: m.Name}
	// ascertain id exists in the database
	if err = Ormer().Read(&v, "Name"); err == nil {
		m.UpdateTime = nil
		_, err = Ormer().Update(m)
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
