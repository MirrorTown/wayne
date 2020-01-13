package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"],
		beego.ControllerComments{
			Method:           "Create",
			Router:           `/app/:appName/ns/:namespace/cluster/:cluster`,
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"],
		beego.ControllerComments{
			Method:           "List",
			Router:           `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/multienv:MultienvController"],
		beego.ControllerComments{
			Method:           "Delete",
			Router:           `/:name`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Params:           nil})
}
