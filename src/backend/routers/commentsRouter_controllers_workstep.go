package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/workstep:WorkStepController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/workstep:WorkStepController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           `/namespace/:nsId/apps/:appId/deployment/:depId`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})
}
