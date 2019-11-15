package cmd

import (
	"github.com/Qihoo360/wayne/src/backend/cmd/worker"
	"github.com/Qihoo360/wayne/src/backend/initial"
	_ "github.com/Qihoo360/wayne/src/backend/routers"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/astaxie/beego"
	"github.com/spf13/cobra"
)

var RootCmd = &cobra.Command{
	Use: "wayne",
}

func init() {
	cobra.EnableCommandSorting = false
	RootCmd.AddCommand(worker.WorkerCmd)
}

func Run() {

	// MySQL
	initial.InitDb()

	// Swagger API
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}

	// K8S Client
	initial.InitClient()
	initial.InitCronJob()

	// 初始化RsaPrivateKey
	initial.InitRsaKey()
	err := RootCmd.Execute()
	if err != nil {
		logs.Error("执行worker失败,", err)
	}

	// init kube labels
	initial.InitKubeLabel()

	beego.Run()
}
