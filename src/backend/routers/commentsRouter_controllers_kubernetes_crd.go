package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {
	const KubeCRDController = "github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCRDController"
	beego.GlobalControllerRouter[KubeCRDController] = append(
		beego.GlobalControllerRouter[KubeCRDController],
		beego.ControllerComments{
			Method:           "List",
			Router:           `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Create",
			Router:           `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Get",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Update",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"put"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Delete",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"],
		beego.ControllerComments{
			Method:           "List",
			Router:           `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"],
		beego.ControllerComments{
			Method:           "Create",
			Router:           `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"],
		beego.ControllerComments{
			Method:           "Update",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"put"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeCustomCRDController"],
		beego.ControllerComments{
			Method:           "Delete",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "List",
			Router:           `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "Create",
			Router:           `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "GetStatus",
			Router:           `/:name/status`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "Update",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"put"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "Delete",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/kubernetes/crd:KubeTektonCRDController"],
		beego.ControllerComments{
			Method:           "CleanCrd",
			Router:           `/`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})
}
