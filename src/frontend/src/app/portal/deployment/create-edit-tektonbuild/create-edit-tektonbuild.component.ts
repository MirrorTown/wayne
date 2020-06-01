import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { DOCUMENT, Location } from '@angular/common';
import { FormBuilder, NgForm } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import {
  ConfigMapEnvSource,
  ConfigMapKeySelector, ConfigMapVolumeSource,
  Container,
  DeploymentStrategy,
  EnvFromSource,
  EnvVar,
  EnvVarSource,
  ExecAction,
  Handler, HostPathVolumeSource,
  HTTPGetAction, KeyToPath,
  KubeDeployment,
  Lifecycle,
  ObjectMeta,
  Probe,
  ResourceRequirements,
  RollingUpdateDeployment,
  SecretEnvSource,
  SecretKeySelector, SecretVolumeSource,
  TCPSocketAction, Volume,
} from '../../../shared/model/v1/kubernetes/deployment';
import 'rxjs/add/observable/combineLatest';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { TektonBuild, Param } from '../../../shared/model/v1/tektonBuild';
import { App } from '../../../shared/model/v1/app';
import { Deployment } from '../../../shared/model/v1/deployment';
import { TektonBuildService } from '../../../shared/client/v1/tektonBuild.service';
import { PipelineService } from '../../../shared/client/v1/pipeline.service'
import { DeploymentService } from '../../../shared/client/v1/deployment.service';
import { AppService } from '../../../shared/client/v1/app.service';
import { ActionType, appLabelKey, defaultResources, namespaceLabelKey } from '../../../shared/shared.const';
import { ResourceUnitConvertor } from '../../../shared/utils';
import { CacheService } from '../../../shared/auth/cache.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { AceEditorService } from '../../../shared/ace-editor/ace-editor.service';
import { AceEditorMsg } from '../../../shared/ace-editor/ace-editor';
import { defaultDeployment } from '../../../shared/default-models/deployment.const';
import { containerDom, ContainerTpl, templateDom } from '../../../shared/base/container/container-tpl';
import { PageState } from '../../../shared/page/page-state';



@Component({
  selector: 'create-edit-tektonbuild',
  templateUrl: 'create-edit-tektonbuild.component.html',
  styleUrls: ['create-edit-tektonbuild.scss']
})

export class CreateTektonBuildComponent extends ContainerTpl implements OnInit, AfterViewInit, OnDestroy {
  ngForm: NgForm;
  @ViewChild('ngForm', { static: true })
  currentForm: NgForm;

  buildResource: any = {};
  checked: boolean;
  pipelineList: any[] = Array();

  actionType: ActionType;
  tektonBuild: TektonBuild = new TektonBuild();
  isSubmitOnGoing = false;
  app: App;
  deployment: Deployment;

  top: number;
  box: HTMLElement;
  eventList: any[] = Array();

  imagelist = [];
  tag = '';
  taglist = [];

  constructor(private tektonBuildService: TektonBuildService,
              private pipelineService: PipelineService,
              private aceEditorService: AceEditorService,
              private fb: FormBuilder,
              private router: Router,
              private location: Location,
              private deploymentService: DeploymentService,
              private appService: AppService,
              public authService: AuthService,
              public cacheService: CacheService,
              private route: ActivatedRoute,
              // private harborService: HarborService,
              private messageHandlerService: MessageHandlerService,
              @Inject(DOCUMENT) private document: any,
              private eventManager: EventManager) {
    super(templateDom, containerDom);
  }

  ngAfterViewInit() {
    this.box = this.document.querySelector('.content-area');
    this.box.style.paddingBottom = '60px';
    this.eventList.push(
      this.eventManager.addEventListener(this.box, 'scroll', this.scrollEvent.bind(this, true)),
      this.eventManager.addGlobalEventListener('window', 'resize', this.scrollEvent.bind(this, false))
    );
    this.scrollEvent(false);
  }

  ngOnDestroy() {
    this.eventList.forEach(item => {
      item();
    });
    this.box.style.paddingBottom = '0.75rem';
  }

  changePipeline() {
    for (let i=0; i < this.pipelineList.length; i++) {
      if (this.pipelineList[i].id == this.tektonBuild.pipelineId) {
        this.buildResource = JSON.parse(this.pipelineList[i].buildResource);
        this.checked = this.buildResource.checked;
      }
    }
  }

  scrollEvent(scroll: boolean, event?) {
    let top = 0;
    if (event && scroll) {
      top = event.target.scrollTop;
      this.top = top + this.box.offsetHeight - 48;
    } else {
      // hack
      setTimeout(() => {
        this.top = this.box.scrollTop + this.box.offsetHeight - 48;
      }, 0);
    }
  }

  defaultBuildParam(): Param {
    const param = new Param();

    return param
  }

  ngOnInit(): void {
    this.checked = false;
    const namespaceId = this.cacheService.namespaceId;
    const appId = parseInt(this.route.parent.snapshot.params['id'], 10);
    const deploymentId = parseInt(this.route.snapshot.params['deploymentId'], 10);
    const tplId = parseInt(this.route.snapshot.params['tplId'], 10);
    const observables = Array(
      this.appService.getById(appId, namespaceId),
      this.deploymentService.getById(deploymentId, appId),
      this.tektonBuildService.getById(deploymentId, appId),
      this.pipelineService.listAll()
    );

    combineLatest(observables).subscribe(
      response => {
        this.app = response[0].data;
        this.deployment = response[1].data;
        const tpl = response[2].data;
        if (tpl != 'No Row Found') {
          this.actionType = ActionType.EDIT;
          this.tektonBuild = tpl;
          this.buildResource = JSON.parse(this.tektonBuild.metaData);

          this.tektonBuild.description = null;
          if (this.tektonBuild.status == "开启审核") {
            this.checked = true;
          }
        } else {
          this.actionType = ActionType.ADD_NEW;
        }
        this.pipelineList = response[3].data;
        this.initNavList();
      },
      error => {
        this.messageHandlerService.handleError(error);
      }
    );
  }

  trackByFn(index, item) {
    return index;
  }


  onAddBuildVariable() {
    if (this.buildResource.params == undefined) {
      this.buildResource.params = new Array<Volume>();
      const gitParam = new Param();
      gitParam.key = "repoURL";
      const branchParam = new Param();
      branchParam.key = "repoRevision";

      this.buildResource.params.push(gitParam);
      this.buildResource.params.push(branchParam);
    }
    this.buildResource.params.push(this.defaultBuildParam());
  }

  onDelBuildVariable(index: number) {
    this.buildResource.params.splice(index,1);
  }

  onSubmit() {
    if (this.isSubmitOnGoing) {
      return;
    }
    this.isSubmitOnGoing = true;
    let newState = JSON.parse(JSON.stringify(this.buildResource));
    // newState = this.generateDeployment(newState);
    this.tektonBuild.deploymentId = this.deployment.id;
    this.tektonBuild.metaData = JSON.stringify(newState);
    if (this.actionType == ActionType.ADD_NEW) {
      this.tektonBuild.id = undefined;
    }
    if (this.checked) {
      this.tektonBuild.status = "开启审核"
    } else {
      this.tektonBuild.status = "关闭审核"
    }
    this.tektonBuild.appId = this.app.id;
    this.tektonBuild.name = this.deployment.name;
    this.tektonBuild.createTime = this.tektonBuild.updateTime = new Date();
    this.tektonBuildService.edit(this.tektonBuild, this.app.id).subscribe(
      status => {
        this.isSubmitOnGoing = false;
        this.messageHandlerService.showSuccess('创建构建模版成功！');
        this.router.navigate([`portal/namespace/${this.cacheService.namespaceId}/app/${this.app.id}/deployment/${this.deployment.id}`]);
      },
      error => {
        this.isSubmitOnGoing = false;
        this.messageHandlerService.handleError(error);

      }
    );

  }

  onCancel() {
    this.currentForm.reset();
    this.location.back();
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing;
  }

  getImagePrefixReg() {
    const imagePrefix = this.authService.config['system.image-prefix'];
    return imagePrefix;
  }

}
