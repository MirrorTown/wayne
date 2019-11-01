package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/hongmao:HongMaoController"] = append(beego.GlobalControllerRouter["github.com/Qihoo360/wayne/src/backend/controllers/hongmao:HongMaoController"],
		beego.ControllerComments{
			Method:           "Sysnc",
			Router:           `/app/sysnc`,
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Params:           nil})
}
