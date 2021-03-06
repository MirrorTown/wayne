package models

import "time"

const (
	ConfigGlobal = 1
	ConfigOne    = 2
	EnvType      = 1
	FileType     = 2

	TableNameConfigMapHulk = "configmap_hulk"
)

type configmapHulkModel struct{}

type ConfigMapHulk struct {
	Id             int64      `orm:"auto" json:"id,omitempty"`
	Name           string     `orm:"unique;size(64)" json:"name,omitempty"`
	AppName        string     `orm:"unique;index;size(64)" json:"appName,omitempty"`
	Szone          string     `orm:"null;size(64)" json:"sZone,omitempty"`
	LimitMem       int64      `orm:"default(900)" json:"limitMem,omitempty"`
	Env            int64      `orm:"default(1)" json:"env,omitempty"`
	Scope          int64      `orm:"default(0)" json:"scope,omitempty"`
	Type           int64      `orm:"default(1)" json:"type"`
	MountPath      string     `orm:"size(100)" json:"mountPath,omitempty"`
	SubPath        string     `orm:"size(64)" json:"subPath,omitempty"`
	ConfigResource string     `orm:"type(text)" json:"configResource,omitempty"`
	CreateTime     *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime     *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`
}

func (*ConfigMapHulk) TableName() string {
	return TableNameConfigMapHulk
}

func (*configmapHulkModel) GetById(id int64) (v *ConfigMapHulk, err error) {
	v = &ConfigMapHulk{Id: id}
	if err = Ormer().Read(v); err == nil {
		return
	}

	return nil, err
}

func (*configmapHulkModel) List() ([]ConfigMapHulk, error) {
	pipelines := []ConfigMapHulk{}
	_, err := Ormer().QueryTable(new(ConfigMapHulk)).
		All(&pipelines)
	if err == nil {
		return pipelines, nil
	}
	return nil, err
}

func (*configmapHulkModel) Add(p *ConfigMapHulk) error {
	p.CreateTime = nil
	_, err := Ormer().Insert(p)
	if err != nil {
		return err
	}

	return nil
}

func (*configmapHulkModel) Update(p *ConfigMapHulk) (err error) {
	v := &ConfigMapHulk{Id: p.Id}
	if err = Ormer().Read(v); err == nil {
		p.UpdateTime = nil
		_, err = Ormer().Update(p)
		return nil
	}
	return
}

func (*configmapHulkModel) Delete(id int64, logical bool) (err error) {
	v := &ConfigMapHulk{Id: id}
	if err = Ormer().Read(v); err == nil {
		_, err = Ormer().Delete(v)
		return
	}
	return
}
