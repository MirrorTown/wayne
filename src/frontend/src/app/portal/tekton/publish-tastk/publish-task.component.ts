import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { forkJoin } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { Deployment } from '../../../shared/model/v1/deployment';
import { ClusterMeta } from '../../../shared/model/v1/cluster';
import { DeploymentStatus, DeploymentTpl } from '../../../shared/model/v1/deploymenttpl';
import { KubeDeployment } from '../../../shared/model/v1/kubernetes/deployment';
import { combineLatest } from 'rxjs';
import { CacheService } from '../../../shared/auth/cache.service';
import { defaultResources, ResourcesActionType } from '../../../shared/shared.const';
import { PublishStatusService } from '../../../shared/client/v1/publishstatus.service';
import { ActivatedRoute } from '@angular/router';
import { PageState } from '../../../shared/page/page-state';
import { DeploymentService } from '../../../shared/client/v1/deployment.service';
import { AuthService } from '../../../shared/auth/auth.service';
import {Tekton} from "../../../shared/model/v1/tekton";
import {TektonStatus, TektonTask} from "../../../shared/model/v1/tektontask";
import {TektonTaskService} from "../../../shared/client/v1/tektontask.service";
import {state} from "@angular/animations";

@Component({
  selector: 'publish-task',
  templateUrl: 'publish-task.component.html',
  styleUrls: ['publish-task.scss']
})
export class PublishTaskComponent implements OnInit {
  @Output() published = new EventEmitter<boolean>();
  @Input() originActive: number;
  inflow: boolean;
  modalOpened = false;
  publishForm: NgForm;
  @ViewChild('publishForm', { static: true })
  currentForm: NgForm;

  tekton: Tekton;
  tektonTask: TektonTask;
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
  lastStr: string;
  delaytimer: any;

  constructor(private messageHandlerService: MessageHandlerService,
              public cacheService: CacheService,
              private deploymentService: DeploymentService,
              private tektonTaskService: TektonTaskService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private publishStatusService: PublishStatusService) {
  }

  get appId(): number {
    return parseInt(this.route.parent.snapshot.params['id'], 10);
  }

  clusterValidation(cluster: string): boolean {
    const clusterMeta = this.clusterMetas[cluster];
    if (this.tekton && this.tekton.metaData && clusterMeta) {
      return clusterMeta.checked
    }
    return false;
  }

  getValue(offline: string) {
    this.offlineProd = false;
    this.offlineProd = false;
    if (offline === this.forceOfflineGray) {
      this.offlineProd = false;
      this.offlineGray = true;
    } else if (offline === this.forceOfflineProd) {
      this.offlineGray = false;
      this.offlineProd = true;
    }
  }

  get replicaLimit(): number {
    let replicaLimit = defaultResources.replicaLimit;
    if (this.tekton && this.tekton.metaData) {
      const metaData = JSON.parse(this.tekton.metaData);
      if (metaData.resources &&
        metaData.resources.replicaLimit) {
        replicaLimit = parseInt(metaData.resources.replicaLimit, 10);
      }
    }
    return replicaLimit;
  }

  newPublishTask(tekton: Tekton, tektonTask: TektonTask, actionType: ResourcesActionType) {
    this.inflow = false;
    //上次发布结束才可以继续发布本次发布
    if (this.originActive < 0 || this.originActive === 3) {
      this.inflow = true;
    }
    this.clusters = this.getClusters(tekton);
    console.log(actionType)
    this.actionType = actionType;
    this.forceOffline = false;
    this.modalOpened = true;
    this.tekton = tekton;
    this.setTitle(actionType);
    this.tektonTask = tektonTask;
    this.clusterMetas = {};
    this.clusters.forEach(cluster => {
      const clusterMeta = new ClusterMeta(false);
      clusterMeta.value = 1;
      // @ts-ignore
      this.clusterMetas[cluster] = clusterMeta;
    });
  }

  setTitle(actionType: ResourcesActionType) {
    switch (actionType) {
      case ResourcesActionType.PUBLISH:
        this.title = '发布部署[' + this.tekton.name + ']';
        break;
      case ResourcesActionType.RESTART:
        this.title = '重启部署[' + this.tekton.name + ']';
        break;
      case ResourcesActionType.OFFLINE:
        this.title = '下线部署[' + this.tekton.name + ']';
        break;
    }
  }

  getStatusByCluster(status: TektonStatus[], cluster: string): TektonStatus {
    if (status && status.length > 0) {
      for (const state of status) {
        if (state.cluster === cluster) {
          return state;
        }
      }
    }
    return null;
  }

  getClusters(tekton: Tekton): [] {
    const clusters = JSON.parse(tekton.metaData)['clusters'];
    if (!clusters) {
      this.messageHandlerService.showWarning('部署Tekton集群未配置，请先到编辑部署配置！');
      return null;
    }
    return clusters;
  }

  getRepotagDelay(h: any): void {
    this.lastStr = h.containerImage;
    clearTimeout(this.delaytimer);
    // @ts-ignore
    this.delaytimer = setTimeout((hdx) => {
      if (h.containerImage === this.lastStr) {
        this.getRepoTag(h);
      }
    }, 800);
  }

  getRepoTag(h: any): void {
    // const value = document.getElementById('images').value;
    this.taglist = [];
    var imageCrList = [];
    const observables = Array(
      this.deploymentService.listTags(h.containerImage)
    );
     combineLatest(observables).subscribe(value => {
       if (value[0] != null) {
         for (const tag of value[0].data) {
           this.taglist.push({Name: tag.name});
         }
       }
       /*if (value[1] != null) {
         for (const tag of value[1].data) {
           if (tag.tag != null) {
             this.taglist.push({Name: tag.tag});
           }
         }
       }*/
    });

    this.deploymentService.listAliyunCrTags(h.containerImage).subscribe( value => {
      if (value != null) {
        for (const tag of value.data) {
          if (tag.tag != null) {
            this.taglist.push({Name: tag.tag});
          }
        }
      }
    });
  }

  unique (arr) {
    return Array.from(new Set(arr))
  }

  ngOnInit(): void {
    const namespaceId = this.cacheService.namespaceId;
    /*const observables = Array(
      this.deploymentService.listImages(new PageState({pageSize: 1000}), namespaceId)
    );
    combineLatest(observables).subscribe(value => {
      if (value[0] != null) {
        for (const image of value[0].data) {
          this.imagelist.push({Name: image['name']});
        }
      }
      /!*if (value[1] != null) {
        for (const image of value[1].data) {
          this.imagelist.push({Name: image.repoDomainList["vpc"] + "/" + image["repoNamespace"] + "/" + image['repoName']});
        }
      }*!/
    });*/

    /*this.deploymentService.listAliyunCrImages(0, this.cacheService.namespaceId).subscribe(value => {
      for (const image of value.data) {
        this.imagelist.push({Name: image.repoDomainList["vpc"] + "/" + image["repoNamespace"] + "/" + image['repoName']});
      }
    },
      error => console.log("Have no aliyun cr found")
    );*/
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
      console.log('下线Tekton task');
      Object.getOwnPropertyNames(this.clusterMetas).map(cluster => {
        if (this.clusterMetas[cluster].checked) {
          const state = this.getStatusByCluster(this.tektonTask.status, cluster);
          console.log(state)
          this.tektonTaskService.deleteByName(this.appId, cluster, this.tektonTask.name).subscribe(
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
    const namespaceId = this.cacheService.namespaceId;
    const observables = Array();
    const observablesGray = Array();
    console.log(this.clusterMetas)
    Object.getOwnPropertyNames(this.clusterMetas).forEach(cluster => {
      if (this.clusterMetas[cluster].checked) {
        const kubeDeployment: KubeDeployment = JSON.parse(this.tektonTask.template);
        console.log(kubeDeployment)
        if (this.actionType === ResourcesActionType.RESTART) {
          kubeDeployment.spec.template.metadata.labels['timestamp'] = new Date().getTime().toString();
        }
        kubeDeployment.metadata.namespace = this.cacheService.kubeNamespace;
        console.log(kubeDeployment)
        observables.push(this.tektonTaskService.deploy(
          this.appId,
          cluster,
          this.tekton.id,
          this.tektonTask.id,
          kubeDeployment));
      }
    });
    forkJoin(observables).subscribe(
      response => {
        this.published.emit(true);
        this.messageHandlerService.showSuccess('已进入发布队列，请关注发布结果！');
      },
      error => {
        this.published.emit(true);
        this.messageHandlerService.handleError(error);
      }
    );

    forkJoin(observablesGray).subscribe(
      response => {
        this.published.emit(true);
        this.messageHandlerService.showSuccess('已进入发布列表，请找负责人审核！');
      },
      error => {
        this.published.emit(true);
        this.messageHandlerService.handleError(error);
      }
    );
  }


  isClusterValid(): boolean {
    if (this.clusters) {
      for (const clu of this.clusters) {
        if (this.clusterValidation(clu)) {
          return true;
        }
      }
    }
    return false;
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing &&
      this.isClusterValid();
  }

  getImagePrefixReg() {
    const imagePrefix = this.authService.config['system.image-prefix'];
    return imagePrefix;
  }
}

