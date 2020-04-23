import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { forkJoin } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { TektonBuildService } from '../../../shared/client/v1/tektonBuild.service';
import { Deployment } from '../../../shared/model/v1/deployment';
import { DeploymentTpl } from '../../../shared/model/v1/deploymenttpl';
import { CacheService } from '../../../shared/auth/cache.service';
import { ResourcesActionType } from '../../../shared/shared.const';
import { PublishStatusService } from '../../../shared/client/v1/publishstatus.service';
import { DeploymentClient } from '../../../shared/client/v1/kubernetes/deployment';
import { ActivatedRoute } from '@angular/router';
import { DeploymentService } from '../../../shared/client/v1/deployment.service';
import { AuthService } from '../../../shared/auth/auth.service';
import {TektonBuild} from '../../../shared/model/v1/tektonBuild';

@Component({
  selector: 'publish-build',
  templateUrl: 'publish-build.component.html',
  styleUrls: ['publish-build.scss']
})
export class PublishBuildComponent implements OnInit {
  @Output() publishBuild = new EventEmitter<boolean>();
  @Input() buildOriginActive: number;
  inflow: boolean;
  modalOpened = false;
  buildForm: NgForm;
  @ViewChild('buildForm', { static: true })
  currentForm: NgForm;

  deployment: Deployment;
  deploymentTpl: DeploymentTpl;
  clusterMetas = {};
  clusters = Array<string>();
  isSubmitOnGoing = false;
  title: string;
  metaData: any;
  tektonBuild: TektonBuild;
  forceOffline = false;
  actionType: ResourcesActionType;

  imagelist = [];
  containerImage = '';
  taglist = [];
  tag = '';

  constructor(private messageHandlerService: MessageHandlerService,
              public cacheService: CacheService,
              private deploymentService: DeploymentService,
              public authService: AuthService,
              private tektonBuildService: TektonBuildService,
              private route: ActivatedRoute,
              private publishStatusService: PublishStatusService,
              private deploymentClient: DeploymentClient) {
  }

  get appId(): number {
    return parseInt(this.route.parent.snapshot.params['id'], 10);
  }

  newPublishTpl(tektonBuild: TektonBuild, actionType: ResourcesActionType) {
    console.log(this.tektonBuild);
    this.inflow = false;
    //上次发布结束才可以继续发布本次发布
    if (this.buildOriginActive < 0 || this.buildOriginActive === 3) {
      this.inflow = true;
    }
    console.log(this.inflow);
    this.tektonBuild = tektonBuild;
    this.metaData = JSON.parse(tektonBuild.metaData);
    this.actionType = actionType;
    this.modalOpened = true;
    this.setTitle(actionType);

  }

  setTitle(actionType: ResourcesActionType) {
    switch (actionType) {
      case ResourcesActionType.TEKTONBUILD:
        this.title = '容器化构建[' + this.deployment.name + ']';
        break;
    }
  }

  unique (arr) {
    return Array.from(new Set(arr))
  }

  ngOnInit(): void {
    const namespaceId = this.cacheService.namespaceId;

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
      case ResourcesActionType.TEKTONBUILD:
        this.tektonbuild();
        break;
    }

    this.isSubmitOnGoing = false;
    this.modalOpened = false;
  }

  tektonbuild() {
    console.log("start to build")
    const namespaceId = this.cacheService.namespaceId;
    const observables = Array();
    // 灰度发布策略
    if (this.actionType === ResourcesActionType.TEKTONBUILD) {
      this.tektonBuild.metaData = JSON.stringify(this.metaData);
      console.log(this.tektonBuild)
      observables.push(this.tektonBuildService.create(
        this.tektonBuild,
        this.appId
      ));
    }

    forkJoin(observables).subscribe(
      response => {
        this.publishBuild.emit(true);
        this.messageHandlerService.showSuccess('已进入构建队列，请关注构建结果！');
      },
      error => {
        this.publishBuild.emit(true);
        this.messageHandlerService.handleError(error);
      }
    );

  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing;
  }
}

