package models

import "time"

const (
	PipelineNormal   = 0
	PipelineMainting = 1

	TableNamePipeline = "pipeline"
)

type pipelineModel struct{}

type Pipeline struct {
	Id          int64      `orm:"auto" json:"id,omitempty"`
	Name        string     `orm:"unique;index;size(128)" json:"name,omitempty"`
	Description string     `orm:"null;size(128)" json:"description,omitempty"`
	BuildUri    string     `orm:"null;size(128)" json:"buildUri,omitempty"`
	LogUri      string     `orm:"null;size(128)" json:"logUri,omitempty"`
	Status      int64      `orm:"default(0)" json:"status"`
	CreateTime  *time.Time `orm:"auto_now_add;type(datetime)" json:"createTime,omitempty"`
	UpdateTime  *time.Time `orm:"auto_now;type(datetime)" json:"updateTime,omitempty"`

	//用于关联查询
	TektonBuilds []*TektonBuild `orm:"reverse(many)" json:"tektonBuilds,omitempty"`
}

func (*Pipeline) TableName() string {
	return TableNamePipeline
}

func (*pipelineModel) GetById(id int64) (v *Pipeline, err error) {
	v = &Pipeline{Id: id}
	if err = Ormer().Read(v); err == nil {
		return
	}

	return nil, err
}

func (*pipelineModel) GetTektonBuildById(id int64) ([]*TektonBuild, error) {
	p := &Pipeline{Id: id}
	err := Ormer().Read(p)
	if err == nil {
		_, err := Ormer().LoadRelated(p, "TektonBuilds")
		return p.TektonBuilds, err
	}

	return nil, err
}

func (*pipelineModel) List() ([]Pipeline, error) {
	pipelines := []Pipeline{}
	_, err := Ormer().QueryTable(new(Pipeline)).
		Filter("Status", PipelineNormal).
		All(&pipelines)
	if err == nil {
		return pipelines, nil
	}
	return nil, err
}

func (*pipelineModel) Add(p *Pipeline) error {
	p.CreateTime = nil
	_, err := Ormer().Insert(p)
	if err != nil {
		return err
	}

	return nil
}

func (*pipelineModel) Update(p *Pipeline) (err error) {
	v := &Pipeline{Id: p.Id}
	if err = Ormer().Read(v); err == nil {
		v.UpdateTime = nil
		_, err = Ormer().Update(v)
		return nil
	}
	return
}

func (*pipelineModel) Delete(id int64, logical bool) (err error) {
	v := &Pipeline{Id: id}
	if err = Ormer().Read(v); err == nil {
		_, err = Ormer().Delete(v)
		return
	}
	return
}
