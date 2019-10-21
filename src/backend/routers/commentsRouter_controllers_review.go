package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"],
		beego.ControllerComments{
			Method:           "Create",
			Router:           `/apps/:appId/deployments/:deploymentId([0-9]+)/tpls/:tplId([0-9]+)/clusters/:cluster`,
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"],
		beego.ControllerComments{
			Method:           "List",
			Router:           `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"],
		beego.ControllerComments{
			Method:           "Update",
			Router:           `/:namespaceid([0-9]+)/:name/status/:status`,
			AllowHTTPMethods: []string{"put"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"],
		beego.ControllerComments{
			Method:           "Delete",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/review:ReviewController"],
		beego.ControllerComments{
			Method:           "GetNames",
			Router:           `/names`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})
}
