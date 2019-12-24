package evnetListenter

import (
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/apimachinery"
	"time"

	"k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/fields"
	"k8s.io/client-go/tools/cache"
)

type PodeEvent struct {
	cluster   string
	namespace string
}

func (p *PodeEvent) ListenPod() {
	ticker := time.NewTicker(time.Second * 10)
	select {

	case t := <-ticker.C:
		fmt.Println(t.String())
		var cli apimachinery.ClientSet

		clientset := cli.Manager("aliyun-k8s-c2").Client

		watchlist := cache.NewListWatchFromClient(clientset.CoreV1().RESTClient(), "pods", "wireless-ci",
			fields.Everything())
		_, controller := cache.NewInformer(
			watchlist,
			&v1.Pod{},
			time.Second*0,
			cache.ResourceEventHandlerFuncs{
				AddFunc: func(obj interface{}) {
					fmt.Printf("add: %s %s \n", obj.(*v1.Pod).Name, obj.(*v1.Pod).Status.Phase)
				},
				DeleteFunc: func(obj interface{}) {
					fmt.Printf("delete:%s %s \n", obj.(*v1.Pod).Name, obj.(*v1.Pod).Status.Phase)
				},
				UpdateFunc: func(oldObj, newObj interface{}) {
					//监听短暂性任务结果
					if (newObj.(*v1.Pod).Status.Phase == "Succeeded" && oldObj.(*v1.Pod).Status.Phase == "Succeeded") || (newObj.(*v1.Pod).Status.Phase == "Failed" && oldObj.(*v1.Pod).Status.Phase == "Failed") {
						fmt.Printf("old:%s %s, new:%s %s \n", oldObj.(*v1.Pod).Name, oldObj.(*v1.Pod).Status.Phase, newObj.(*v1.Pod).Name, newObj.(*v1.Pod).Status.Phase)
					}
				},
			},
		)
		stop := make(chan struct{})
		//defer close(stop)
		go controller.Run(stop)
	}

}
