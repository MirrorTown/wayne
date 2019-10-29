package main

import (
	"fmt"

	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"

	_ "github.com/Qihoo360/wayne/src/backend/plugins"
)

type HomeP interface {
	Home() (string, error)
	GetCurrentDirectory() string
}

func init() {
	home := HomeP(&apimachinery.HomePath{}).GetCurrentDirectory()
	err := beego.LoadAppConfig("ini", home +"/src/wayne/src/backend/conf/app.conf")
	if err != nil {
		panic(err)
	}
}

func main() {
	err := orm.RegisterDriver("mysql", orm.DRMySQL)
	if err != nil {
		panic(err)
	}
	dbURL := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&", beego.AppConfig.String("DBUser"),
		beego.AppConfig.String("DBPasswd"), beego.AppConfig.String("DBTns"), beego.AppConfig.String("DBName"))
	// set timezone  , same as db timezone
	dbURL += beego.AppConfig.String("DBLoc")

	err = orm.RegisterDataBase("default", "mysql", dbURL)
	if err != nil {
		panic(err)
	}
	orm.RunCommand()
}
