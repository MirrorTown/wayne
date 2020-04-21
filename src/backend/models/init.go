package models

import (
	"sync"

	"github.com/astaxie/beego/orm"
)

var (
	globalOrm orm.Ormer
	once      sync.Once

	UserModel                     *userModel
	AppModel                      *appModel
	AppUserModel                  *appUserModel
	AppStarredModel               *appStarredModel
	NamespaceUserModel            *namespaceUserModel
	ClusterModel                  *clusterModel
	HarborModel                   *harborModel
	TektonModel                   *tektonModel
	TektonBuildModel              *tektonBuildModel
	TektonParamModel              *tektonParamModel
	TektonTaskModel               *tektonTaskModel
	HongmaoUserModel              *hongmaoUserModel
	HostAliasModel                *hostAliasModel
	ReviewModel                   *reviewModel
	DeploymentModel               *deploymentModel
	DeploymentTplModel            *deploymentTplModel
	PermissionModel               *permissionModel
	GroupModel                    *groupModel
	NamespaceModel                *namespaceModel
	ConfigMapModel                *configMapModel
	ConfigMapTplModel             *configMapTplModel
	CronjobModel                  *cronjobModel
	CronjobTplModel               *cronjobTplModel
	SecretModel                   *secretModel
	SecretTplModel                *secretTplModel
	PublishStatusModel            *publishStatusModel
	PublishHistoryModel           *publishHistoryModel
	PersistentVolumeClaimModel    *persistentVolumeClaimModel
	PersistentVolumeClaimTplModel *persistentVolumeClaimTplModel
	AuditLogModel                 *auditLogModel
	ApiKeyModel                   *apiKeyModel
	WebHookModel                  *webHookModel
	StatefulsetModel              *statefulsetModel
	StatefulsetTplModel           *statefulsetTplModel
	ConfigModel                   *configModel
	DaemonSetModel                *daemonSetModel
	DaemonSetTplModel             *daemonSetTplModel
	ChargeModel                   *chargeModel
	InvoiceModel                  *invoiceModel
	NotificationModel             *notificationModel
	NotificationLogModel          *notificationLogModel
	IngressModel                  *ingressModel
	IngressTemplateModel          *ingressTemplateModel
	HPAModel                      *hpaModel
	HPATemplateModel              *hpaTemplateModel
	LinkTypeModel                 *linkTypeModel
	CustomLinkModel               *customLinkModel
)

func init() {
	// init orm tables
	orm.RegisterModel(
		new(Tekton),
		new(TektonBuild),
		new(TektonParam),
		new(TektonTask),
		new(Harbor),
		new(HostAlias),
		new(Deploy),
		new(Review),
		new(User),
		new(App),
		new(AppStarred),
		new(AppUser),
		new(NamespaceUser),
		new(Cluster),
		new(Namespace),
		new(Deployment),
		new(DeploymentTemplate),
		new(Service),
		new(ServiceTemplate),
		new(Group),
		new(Permission),
		new(Secret),
		new(SecretTemplate),
		new(ConfigMap),
		new(ConfigMapTemplate),
		new(Cronjob),
		new(CronjobTemplate),
		new(PublishStatus),
		new(PublishHistory),
		new(PersistentVolumeClaim),
		new(PersistentVolumeClaimTemplate),
		new(AuditLog),
		new(APIKey),
		new(WebHook),
		new(Statefulset),
		new(StatefulsetTemplate),
		new(Config),
		new(DaemonSet),
		new(DaemonSetTemplate),
		new(Charge),
		new(Invoice),
		new(Notification),
		new(NotificationLog),
		new(Ingress),
		new(IngressTemplate),
		new(HPA),
		new(HPATemplate),
		new(LinkType),
		new(CustomLink))

	// init models
	HarborModel = &harborModel{}
	TektonModel = &tektonModel{}
	TektonBuildModel = &tektonBuildModel{}
	TektonParamModel = &tektonParamModel{}
	TektonTaskModel = &tektonTaskModel{}
	UserModel = &userModel{}
	AppModel = &appModel{}
	AppUserModel = &appUserModel{}
	AppStarredModel = &appStarredModel{}
	NamespaceUserModel = &namespaceUserModel{}
	ClusterModel = &clusterModel{}
	NamespaceModel = &namespaceModel{}
	DeploymentModel = &deploymentModel{}
	HostAliasModel = &hostAliasModel{}
	DeploymentTplModel = &deploymentTplModel{}
	GroupModel = &groupModel{}
	SecretModel = &secretModel{}
	SecretTplModel = &secretTplModel{}
	ConfigMapModel = &configMapModel{}
	ConfigMapTplModel = &configMapTplModel{}
	CronjobModel = &cronjobModel{}
	CronjobTplModel = &cronjobTplModel{}
	PublishStatusModel = &publishStatusModel{}
	PublishHistoryModel = &publishHistoryModel{}
	PersistentVolumeClaimModel = &persistentVolumeClaimModel{}
	PersistentVolumeClaimTplModel = &persistentVolumeClaimTplModel{}
	AuditLogModel = &auditLogModel{}
	ApiKeyModel = &apiKeyModel{}
	WebHookModel = &webHookModel{}
	StatefulsetModel = &statefulsetModel{}
	StatefulsetTplModel = &statefulsetTplModel{}
	ConfigModel = &configModel{}
	DaemonSetModel = &daemonSetModel{}
	DaemonSetTplModel = &daemonSetTplModel{}
	ChargeModel = &chargeModel{}
	InvoiceModel = &invoiceModel{}
	NotificationModel = &notificationModel{}
	NotificationLogModel = &notificationLogModel{}
	IngressModel = &ingressModel{}
	IngressTemplateModel = &ingressTemplateModel{}
	HPAModel = &hpaModel{}
	HPATemplateModel = &hpaTemplateModel{}
	LinkTypeModel = &linkTypeModel{}
	CustomLinkModel = &customLinkModel{}
}

// singleton init ormer ,only use for normal db operation
// if you begin transaction，please use orm.NewOrm()
func Ormer() orm.Ormer {
	once.Do(func() {
		globalOrm = orm.NewOrm()
	})
	return globalOrm
}
