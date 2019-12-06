package cronjob

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/resources/crd"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"time"
)

type Tekton struct {
	Name string
}

func (t *Tekton) StartTektonCron() (err error) {
	var cli apimachinery.ClientSet

	go func() {
		defer func() {
			if err := recover(); err != nil {
				fmt.Println(err)
				logs.Error(err)
			}
		}()

		for range time.Tick(time.Second * 3) {
			tektonList, err := models.TektonModel.GetAllNeedCheck()
			if err != nil {
				logs.Error(err)
			}
			for _, sub := range tektonList {
				cli := cli.Manager(sub.Cluster).Client
				result, err := crd.GetCustomCRD(cli, sub.Group, sub.Version, sub.Kind, sub.Namespace, sub.Name)
				if err != nil {
					logs.Error(err)
				}
				fmt.Println(result)
			}

		}
	}()

	return nil
}
