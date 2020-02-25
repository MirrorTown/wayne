import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { ConfirmationMessage } from '../../../shared/confirmation-dialog/confirmation-message';
import {
  ConfirmationButtons,
  ConfirmationState,
  ConfirmationTargets,
  KubeResourceDeployment,
  ResourcesActionType,
  TemplateState
} from '../../../shared/shared.const';
import { ConfirmationDialogService } from '../../../shared/confirmation-dialog/confirmation-dialog.service';
import { Subscription } from 'rxjs/Subscription';
import { PublishTaskComponent } from '../publish-tastk/publish-task.component';
import { ListEventComponent } from '../../../shared/list-event/list-event.component';
import { ListPodComponent } from '../../../shared/list-pod/list-pod.component';
import { DeploymentStatus, DeploymentTpl, Event } from '../../../shared/model/v1/deploymenttpl';
import { DeploymentService } from '../../../shared/client/v1/deployment.service';
import { DeploymentTplService } from '../../../shared/client/v1/deploymenttpl.service';
import { TplDetailService } from '../../../shared/tpl-detail/tpl-detail.service';
import { TplDeployLogservice } from '../../../shared/tpl-deploy-log/tpl-deploy-log.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../shared/page/page-state';
import { AceEditorService } from '../../../shared/ace-editor/ace-editor.service';
import { AceEditorMsg } from '../../../shared/ace-editor/ace-editor';
import { TranslateService } from '@ngx-translate/core';
import { DiffService } from '../../../shared/diff/diff.service';
import { WorkstepService } from '../../../shared/client/v1/workstep.service';
import {CacheService} from "../../../shared/auth/cache.service";
import {TektonTask} from "../../../shared/model/v1/tektontask";
import {TektonTaskService} from "../../../shared/client/v1/tektontask.service";
import {TektonService} from "../../../shared/client/v1/tekton.service";

@Component({
  selector: 'list-tekton',
  templateUrl: 'list-tekton.component.html',
  styleUrls: ['list-tekton.scss']
})
export class ListTektonComponent implements OnInit, OnDestroy {
  selected: DeploymentTpl[] = [];
  @Input() showState: object;
  @Input() tektonTasks: TektonTask[];
  @Input() page: Page;
  @Input() active: number;
  @Input() originActive: number;
  @Input() processStatus: string;
  @Input() appId: number;
  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() cloneTpl = new EventEmitter<TektonTask>();
  @Output() createTpl = new EventEmitter<boolean>();

  @ViewChild(ListPodComponent, { static: false })
  listPodComponent: ListPodComponent;
  @ViewChild(ListEventComponent, { static: false })
  listEventComponent: ListEventComponent;
  @ViewChild(PublishTaskComponent, { static: false })
  publishTektonTask: PublishTaskComponent;
  state: ClrDatagridStateInterface;
  currentPage = 1;

  subscription: Subscription;

  constructor(private tektonService: TektonService,
              private deletionDialogService: ConfirmationDialogService,
              private tektonTaskService: TektonTaskService,
              private route: ActivatedRoute,
              private aceEditorService: AceEditorService,
              private router: Router,
              public authService: AuthService,
              private tplDetailService: TplDetailService,
              private tplDeployLogservice: TplDeployLogservice,
              private translate: TranslateService,
              private diffService: DiffService,
              private messageHandlerService: MessageHandlerService) {
    this.subscription = deletionDialogService.confirmationConfirm$.subscribe(message => {
      if (message &&
        message.state === ConfirmationState.CONFIRMED &&
        message.source === ConfirmationTargets.TEKTON_TASK) {
        const tplId = message.data;
        this.tektonTaskService.deleteById(tplId, this.appId)
          .subscribe(
            response => {
              this.messageHandlerService.showSuccess('部署模版删除成功！');
              this.refresh();
            },
            error => {
              this.messageHandlerService.handleError(error);
            }
          );
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * diff template
   */
  diffTpl() {
    this.diffService.diff(this.selected);
  }

  // --------------------------------

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    this.paginate.emit(this.state);
  }

  refresh(state?: ClrDatagridStateInterface) {
    this.state = state;
    this.paginate.emit(this.state);
  }

  cloneTektonTask(tektonTask: TektonTask) {
    this.cloneTpl.emit(tektonTask);
  }

  deleteTektonTask(tektonTask: TektonTask): void {
    const deletionMessage = new ConfirmationMessage(
      '删除部署模版确认',
      `你确认删除部署模版${tektonTask.name}？`,
      tektonTask.id,
      ConfirmationTargets.TEKTON_TASK,
      ConfirmationButtons.DELETE_CANCEL
    );
    this.deletionDialogService.openComfirmDialog(deletionMessage);
  }

  tektonTaskDetail(tektonTask: TektonTask): void {
    this.aceEditorService.announceMessage(AceEditorMsg.Instance(JSON.parse(tektonTask.template), false));
  }

  tplDetail(tpl: TektonTask) {
    this.tplDetailService.openModal(tpl.description);
  }

  logDeployment(tpl: DeploymentTpl) {
    console.log(tpl);
    this.tplDeployLogservice.openModal(tpl.name, tpl.name + " 发布日志");
  }

  activeStepOne(success: boolean) {
    console.log(success);
    if (success) {
      this.active = 1;
      this.processStatus = 'process';
    }
  }

  versionDetail(version: string) {
    this.tplDetailService.openModal(version, '版本');
  }

  publishTask(tektonTask: TektonTask) {
    this.tektonService.getById(tektonTask.tektonParamId, this.appId).subscribe(
      status => {
        const tekton = status.data;
        this.publishTektonTask.newPublishTask(tekton, tektonTask, ResourcesActionType.PUBLISH);
      },
      error => {
        this.messageHandlerService.handleError(error);
      });
  }

  offlineDeployment(tpl: TektonTask) {
    this.tektonService.getById(tpl.tektonParamId, this.appId).subscribe(
      status => {
        const tekton = status.data;
        this.publishTektonTask.newPublishTask(tekton, tpl, ResourcesActionType.OFFLINE);
      },
      error => {
        this.messageHandlerService.handleError(error);
      });
  }

  published(success: boolean) {
    if (success) {
      this.activeStepOne(success);
      this.refresh();
    }
  }

  listEvent(warnings: Event[]) {
    if (warnings) {
      this.listEventComponent.openModal(warnings);
    }
  }

  listPod(status: DeploymentStatus, tpl: DeploymentTpl) {
    if (status.cluster && status.state !== TemplateState.NOT_FOUND) {
      this.listPodComponent.openModal(status.cluster, tpl.name, KubeResourceDeployment);
    }
  }

}
