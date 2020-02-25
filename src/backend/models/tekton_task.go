package models

import (
	"time"
)

const (
	TableNameTektonTask = "tekton_task"
)

type tektonTaskModel struct{}

type TektonTask struct {
	Id          int64        `orm:"auto" json:"id,omitempty"`
	Name        string       `orm:"size(128)" json:"name,omitempty"`
	Template    string       `orm:"type(text)" json:"template,omitempty"`
	TektonParam *TektonParam `orm:"index;rel(fk);column(tekton_param_id)" json:"tekton_param,omitempty"`
	Description string       `orm:"size(512)" json:"description,omitempty"`

	// TODO
	// 如果使用指针类型auto_now_add和auto_now可以自动生效,但是orm QueryRows无法对指针类型的time正常赋值，
	// 不使用指针类型创建时需要手动把创建时间设置为当前时间,更新时也需要处理创建时间
	CreateTime time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
	User       string    `orm:"size(128)" json:"user,omitempty"`
	Deleted    bool      `orm:"default(false)" json:"deleted,omitempty"`

	TektonParamId int64            `orm:"-" json:"tektonParamId,omitempty"`
	Status        []*PublishStatus `orm:"-" json:"status,omitempty"`
}

func (*TektonTask) TableName() string {
	return TableNameTektonTask
}

func (*tektonTaskModel) Add(m *TektonTask) (id int64, err error) {
	m.TektonParam = &TektonParam{Id: m.TektonParamId}
	now := time.Now()
	m.CreateTime = now
	m.UpdateTime = now
	id, err = Ormer().Insert(m)
	return
}

func (*tektonTaskModel) UpdateById(m *TektonTask) (err error) {
	v := TektonTask{Id: m.Id}
	// ascertain id exists in the database
	if err = Ormer().Read(&v); err == nil {
		_, err = Ormer().Update(m)
		return err
	}
	return
}

func (*tektonTaskModel) GetById(id int64) (v *TektonTask, err error) {
	v = &TektonTask{Id: id}

	if err = Ormer().Read(v); err == nil {
		_, err = Ormer().LoadRelated(v, "TektonParam")
		if err == nil {
			v.TektonParamId = v.TektonParam.Id
			return v, nil
		}
	}
	return nil, err
}

func (*tektonTaskModel) GetOneById(id int64) (string, error) {
	v := &TektonTask{}
	qs := Ormer().QueryTable(new(TektonTask))
	err := qs.Filter("deployment_id", id).One(v)

	return v.Name, err
}

func (*tektonTaskModel) DeleteById(id int64, logical bool) (err error) {
	v := TektonTask{Id: id}
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

func (*tektonTaskModel) GetLatestDeptplByName(ns, app, deployment string) (v *TektonTask, err error) {
	v = &TektonTask{}
	// use orm
	qs := Ormer().QueryTable(new(TektonTask))
	err = qs.Filter("Deployment__App__Namespace__Name", ns).Filter("Deployment__App__Name", app).Filter("Name", deployment).Filter("Deleted", 0).OrderBy("-id").One(v)
	if err == nil {
		v.TektonParamId = v.TektonParam.Id
		return v, nil
	}
	return nil, err
}

func (*tektonTaskModel) GetDeptplByName(deployment string) (*TektonTask, error) {
	v := &TektonTask{}
	// use orm
	qs := Ormer().QueryTable(new(TektonTask))
	err := qs.Filter("Name", deployment).Filter("Deleted", 0).OrderBy("-id").One(v)
	if err == nil {
		v.TektonParamId = v.TektonParam.Id
		return v, nil
	}
	return nil, err
}
