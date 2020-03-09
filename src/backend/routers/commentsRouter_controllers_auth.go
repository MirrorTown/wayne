package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {
	const AuthController = "github.com/Qihoo360/wayne/src/backend/controllers/auth:AuthController"
	beego.GlobalControllerRouter[AuthController] = append(
		beego.GlobalControllerRouter[AuthController],
		beego.ControllerComments{
			Method:           "CurrentUser",
			Router:           `/wayne/currentuser`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Login",
			Router:           `/wayne/login/:type/?:name`,
			AllowHTTPMethods: []string{"get", "post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Logout",
			Router:           `/wayne/logout`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		})
}
