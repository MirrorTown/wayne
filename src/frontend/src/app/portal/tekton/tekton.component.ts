import {AfterContentInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageHandlerService} from '../../shared/message-handler/message-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListTektonComponent} from './list-tekton/list-tekton.component';
import {CreateEditTektonComponent} from './create-edit-tekton/create-edit-tekton.component';
import {ClrDatagridStateInterface} from '@clr/angular';
import {DeploymentClient} from '../../shared/client/v1/kubernetes/deployment';
import {DeploymentStatus, DeploymentTpl} from '../../shared/model/v1/deploymenttpl';
import {App} from '../../shared/model/v1/app';
import {Cluster} from '../../shared/model/v1/cluster';
import {Deployment} from '../../shared/model/v1/deployment';
import {AppService} from '../../shared/client/v1/app.service';
import {ClusterService} from '../../shared/client/v1/cluster.service';
import {KubeDeployment} from '../../shared/model/v1/kubernetes/deployment';
import {CacheService} from '../../shared/auth/cache.service';
import {PublishHistoryService} from '../common/publish-history/publish-history.service';
import {
  ConfirmationButtons,
  ConfirmationState,
  ConfirmationTargets,
  httpStatusCode,
  PublishType,
  TemplateState
} from '../../shared/shared.const';
import {AuthService} from '../../shared/auth/auth.service';
import {PublishService} from '../../shared/client/v1/publish.service';
import {PublishStatus} from '../../shared/model/v1/publish-status';
import {ConfirmationMessage} from '../../shared/confirmation-dialog/confirmation-message';
import {ConfirmationDialogService} from '../../shared/confirmation-dialog/confirmation-dialog.service';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs';
import {PageState} from '../../shared/page/page-state';
import {TabDragService} from '../../shared/client/v1/tab-drag.service';
import {OrderItem} from '../../shared/model/v1/order';
import {TranslateService} from '@ngx-translate/core';
import {WorkstepService} from "../../shared/client/v1/workstep.service";
import {TektonService} from "../../shared/client/v1/tekton.service";
import {TektonTaskService} from "../../shared/client/v1/tektontask.service";
import {TektonTask} from "../../shared/model/v1/tektontask";

const showState = {
  'create_time': {hidden: false},
  'version': {hidden: false},
  'online_cluster': {hidden: false},
  'release_explain': {hidden: false},
  'create_user': {hidden: false},
  'action': {hidden: false}
};

@Component({
  selector: 'wayne-tekton',
  templateUrl: './tekton.component.html',
  styleUrls: ['./tekton.component.scss']
})
export class TektonComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild(ListTektonComponent, { static: false })
  listDeployment: ListTektonComponent;
  @ViewChild(CreateEditTektonComponent, { static: false })
  createEditTekton: CreateEditTektonComponent;

  pageState: PageState = new PageState();
  changedTektonTasks: DeploymentTpl[];
  isOnline = false;
  tektonId: number;
  app: App;
  appId: number;
  clusters: Cluster[];
  tektons: Deployment[];
  private timer: any = null;
  publishStatus: PublishStatus[];
  subscription: Subscription;
  showList: any[] = new Array();
  showState: object = showState;
  tabScription: Subscription;
  orderCache: Array<OrderItem>;
  leave = false;
  active: number;
  originActive: number;
  processStatus: string;

  constructor(private tektonService: TektonService,
              private publishHistoryService: PublishHistoryService,
              private tektontaskService: TektonTaskService,
              private deploymentClient: DeploymentClient,
              private route: ActivatedRoute,
              public translate: TranslateService,
              private router: Router,
              private publishService: PublishService,
              public cacheService: CacheService,
              public authService: AuthService,
              private cdr: ChangeDetectorRef,
              private workstepService: WorkstepService,
              private appService: AppService,
              private deletionDialogService: ConfirmationDialogService,
              private clusterService: ClusterService,
              private tabDragService: TabDragService,
              private el: ElementRef,
              private messageHandlerService: MessageHandlerService) {
    this.tabScription = this.tabDragService.tabDragOverObservable.subscribe(over => {
      if (over) {
        this.tabChange();
      }
    });
    this.subscription = deletionDialogService.confirmationConfirm$.subscribe(message => {
      if (message &&
        message.state === ConfirmationState.CONFIRMED &&
        message.source === ConfirmationTargets.TEKTON) {
        const tektonId = message.data;
        this.tektonService.deleteById(tektonId, this.appId)
          .subscribe(
            response => {
              this.messageHandlerService.showSuccess('部署删除成功！');
              this.tektonId = null;
              this.initTekton(true);
            },
            error => {
              this.messageHandlerService.handleError(error);
            }
          );
      }
    });
    this.periodSyncStatus();
  }

  ngOnInit() {
    this.initShow();
  }
  /**
   * diff
   */
  diffTpl() {
    this.listDeployment.diffTpl();
  }
  /************************************** */
  initShow() {
    this.showList = [];
    Object.keys(this.showState).forEach(key => {
      if (!this.showState[key].hidden) { this.showList.push(key); }
    });
  }

  confirmEvent() {
    Object.keys(this.showState).forEach(key => {
      if (this.showList.indexOf(key) > -1) {
        this.showState[key] = {hidden: false};
      } else {
        this.showState[key] = {hidden: true};
      }
    });
  }

  cancelEvent() {
    this.initShow();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.leave = true;
    this.subscription.unsubscribe();
    this.tabScription.unsubscribe();
  }

  onlineChange() {
    this.retrieve();
  }

  tabChange() {
    const orderList = [].slice.call(this.el.nativeElement.querySelectorAll('.tabs-item')).map((item, index) => {
      return {
        id: parseInt(item.id, 10),
        order: index
      };
    });
    if (this.orderCache && JSON.stringify(this.orderCache) === JSON.stringify(orderList)) { return; }
    this.tektonService.updateOrder(this.appId, orderList).subscribe(
      response => {
        if (response.data === 'ok!') {
          this.initOrder();
          this.messageHandlerService.showSuccess('排序成功');
        }
      },
      error => {
        this.messageHandlerService.handleError(error);
      }
    );
  }

  syncStatus() {
    if (this.changedTektonTasks && this.changedTektonTasks.length > 0) {
      for (let i = 0; i < this.changedTektonTasks.length; i++) {
        const tpl = this.changedTektonTasks[i];
        if (tpl.status && tpl.status.length > 0) {
          for (let j = 0; j < tpl.status.length; j++) {
            this.changedTektonTasks[i].status[j].state = TemplateState.SUCCESS
            console.log(this.changedTektonTasks)
            /*const status = tpl.status[j];
            // 错误超过俩次时候停止请求
            if (status.errNum > 2)  { continue; }
            this.deploymentClient.getDetail(this.appId, status.cluster, this.cacheService.kubeNamespace, tpl.name).subscribe(
              next => {
                const code = next.statusCode || next.status;
                if (code === httpStatusCode.NoContent) {
                  this.changedTektonTasks[i].status[j].state = TemplateState.NOT_FOUND;
                  return;
                }

                const podInfo = next.data.pods;
                // 防止切换tab tpls数据发生变化导致报错
                if (this.changedTektonTasks &&
                  this.changedTektonTasks[i] &&
                  this.changedTektonTasks[i].status &&
                  this.changedTektonTasks[i].status[j]) {
                  let state = TemplateState.FAILD;
                  if (podInfo.current === podInfo.desired) {
                    state = TemplateState.SUCCESS;
                  }
                  this.changedTektonTasks[i].status[j].errNum = 0;
                  this.changedTektonTasks[i].status[j].state = state;
                  this.changedTektonTasks[i].status[j].current = podInfo.current;
                  this.changedTektonTasks[i].status[j].desired = podInfo.desired;
                  this.changedTektonTasks[i].status[j].warnings = podInfo.warnings;
                }
              },
              error => {
                if (this.changedTektonTasks &&
                  this.changedTektonTasks[i] &&
                  this.changedTektonTasks[i].status &&
                  this.changedTektonTasks[i].status[j]) {
                  this.changedTektonTasks[i].status[j].errNum += 1;
                  this.messageHandlerService.showError(`${status.cluster}请求错误次数 ${this.changedTektonTasks[i].status[j].errNum} 次`);
                  if (this.changedTektonTasks[i].status[j].errNum === 3) {
                    this.messageHandlerService.showError(`${status.cluster}的错误请求已经停止，请联系管理员解决`);
                  }
                }
                console.log(error);
              }
            );*/
          }
        }
      }
    }
  }

  periodSyncStatus() {
    this.timer = setInterval(() => {
      this.syncStatus();
    }, 5000);
  }

  tabClick(id: number) {
    if (id) {
      this.tektonId = id;
      this.navigateUri();
      this.retrieve();
    }
  }

  ngAfterContentInit() {
    this.initTekton();
  }

  initTekton(refreshTpl?: boolean) {
    this.appId = parseInt(this.route.parent.snapshot.params['id'], 10);
    const namespaceId = this.cacheService.namespaceId;
    this.tektonId = parseInt(this.route.snapshot.params['tektonId'], 10);
    combineLatest(
      [this.clusterService.getNames(),
      this.tektonService.list(PageState.fromState({sort: {by: 'id', reverse: false}}, {pageSize: 4000}), 'false', this.appId + '', this.authService.currentAppPermission.project.read + ''),
      this.appService.getById(this.appId, namespaceId)]
    ).subscribe(
      response => {
        this.clusters = response[0].data;
        this.tektons = response[1].data.list.sort((a, b) => a.order - b.order);
        this.initOrder(this.tektons);
        this.app = response[2].data;
        if (refreshTpl) {
          this.retrieve();
        }
        const isRedirectUri = this.redirectUri();
        if (isRedirectUri) {
          this.navigateUri();
        }
        this.cdr.detectChanges();
      },
      error => {
        this.messageHandlerService.handleError(error);
      }
    );
  }

  navigateUri() {
    this.router.navigate([`portal/namespace/${this.cacheService.namespaceId}/app/${this.app.id}/tekton/${this.tektonId}`]);
  }

  redirectUri(): boolean {
    if (this.tektons && this.tektons.length > 0) {
      if (!this.tektonId) {
        this.tektonId = this.tektons[0].id;
        return true;
      }
      for (const deployment of this.tektons) {
        if (this.tektonId === deployment.id) {
          return false;
        }
      }
      this.tektonId = this.tektons[0].id;
      return true;
    } else {
      return false;
    }
  }

  initOrder(tektons?: Deployment[]) {
    if (tektons) {
      this.orderCache = tektons.map(item => {
        return {
          id: item.id,
          order: item.order
        };
      });
    } else {
      this.orderCache = [].slice.call(this.el.nativeElement.querySelectorAll('.tabs-item')).map((item, index) => {
        return {
          id: parseInt(item.id, 10),
          order: index
        };
      });
    }
  }

  getDeploymentId(tektonId: number): number {
    if (this.tektons && this.tektons.length > 0) {
      if (!tektonId) {
        return this.tektons[0].id;
      }
      for (const deployment of this.tektons) {
        if (tektonId === deployment.id) {
          return tektonId;
        }
      }
      return this.tektons[0].id;
    } else {
      return null;
    }
  }

  // 点击创建部署
  createTekton(): void {
    this.createEditTekton.newOrEditResource(this.app, this.filterCluster());
  }

  // 点击编辑部署
  editTekton() {
    this.createEditTekton.newOrEditResource(this.app, this.filterCluster(), this.tektonId);
  }

  filterCluster(): Cluster[] {
    return this.clusters.filter((clusterObj: Cluster) => {
      return this.cacheService.namespace.metaDataObj.clusterMeta &&
        this.cacheService.namespace.metaDataObj.clusterMeta[clusterObj.name];
    });
  }

  publishHistory() {
    this.publishHistoryService.openModal(PublishType.DEPLOYMENT, this.tektonId);
  }

  // 创建部署成功
  create(id: number) {
    if (id) {
      this.tektonId = id;
      this.retrieveDeployments();
      this.navigateUri();
      this.retrieve();
    }
  }

  // 点击创建部署模版
  createTektonTask() {
    this.router.navigate([`portal/namespace/${this.cacheService.namespaceId}/app/${this.app.id}/tekton/${this.tektonId}/task`]);
  }

  // 点击克隆部署模版
  cloneDeploymentTpl(tektonTask: TektonTask) {
    if (tektonTask) {
      this.router.navigate(
        [`portal/namespace/${this.cacheService.namespaceId}/app/${this.app.id}/tekton/${this.tektonId}/task/${tektonTask.id}`]);
    }
  }

  deleteTekton() {
    if (this.publishStatus && this.publishStatus.length > 0) {
      this.messageHandlerService.warning('已上线部署无法删除，请先下线部署！');
    } else {
      const deletionMessage = new ConfirmationMessage(
        '删除Trigger确认',
        '是否确认删除Trigger',
        this.tektonId,
        ConfirmationTargets.TEKTON,
        ConfirmationButtons.DELETE_CANCEL
      );
      this.deletionDialogService.openComfirmDialog(deletionMessage);
    }
  }

  retrieve(state?: ClrDatagridStateInterface): void {
    if (!this.tektonId) {
      return;
    }
    if (state) {
      this.pageState = PageState.fromState(state, {
        totalPage: this.pageState.page.totalPage,
        totalCount: this.pageState.page.totalCount
      });
    }
    this.pageState.params['deleted'] = false;
    this.pageState.params['isOnline'] = this.isOnline;
    combineLatest(
      [this.tektontaskService.listPage(this.pageState, this.appId, this.tektonId.toString()),
      this.publishService.listStatus(PublishType.TEKTON, this.tektonId)]
    ).subscribe(
      response => {
        const status = response[1].data;
        this.publishStatus = status;
        const tpls = response[0].data;
        this.pageState.page.totalPage = tpls.totalPage;
        this.pageState.page.totalCount = tpls.totalCount;
        this.changedTektonTasks = this.buildTplList(tpls.list, status);
        setTimeout(() => {
          if (this.leave) {
            return;
          }
          this.syncStatus();
        });
      },
      error => this.messageHandlerService.handleError(error)
    );
  }

  cancelPublic() {
    const appId = parseInt(this.route.parent.snapshot.params['id'], 10);
    const namespaceId = this.cacheService.namespaceId;
    const tektonId = parseInt(this.route.snapshot.params['tektonId'], 10);
    this.workstepService.updateById(namespaceId, appId, tektonId).subscribe(
      response => {
        console.log(response.data);
      },
      error => this.messageHandlerService.handleError(error)
    )
  }

  buildTplList(deploymentTpls: DeploymentTpl[], status: PublishStatus[]): DeploymentTpl[] {
    if (!deploymentTpls) {
      return deploymentTpls;
    }
    const tplStatusMap = {};
    if (status && status.length > 0) {
      for (const state of status) {
        if (!tplStatusMap[state.templateId]) {
          tplStatusMap[state.templateId] = Array<DeploymentStatus>();
        }
        tplStatusMap[state.templateId].push(DeploymentStatus.fromPublishStatus(state));
      }
    }

    const results = Array<DeploymentTpl>();
    for (const deploymentTpl of deploymentTpls) {
      let kubeDeployment = new KubeDeployment();
      kubeDeployment = JSON.parse(deploymentTpl.template);
      const containers = kubeDeployment.spec.template.spec.containers;
      if (containers.length > 0) {
        const containerVersions = Array<string>();
        for (const con of containers) {
          containerVersions.push(con.image);
        }
        deploymentTpl.containerVersions = containerVersions;

        const publishStatus = tplStatusMap[deploymentTpl.id];
        if (publishStatus && publishStatus.length > 0) {
          deploymentTpl.status = publishStatus;
        }
      }
      results.push(deploymentTpl);
    }
    return results;
  }

  retrieveDeployments() {
    this.tektonService.list(PageState.fromState({
      sort: {
        by: 'id',
        reverse: false
      }
    }, {pageSize: 1000}), 'false', this.appId + '', this.authService.currentAppPermission.project.read + '').subscribe(
      response => {
        this.tektons = response.data.list.sort((a, b) => a.order - b.order);
        this.initOrder(this.tektons);
      },
      error => {
        this.messageHandlerService.handleError(error);
      }
    );
  }


}
