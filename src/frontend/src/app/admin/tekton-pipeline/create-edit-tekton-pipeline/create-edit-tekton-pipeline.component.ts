import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { ActionType } from '../../../shared/shared.const';
import { Harbor } from '../../../shared/model/v1/harbor';
import { AceEditorBoxComponent } from '../../../shared/ace-editor/ace-editor-box/ace-editor-box.component';
import {PipelineService} from "../../../shared/client/v1/pipeline.service";
import {Pipeline} from "../../../shared/model/v1/pipeline";

@Component({
  selector: 'create-edit-tekton-pipeline',
  templateUrl: 'create-edit-tekton-pipeline.component.html',
  styleUrls: ['create-edit-tekton-pipeline.scss']
})
export class CreateEditTektonPipelineComponent {
  @Output() create = new EventEmitter<boolean>();
  modalOpened: boolean;
  @ViewChild('ngForm', { static: true })
  currentForm: NgForm;

  @ViewChild('metaData', { static: false })
  metaData: AceEditorBoxComponent;

  @ViewChild('Describe', { static: false })
  kubeConfig: AceEditorBoxComponent;
  pipeline: Pipeline = new Pipeline();
  checkOnGoing = false;
  isSubmitOnGoing = false;
  isNameValid = true;
  position = 'right-middle';

  title: string;
  actionType: ActionType;

  constructor(private pipelineService: PipelineService,
              private messageHandlerService: MessageHandlerService) {
  }

  newOrEditHarbor(name?: string) {
    this.modalOpened = true;
    if (name) {
      this.actionType = ActionType.EDIT;
      this.title = '编辑流水线';
      this.pipelineService.getByName(name).subscribe(
        status => {
          this.pipeline = status.data;
          this.initJsonEditor();
        },
        error => {
          this.messageHandlerService.handleError(error);

        });
    } else {
      this.actionType = ActionType.ADD_NEW;
      this.title = '关联流水线';
      this.pipeline = new Pipeline();
      this.initJsonEditor();

    }
  }

  initJsonEditor() {
  }

  onCancel() {
    this.modalOpened = false;
    this.currentForm.reset();
  }

  onSubmit() {
    if (this.isSubmitOnGoing) {
      return;
    }
    this.isSubmitOnGoing = true;

    switch (this.actionType) {
      case ActionType.ADD_NEW:
        this.pipelineService.create(this.pipeline).subscribe(
          status => {
            this.isSubmitOnGoing = false;
            this.create.emit(true);
            this.modalOpened = false;
            this.messageHandlerService.showSuccess('创建镜像成功！');
          },
          error => {
            this.isSubmitOnGoing = false;
            this.modalOpened = false;
            this.messageHandlerService.handleError(error);

          }
        );
        break;
      case ActionType.EDIT:
        this.pipelineService.update(this.pipeline).subscribe(
          status => {
            this.isSubmitOnGoing = false;
            this.create.emit(true);
            this.modalOpened = false;
            this.messageHandlerService.showSuccess('更新镜像成功！');
          },
          error => {
            this.isSubmitOnGoing = false;
            this.modalOpened = false;
            this.messageHandlerService.handleError(error);

          }
        );
        break;
    }
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing &&
      this.isNameValid &&
      !this.checkOnGoing;
  }

  // Handle the form validation
  handleValidation(): void {
    const cont = this.currentForm.controls['app_name'];
    if (cont) {
      this.isNameValid = cont.valid;
    }

  }

}

