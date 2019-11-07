package models

const (
	TableNameHostAlias = "host_alias"
)

type hostAliasModel struct{}

type HostAlias struct {
	Id          int64  `orm:"auto" json:"id,omitempty"`
	AppId       int64  `orm:"index" json:"appId,omitempty"`
	NamespaceId int64  `orm:"index" json:"namespaceId,omitempty"`
	Ip          string `orm:"unique;index;size(128)" json:"ip,omitempty"`
	Hostnames   string `orm:"size(512)" json:"hostnames,omitempty"`
}

func (*HostAlias) TableName() string {
	return TableNameHostAlias
}

func (h *hostAliasModel) Add(hostalias HostAlias) (id int64, err error) {
	id, err = Ormer().Insert(&hostalias)
	return
}

func (h *hostAliasModel) Update(hostalias *HostAlias) (err error) {
	v := HostAlias{Id: hostalias.Id}
	if err := Ormer().Read(&v); err == nil {
		_, err = Ormer().Update(hostalias, "Ip", "Hostnames")
	}
	return
}

func (h *hostAliasModel) GetById(appId int64, nsId int64) ([]HostAlias, error) {
	hostaliases := []HostAlias{}
	qs := Ormer().
		QueryTable(new(HostAlias))
	qs = qs.Filter("AppId__exact", appId).Filter("NamespaceId__exact", nsId)
	_, err := qs.All(&hostaliases)

	if err != nil {
		return nil, err
	}

	return hostaliases, nil
}

func (h *hostAliasModel) DeleteById(id int64) (err error) {
	hostalias := HostAlias{Id: id}
	if err := Ormer().Read(&hostalias); err == nil {
		_, err = Ormer().Delete(&hostalias)
		return err
	}

	return
}
