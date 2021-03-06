package crd

import (
	"encoding/json"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/hack"

	"k8s.io/apimachinery/pkg/runtime"

	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/resources/crd"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

type KubeTektonCRDController struct {
	base.APIController

	cluster   string
	namespace string
	group     string
	kind      string
	version   string
	name      string
}

func (c *KubeTektonCRDController) URLMapping() {
	c.Mapping("List", c.List)
	c.Mapping("Get", c.Get)
	c.Mapping("GetStatus", c.GetStatus)
	c.Mapping("Create", c.Create)
	c.Mapping("Update", c.Update)
	c.Mapping("Delete", c.Delete)
	c.Mapping("CleanCrd", c.CleanCrd)
}

func (c *KubeTektonCRDController) Prepare() {
	// build params
	c.cluster = c.Ctx.Input.Param(":cluster")
	c.namespace = c.Ctx.Input.Param(":namespace")
	c.group = c.Ctx.Input.Param(":group")
	c.kind = c.Ctx.Input.Param(":kind")
	c.version = c.Ctx.Input.Param(":version")
	c.name = c.Ctx.Input.Param(":name")
}

// @Title List CRD
// @Description find CRD by cluster
// @Param	namespace		path 	string	true		"the namespace name"
// @router / [get]
func (c *KubeTektonCRDController) List() {
	param := c.BuildKubernetesQueryParam()
	cli := c.Client(c.cluster)
	result, err := crd.GetCustomCRDPage(cli, c.group, c.version, c.kind, c.namespace, param)
	if err != nil {
		logs.Error("list CRD by cluster (%s) error.%v", c.cluster, err)
		c.HandleError(err)
		return
	}
	c.Success(result)
}

// @Title get CRD
// @Description find CRD by cluster
// @Param	name		path 	string	true		"the resource name"
// @router /:name [get]
func (c *KubeTektonCRDController) Get() {
	cli := c.Client(c.cluster)
	result, err := crd.GetCustomCRD(cli, c.group, c.version, c.kind, c.namespace, c.name)
	if err != nil {
		btekton, err := models.TektonModel.GetByName(c.name)
		if err != nil {
			logs.Error("get CRD by cluster (%s) name(%s) error.%v", c.cluster, c.name, err)
			c.HandleError(err)
			return
		}
		var result map[string]interface{}
		_ = json.Unmarshal(hack.Slice(btekton.MetaData), &result)
		c.Success(result)
		return
	}
	c.Success(result)
}

// @Title get CRD
// @Description find CRD by cluster
// @Param	name		path 	string	true		"the resource name"
// @router /:name/status [get]
func (c *KubeTektonCRDController) GetStatus() {

	btekton, err := models.TektonModel.GetByName(c.name)
	if err != nil {
		logs.Info("get CRD by cluster (%s) name(%s) error.%v", c.cluster, c.name, err)
		return
	}
	c.Success(btekton.Status)
}

// @Title Create
// @Description create CustomResourceDefinition
// @Param	namespace		path 	string	true		"the namespace name"
// @router / [post]
func (c *KubeTektonCRDController) Create() {
	cli := c.Client(c.cluster)
	result, err := crd.CreatCustomCRD(cli, c.group, c.version, c.kind, c.namespace, c.Ctx.Input.RequestBody)
	if err != nil {
		logs.Error("create CRD by cluster (%s) error.%v", c.cluster, err)
		c.HandleError(err)
		return
	}
	c.Success(result)
}

// @Title Update
// @Description update the CustomResourceDefinition
// @Param	namespace		path 	string	true		"the namespace name"
// @router /:name [put]
func (c *KubeTektonCRDController) Update() {
	cli := c.Client(c.cluster)
	var object runtime.Unknown
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &object)
	if err != nil {
		c.AbortBadRequestFormat("object")
	}
	result, err := crd.UpdateCustomCRD(cli, c.group, c.version, c.kind, c.namespace, c.name, &object)
	if err != nil {
		logs.Error("update CRD by cluster (%s) error.%v", c.cluster, err)
		c.HandleError(err)
		return
	}
	c.Success(result)
}

// @Title Delete
// @Description delete the CustomResourceDefinition
// @Param	namespace		path 	string	true		"the namespace name"
// @Success 200 {string} delete success!
// @router /:name [delete]
func (c *KubeTektonCRDController) Delete() {
	cli := c.Client(c.cluster)
	err := crd.DeleteCustomCRD(cli, c.group, c.version, c.kind, c.namespace, c.name)
	if err != nil {
		logs.Error("delete CRD (%s) by cluster (%s) error.%v", c.name, c.cluster, err)
		c.HandleError(err)
		return
	}
	c.Success("ok!")

}

func (c *KubeTektonCRDController) CleanCrd() {
	cli := c.Client(c.cluster)
	err := crd.CleanCustomCRDDelList(cli, "tekton.dev", "v1alpha1", "wireless-ci")

	if err != nil {
		logs.Error("Clean CRD error.%v", err)
		c.HandleError(err)
		return
	}
	c.Success("Clean done")
}
