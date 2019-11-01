package models

import (
	"bytes"
	"strings"
)

const (
	TableNameHong = "hongmaouser"
)

type hongmaoUserModel struct{}

type HongmaoUser struct {
	Id    int64  `orm:"auto" json:"id,omitempty"`
	User  string `orm:"unique;index;size(128)" json:"user,omitempty"`
	Items string `orm:"type(text)" json:"items,omitempty"`
}

func (*HongmaoUser) TableName() string {
	return TableNameHong
}

func (*hongmaoUserModel) AddApps(user string, item string) (err error) {
	v := &HongmaoUser{User: user}
	if err = Ormer().Read(v, "User"); err == nil {
		if !strings.Contains(v.Items, item) {
			return nil
		}
		var buffer bytes.Buffer
		buffer.WriteString(v.Items)
		buffer.WriteString(",")
		buffer.WriteString(item)
		v.Items = buffer.String()
	}
	_, err = Ormer().Insert(v)
	return
}

func (*hongmaoUserModel) GetByUser(user string) (v *HongmaoUser, err error) {
	v = &HongmaoUser{User: user}

	if err = Ormer().Read(v, "User"); err == nil {
		return v, nil
	}
	return nil, err
}
