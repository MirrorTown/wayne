package images

import (
	"context"
	"fmt"
	"github.com/Qihoo360/wayne/src/backend/controllers/base"
	"github.com/Qihoo360/wayne/src/backend/models"
	"github.com/Qihoo360/wayne/src/backend/util/logs"
	"github.com/bingbaba/harbor-go"
	harborModle "github.com/bingbaba/harbor-go/models"
	"github.com/siddontang/go/log"
	"strconv"
	"strings"
)

const (
	username = ""
	password = ""
	host     = ""
)

type HarborImageController struct {
	base.APIController
}

func (c *HarborImageController) Prepare() {
	// Check administration
	c.APIController.Prepare()

	//methodActionMap := map[string]string{
	//	"List":   models.PermissionRead,
	//	"Get":    models.PermissionRead,
	//	"Create": models.PermissionCreate,
	//	"Update": models.PermissionUpdate,
	//	"Delete": models.PermissionDelete,
	//}
	//
	//_, method := c.GetControllerAndAction()
	//c.PreparePermission(methodActionMap, method, models.PermissionTypeKubeCustomResourceDefinition)
}

func (c *HarborImageController) URLMapping() {
	c.Mapping("List", c.List)
	c.Mapping("ListTag", c.ListTag)
}

func (c *HarborImageController) ListTag() {
	image := c.GetString("image")
	if len(image) == 0 {
		return
	} else if len(strings.Split(image, "/")) < 2 {
		return
	} else if strings.Contains(strings.Split(image, "/")[0], "aliyuncs.com") {
		fmt.Println(strings.Split(image, "/")[0])
		return
	} else if strings.Contains(image, "nexus") {
		return
	}

	projectName := strings.Split(image, "/")[1]
	harbor, err := models.HarborModel.GetByProject(projectName)
	if err != nil {
		logs.Error("获取harbor数据库信息失败")
	}
	cli, err := c.HarborClient(harbor.Url, harbor.User, harbor.Passwd)
	if err != nil {
		logs.Error("获取harbor客户端失败")
	}
	tag, err := cli.ListRepoTags(context.Background(), projectName, strings.Split(image, "/")[2])

	c.Success(tag)
}

// @router / [get]
func (c *HarborImageController) List() {
	// create harbor client
	namespaceId := c.Ctx.Input.Param(":namespaceId")
	var namespace *models.Namespace
	nid, err := strconv.ParseInt(namespaceId, 10, 64)
	if err != nil {
		log.Error("strcov err for namespaceID")
	}
	namespace, err = models.NamespaceModel.GetById(nid)

	harbors, err := models.HarborModel.GetHaborByNS(namespace.KubeNamespace)
	repositorieslist := make([]*models.Repository, 0)
	for _, harbor := range harbors {
		cli, err := c.HarborClient(harbor.Url, harbor.User, harbor.Passwd)
		if err != nil {
			logs.Error("获取harbor客户端失败")
		}

		/*// list project
		ps, err := cli.ListProjects(context.Background(), nil)
		if err != nil {
			panic(err)
		}

		// dump projects
		for _, p := range ps {
			fmt.Printf("%+v\n", p)
		}*/

		// list repo
		_, repo, err := cli.ListReposByProjectName(context.Background(), harbor.Project)
		if err != nil {
			logs.Error(err)
			c.AbortInternalServerError("获取harbor镜像失败")
		}

		repositories := copyRepo(repo, cli, harbor.Url)
		repositorieslist = append(repositorieslist, repositories...)
	}

	c.Success(repositorieslist)
}

// copy Repo to self-struct
func copyRepo(repos []*harborModle.Repo, cli *harbor.Client, host string) []*models.Repository {
	repositories := make([]*models.Repository, 0)
	for _, v := range repos {
		/*tag, err := cli.ListRepoTags(context.Background(), projectName, strings.Split(v.Name,"/")[1])
		if err != nil {
			panic(err)
		}*/
		//for i := 0; i < int(v.TagsCount); i++ {
		repositories = append(repositories, &models.Repository{
			ID:          v.ID,
			Name:        strings.Split(host, "//")[1] + "/" + v.Name, /*+ ":" + tag[i].Name*/
			ProjectID:   v.ProjectID,
			Description: v.Description,
			PullCount:   v.PullCount,
			StarCount:   v.StarCount,
			TagsCount:   v.TagsCount,
			//Tags:         tag[i].Name,
			CreationTime: v.CreationTime,
			UpdateTime:   v.UpdateTime,
		})
		//}

	}
	return repositories
}
