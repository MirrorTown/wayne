package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {
	const HostAliaseController = "github.com/Qihoo360/wayne/src/backend/controllers/hostAlias:HostAliasController"
	beego.GlobalControllerRouter[HostAliaseController] = append(
		beego.GlobalControllerRouter[HostAliaseController],
		beego.ControllerComments{
			Method:           "List",
			Router:           `/namespace/:nsId/apps/:appId`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Create",
			Router:           `/namespace/:nsId/apps/:appId`,
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil,
		},
		beego.ControllerComments{
			Method:           "Delete",
			Router:           "/:id([0-9]+)",
			Filters:          nil,
			AllowHTTPMethods: []string{"delete"},
			Params:           nil,
			MethodParams:     param.Make(),
		},
		beego.ControllerComments{
			Method:           "Update",
			Router:           "/",
			Filters:          nil,
			AllowHTTPMethods: []string{"put"},
			Params:           nil,
			MethodParams:     param.Make(),
		})
}
