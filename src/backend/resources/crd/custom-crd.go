package crd

import (
	"encoding/json"
	"fmt"
	"time"

	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/kubernetes"

	"github.com/Qihoo360/wayne/src/backend/common"
	"github.com/Qihoo360/wayne/src/backend/resources/dataselector"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
)

func GetCustomCRD(cli *kubernetes.Clientset, group, version, kind, namespace, name string) (runtime.Object, error) {
	req := cli.RESTClient().Verb("GET").RequestURI(
		fmt.Sprintf("/apis/%s/%s/namespaces/%s/%s/%s",
			group,
			version,
			namespace,
			kind,
			name))
	raw, err := req.Do().Raw()
	if err != nil {
		return nil, err
	}
	result := &runtime.Unknown{}
	err = json.Unmarshal(raw, result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func CreatCustomCRD(cli *kubernetes.Clientset, group, version, kind, namespace string, body interface{}) (runtime.Object, error) {
	req := cli.RESTClient().Verb("POST").RequestURI(
		fmt.Sprintf("/apis/%s/%s/namespaces/%s/%s",
			group,
			version,
			namespace,
			kind)).Body(body)
	raw, err := req.Do().Raw()
	if err != nil {
		return nil, err
	}
	result := &runtime.Unknown{}
	err = json.Unmarshal(raw, result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func UpdateCustomCRD(cli *kubernetes.Clientset, group, version, kind, namespace, name string, object *runtime.Unknown) (runtime.Object, error) {
	req := cli.RESTClient().Verb("PUT").RequestURI(
		fmt.Sprintf("/apis/%s/%s/namespaces/%s/%s/%s",
			group,
			version,
			namespace,
			kind,
			name)).
		Body([]byte(object.Raw)).
		SetHeader("Content-Type", "application/json")
	raw, err := req.Do().Raw()
	if err != nil {
		logs.Error(req.URL().String(), err)
		return nil, err
	}
	result := &runtime.Unknown{}
	err = json.Unmarshal(raw, result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func DeleteCustomCRD(cli *kubernetes.Clientset, group, version, kind, namespace, name string) error {
	req := cli.RESTClient().Verb("DELETE").RequestURI(
		fmt.Sprintf("/apis/%s/%s/namespaces/%s/%s/%s",
			group,
			version,
			namespace,
			kind,
			name))
	return req.Do().Error()
}

func GetCustomCRDPage(cli *kubernetes.Clientset, group, version, kind, namespace string, q *common.QueryParam) (*common.Page, error) {
	req := cli.RESTClient().Verb("GET").RequestURI(
		fmt.Sprintf("/apis/%s/%s/namespaces/%s/%s",
			group,
			version,
			namespace,
			kind))
	result, err := req.Do().Raw()
	if err != nil {
		return nil, err
	}

	crdList := &CustomCRDList{}
	err = json.Unmarshal(result, crdList)
	if err != nil {
		return nil, err
	}
	return dataselector.DataSelectPage(toCustomCRDCells(crdList.Items), q), nil
}

func CleanCustomCRDDelList(cli *kubernetes.Clientset, group, version, namespace string) error {
	now := time.Now()
	fmt.Println("now: ", now)
	//PipelineRun
	resultPipeline, err := getCRDResult(cli, group, version, "pipelineruns", namespace)
	if err != nil {
		return err
	}

	fmt.Println("pipelineList")
	pipelineList := &CustomCRDPipelineRunList{}
	err = json.Unmarshal(resultPipeline, pipelineList)
	if err != nil {
		fmt.Println(err)
		return err
	}
	for _, v := range pipelineList.Items {
		if now.Sub(v.ObjectMeta.CreationTimestamp.Time).Hours()/24 > 30.0 {
			fmt.Println(v.Name)
			err := DeleteCustomCRD(cli, group, version, "pipelineruns", namespace, v.Name)
			if err != nil {
				logs.Error("Del pipelineruns err: ", err)
			}
		}
	}

	//pipelineresources
	resultResource, err := getCRDResult(cli, group, version, "pipelineresources", namespace)
	if err != nil {
		return err
	}
	fmt.Println("pipelineresources")
	resourceList := &CustomCRDPipelineResourceList{}
	err = json.Unmarshal(resultResource, resourceList)
	if err != nil {
		fmt.Println(err)
		return err
	}
	for _, v := range resourceList.Items {
		if now.Sub(v.ObjectMeta.CreationTimestamp.Time).Hours()/24 > 30.0 {
			fmt.Println(v.Name)
			err := DeleteCustomCRD(cli, group, version, "pipelineresources", namespace, v.Name)
			if err != nil {
				logs.Error("Del pipelineresources err: ", err)
			}
		}
	}

	//taskruns
	resultTasks, err := getCRDResult(cli, group, version, "taskruns", namespace)
	if err != nil {
		return err
	}
	fmt.Println("taskList")
	taskList := &CustomCRDTaskRunList{}
	err = json.Unmarshal(resultTasks, taskList)
	if err != nil {
		fmt.Println(err)
		return err
	}
	for _, v := range taskList.Items {
		if now.Sub(v.ObjectMeta.CreationTimestamp.Time).Hours()/24 > 30.0 {
			fmt.Println(v.Name)
			err := DeleteCustomCRD(cli, group, version, "taskruns", namespace, v.Name)
			if err != nil {
				logs.Error("Del taskruns err: ", err)
			}
		}
	}

	return nil
}

func getCRDResult(cli *kubernetes.Clientset, group, version, kind, namespace string) ([]byte, error) {
	req := cli.RESTClient().Verb("GET").RequestURI(
		fmt.Sprintf("/apis/%s/%s/namespaces/%s/%s",
			group,
			version,
			namespace,
			kind))
	result, err := req.Do().Raw()
	if err != nil {
		return nil, err
	}
	return result, nil
}

func toCustomCRDCells(deploy []CustomCRD) []dataselector.DataCell {
	cells := make([]dataselector.DataCell, len(deploy))
	for i := range deploy {
		cells[i] = CustomCRDCell(deploy[i])
	}
	return cells
}
