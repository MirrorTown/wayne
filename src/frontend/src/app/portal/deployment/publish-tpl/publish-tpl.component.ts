import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {forkJoin} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {NgForm} from '@angular/forms';
import {MessageHandlerService} from '../../../shared/message-handler/message-handler.service';
import {Deployment} from '../../../shared/model/v1/deployment';
import {ClusterMeta} from '../../../shared/model/v1/cluster';
import {DeploymentStatus, DeploymentTpl} from '../../../shared/model/v1/deploymenttpl';
import {KubeDeployment} from '../../../shared/model/v1/kubernetes/deployment';
import {CacheService} from '../../../shared/auth/cache.service';
import {defaultResources, ResourcesActionType} from '../../../shared/shared.const';
import {PublishStatusService} from '../../../shared/client/v1/publishstatus.service';
import {DeploymentClient} from '../../../shared/client/v1/kubernetes/deployment';
import {ActivatedRoute} from '@angular/router';
import {PageState} from '../../../shared/page/page-state';
import {DeploymentService} from '../../../shared/client/v1/deployment.service';
import {AuthService} from '../../../shared/auth/auth.service';

@Component({
  selector: 'publish-tpl',
  templateUrl: 'publish-tpl.component.html',
  styleUrls: ['publish-tpl.scss']
})
export class PublishDeploymentTplComponent implements OnInit {
  @Output() published = new EventEmitter<boolean>();
  modalOpened = false;
  publishForm: NgForm;
  @ViewChild('publishForm', { static: true })
  currentForm: NgForm;

  deployment: Deployment;
  deploymentTpl: DeploymentTpl;
  clusterMetas = {};
  clusters = Array<string>();
  isSubmitOnGoing = false;
  title: string;
  forceOffline = false;
  forceOfflineGray = 'offlineGray';
  forceOfflineProd = 'offlineProd';
  offlineGray = false;
  offlineProd = false;
  actionType: ResourcesActionType;

  imagelist = [];
  containerImage = '';
  taglist = [];
  tag = '';

  constructor(private messageHandlerService: MessageHandlerService,
              public cacheService: CacheService,
              private deploymentService: DeploymentService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private publishStatusService: PublishStatusService,
              private deploymentClient: DeploymentClient) {
  }

  get appId(): number {
    return parseInt(this.route.parent.snapshot.params['id'], 10);
  }

  replicaValidation(cluster: string): boolean {
    const clusterMeta = this.clusterMetas[cluster];
    if (this.deployment && this.deployment.metaData && clusterMeta) {
      if (!clusterMeta.checked) {
        return true;
      }
      return parseInt(clusterMeta.value, 10) <= this.replicaLimit;
    }
    return false;
  }

  getValue(offline: string) {
    this.offlineProd = false;
    this.offlineProd = false;
    if (offline === this.forceOfflineGray) {
      this.offlineGray = true;
    } else if (offline === this.forceOfflineProd) {
      this.offlineProd = true;
    }
  }

  get replicaLimit(): number {
    let replicaLimit = defaultResources.replicaLimit;
    if (this.deployment && this.deployment.metaData) {
      const metaData = JSON.parse(this.deployment.metaData);
      if (metaData.resources &&
        metaData.resources.replicaLimit) {
        replicaLimit = parseInt(metaData.resources.replicaLimit, 10);
      }
    }
    return replicaLimit;
  }

  newPublishTpl(deployment: Deployment, deploymentTpl: DeploymentTpl, actionType: ResourcesActionType) {
    const replicas = this.getReplicas(deployment);
    this.actionType = actionType;
    this.forceOffline = false;
    if (replicas != null) {
      this.modalOpened = true;
      this.deployment = deployment;
      this.setTitle(actionType);
      this.deploymentTpl = deploymentTpl;
      this.clusters = Array<string>();
      this.clusterMetas = {};
      if (actionType === ResourcesActionType.OFFLINE || actionType === ResourcesActionType.RESTART) {
        deploymentTpl.status.map(state => {
          const clusterMeta = new ClusterMeta(false);
          clusterMeta.value = replicas[state.cluster];
          this.clusterMetas[state.cluster] = clusterMeta;
          this.clusters.push(state.cluster);
        });
      } else {
        Object.getOwnPropertyNames(replicas).map(key => {
          // tslint:disable-next-line:max-line-length
          if (actionType === ResourcesActionType.GRAYPUBLISH && this.cacheService.namespace.metaDataObj && this.cacheService.namespace.metaDataObj.clusterMeta[key]) {
            // 后端配置的集群才会显示出来
            const clusterMeta = new ClusterMeta(false);
            clusterMeta.value = replicas[key];
            this.clusterMetas[key] = clusterMeta;
            this.clusters.push(key);
          } else if ((actionType === ResourcesActionType.PUBLISH || this.getStatusByCluster(deploymentTpl.status, key) != null)
            && this.cacheService.namespace.metaDataObj && this.cacheService.namespace.metaDataObj.clusterMeta[key]) {
            // 后端配置的集群才会显示出来
            const clusterMeta = new ClusterMeta(false);
            clusterMeta.value = replicas[key];
            this.clusterMetas[key] = clusterMeta;
            this.clusters.push(key);
          }
        });
      }

    }
  }

  setTitle(actionType: ResourcesActionType) {
    switch (actionType) {
      case ResourcesActionType.PUBLISH:
        this.title = '发布部署[' + this.deployment.name + ']';
        break;
      case ResourcesActionType.RESTART:
        this.title = '重启部署[' + this.deployment.name + ']';
        break;
      case ResourcesActionType.OFFLINE:
        this.title = '下线部署[' + this.deployment.name + ']';
        break;
    }
  }

  getStatusByCluster(status: DeploymentStatus[], cluster: string): DeploymentStatus {
    if (status && status.length > 0) {
      for (const state of status) {
        if (state.cluster === cluster) {
          return state;
        }
      }
    }
    return null;
  }

  getReplicas(deployment: Deployment): {} {
    if (!deployment.metaData) {
      this.messageHandlerService.showWarning('部署实例数未配置，请先到编辑部署配置实例数！');
      return null;
    }
    const replicas = JSON.parse(deployment.metaData)['replicas'];
    if (!replicas) {
      this.messageHandlerService.showWarning('部署实例数未配置，请先到编辑部署配置实例数！');
      return null;
    }
    return replicas;
  }

  getRepoTag(h: any): void {
    // const value = document.getElementById('images').value;
    this.taglist = [];
    this.deploymentService.listTags(h.containerImage).subscribe(value => {
      for (const tag of value.data) {
        this.taglist.push({Name: tag.name});
      }
    });
  }

  ngOnInit(): void {
    console.log('enter....')
    const namespaceId = this.cacheService.namespaceId;
    this.deploymentService.listImages(new PageState({pageSize: 1000}), namespaceId).subscribe(value => {
      for (const image of value.data) {
        this.imagelist.push({Name: image['name']});
      }
    });
  }

  onCancel() {
    this.currentForm.reset();
    this.modalOpened = false;
  }

  onSubmit() {
    if (this.isSubmitOnGoing) {
      return;
    }
    this.isSubmitOnGoing = true;

    switch (this.actionType) {
      case ResourcesActionType.PUBLISH:
        this.deploy();
        break;
      case ResourcesActionType.RESTART:
        this.deploy();
        break;
       case ResourcesActionType.GRAYPUBLISH:
         this.deploy();
         break;
      case ResourcesActionType.OFFLINE:
        this.offline();
        break;
    }

    this.isSubmitOnGoing = false;
    this.modalOpened = false;
  }

  offline() {
    if (this.offlineGray) {
      console.log('下线灰度环境');
      Object.getOwnPropertyNames(this.clusterMetas).map(cluster => {
        if (this.clusterMetas[cluster].checked) {
          const state = this.getStatusByCluster(this.deploymentTpl.status, cluster);
          // tslint:disable-next-line:max-line-length
          this.deploymentClient.deleteByName(this.appId, cluster, this.cacheService.kubeNamespace, this.deployment.name + '-grayscale').subscribe(
            response => {
              this.messageHandlerService.showSuccess('下线灰度成功！');
            },
            error => {
              if (this.forceOffline) {
                this.deletePublishStatus(state.id);
              } else {
                this.messageHandlerService.handleError(error);
              }
            }
          );
        }
      });
    } else if (this.offlineGray) {
      console.log('下线正式环境');
      Object.getOwnPropertyNames(this.clusterMetas).map(cluster => {
        if (this.clusterMetas[cluster].checked) {
          const state = this.getStatusByCluster(this.deploymentTpl.status, cluster);
          this.deploymentClient.deleteByName(this.appId, cluster, this.cacheService.kubeNamespace, this.deployment.name).subscribe(
            response => {
              this.deletePublishStatus(state.id);
            },
            error => {
              if (this.forceOffline) {
                this.deletePublishStatus(state.id);
              } else {
                this.messageHandlerService.handleError(error);
              }
            }
          );
        }
      });
    }
  }

  deletePublishStatus(id: number) {
    this.publishStatusService.deleteById(id).subscribe(
      response => {
        this.messageHandlerService.showSuccess('下线成功！');
        this.published.emit(true);
      },
      error => {
        this.messageHandlerService.handleError(error);
      }
    );
  }

  deploy() {
    this.imagelist = [];
    console.log('enter deploy ')
    const namespaceId = this.cacheService.namespaceId;
    this.deploymentService.listImages(new PageState({pageSize: 1000}), namespaceId).subscribe(value => {
      for (const image of value.data) {
        this.imagelist.push({Name: image['name']});
      }
    })
    const observables = Array();
    Object.getOwnPropertyNames(this.clusterMetas).forEach(cluster => {
      if (this.clusterMetas[cluster].checked) {
        const kubeDeployment: KubeDeployment = JSON.parse(this.deploymentTpl.template);
        if (this.actionType === ResourcesActionType.RESTART) {
          kubeDeployment.spec.template.metadata.labels['timestamp'] = new Date().getTime().toString();
        }
        kubeDeployment.metadata.namespace = this.cacheService.kubeNamespace;
        kubeDeployment.spec.replicas = this.clusterMetas[cluster].value;
        // 当前仅支持第一个为业务容器镜像替换
        if (this.actionType === ResourcesActionType.PUBLISH) {
          kubeDeployment.spec.template.spec.containers[0].image = this.containerImage + ':' + this.tag;
        }
        // 灰度发布策略
        if (this.actionType === ResourcesActionType.GRAYPUBLISH) {
          kubeDeployment.spec.replicas = 1;
          observables.push(this.deploymentClient.graydeploy(
            this.appId,
            cluster,
            this.deployment.id,
            this.deploymentTpl.id,
            kubeDeployment));
        } else {
          observables.push(this.deploymentClient.deploy(
            this.appId,
            cluster,
            this.deployment.id,
            this.deploymentTpl.id,
            kubeDeployment));
      }
      }
    });
    forkJoin(observables).subscribe(
      response => {
        this.published.emit(true);
        this.messageHandlerService.showSuccess('发布成功！');
      },
      error => {
        this.published.emit(true);
        this.messageHandlerService.handleError(error);
      }
    );

  }


  isClusterReplicaValid(): boolean {
    if (this.clusters) {
      for (const clu of this.clusters) {
        if (!this.replicaValidation(clu)) {
          return false;
        }
      }
    }
    return true;
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing &&
      (this.offlineGray || this.offlineProd || (this.containerImage && this.tag)) &&
      this.isClusterReplicaValid();
  }

  getImagePrefixReg() {
    const imagePrefix = this.authService.config['system.image-prefix'];
    return imagePrefix;
  }
}

