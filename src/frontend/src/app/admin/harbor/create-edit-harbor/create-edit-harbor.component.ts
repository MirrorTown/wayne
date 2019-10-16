import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { ActionType } from '../../../shared/shared.const';
import { Harbor } from '../../../shared/model/v1/harbor';
import { HarborService } from '../../../shared/client/v1/harbor.service';
import { AceEditorBoxComponent } from '../../../shared/ace-editor/ace-editor-box/ace-editor-box.component';

@Component({
  selector: 'create-edit-harbor',
  templateUrl: 'create-edit-harbor.component.html',
  styleUrls: ['create-edit-harbor.scss']
})
export class CreateEditHarborComponent {
  @Output() create = new EventEmitter<boolean>();
  modalOpened: boolean;
  @ViewChild('ngForm', { static: true })
  currentForm: NgForm;

  @ViewChild('metaData', { static: false })
  metaData: AceEditorBoxComponent;

  @ViewChild('Describe', { static: false })
  kubeConfig: AceEditorBoxComponent;
  harbor: Harbor = new Harbor();
  checkOnGoing = false;
  isSubmitOnGoing = false;
  isNameValid = true;
  position = 'right-middle';

  title: string;
  actionType: ActionType;

  constructor(private harborService: HarborService,
              private messageHandlerService: MessageHandlerService) {
  }

  newOrEditHarbor(name?: string) {
    this.modalOpened = true;
    if (name) {
      this.actionType = ActionType.EDIT;
      this.title = '编辑镜像';
      this.harborService.getByName(name).subscribe(
        status => {
          this.harbor = status.data;
          this.initJsonEditor();
        },
        error => {
          this.messageHandlerService.handleError(error);

        });
    } else {
      this.actionType = ActionType.ADD_NEW;
      this.title = '关联镜像';
      this.harbor = new Harbor();
      this.initJsonEditor();

    }
  }

  initJsonEditor() {
    /*this.metaData.setValue(this.harbor.metaData);
    this.kubeConfig.setValue(this.harbor.kubeConfig);*/
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

    // this.harbor.metaData = this.metaData.getValue();
    // this.harbor.kubeConfig = this.kubeConfig.getValue();

    switch (this.actionType) {
      case ActionType.ADD_NEW:
        this.harborService.create(this.harbor).subscribe(
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
        this.harborService.update(this.harbor).subscribe(
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

