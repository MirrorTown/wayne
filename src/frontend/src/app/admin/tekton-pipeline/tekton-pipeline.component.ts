import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationMessage } from '../../shared/confirmation-dialog/confirmation-message';
import { ConfirmationButtons, ConfirmationState, ConfirmationTargets } from '../../shared/shared.const';
import { Subscription } from 'rxjs/Subscription';
import { MessageHandlerService } from '../../shared/message-handler/message-handler.service';
import { CreateEditTektonPipelineComponent } from './create-edit-tekton-pipeline/create-edit-tekton-pipeline.component';
import { ListTektonPipelineComponent } from './list-tekton-pipeline/list-tekton-pipeline.component';
import { Harbor } from '../../shared/model/v1/harbor';
import { PipelineService } from '../../shared/client/v1/pipeline.service';
import { PageState } from '../../shared/page/page-state';
import {Pipeline} from "../../shared/model/v1/pipeline";

@Component({
  selector: 'tekton-pipeline',
  templateUrl: './tekton-pipeline.component.html',
  styleUrls: ['./tekton-pipeline.component.scss']
})
export class TektonPipelineComponent implements OnInit, OnDestroy {
  @ViewChild(ListTektonPipelineComponent, { static: false })
  list: ListTektonPipelineComponent;
  @ViewChild(CreateEditTektonPipelineComponent, { static: false })
  createEdit: CreateEditTektonPipelineComponent;

  pageState: PageState = new PageState();
  pipelines: Pipeline[];

  subscription: Subscription;

  constructor(
    private pipelineService: PipelineService,
    private messageHandlerService: MessageHandlerService,
    private deletionDialogService: ConfirmationDialogService) {
    this.subscription = deletionDialogService.confirmationConfirm$.subscribe(message => {
      if (message &&
        message.state === ConfirmationState.CONFIRMED &&
        message.source === ConfirmationTargets.PIPELINE) {
        console.log('enter PIPELINE constructor')
        const name = message.data;
        this.pipelineService
          .deleteByName(name)
          .subscribe(
            response => {
              this.messageHandlerService.showSuccess('流水线删除成功！');
              this.retrieve();
            },
            error => {
              this.messageHandlerService.handleError(error);
            }
          );
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  retrieve(state?: ClrDatagridStateInterface): void {
    if (state) {
      this.pageState = PageState.fromState(state, {totalPage: this.pageState.page.totalPage, totalCount: this.pageState.page.totalCount});
    }
    this.pipelineService.list(this.pageState, 'false')
      .subscribe(
        response => {
          const data = response.data;
          this.pageState.page.totalPage = data.totalPage;
          this.pageState.page.totalCount = data.totalCount;
          this.pipelines = data.list;
        },
        error => this.messageHandlerService.handleError(error)
      );
  }

  createPipeline(created: boolean) {
    if (created) {
      this.retrieve();
    }
  }

  openModal(): void {
    this.createEdit.newOrEditPipeline();
  }

  deletePipeline(pipeline: Pipeline) {
    const deletionMessage = new ConfirmationMessage(
      '删除Pipeline确认',
      '你确认删除Pipeline ' + pipeline.name + ' ？',
      pipeline.name,
      ConfirmationTargets.PIPELINE,
      ConfirmationButtons.DELETE_CANCEL
    );
    this.deletionDialogService.openComfirmDialog(deletionMessage);
  }

  editPipeline(pipeline: Pipeline) {
    this.createEdit.newOrEditPipeline(pipeline.id);
  }
}
