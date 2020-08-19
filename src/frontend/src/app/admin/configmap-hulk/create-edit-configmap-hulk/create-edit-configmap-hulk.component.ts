import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { ActionType } from '../../../shared/shared.const';
import { AceEditorBoxComponent } from '../../../shared/ace-editor/ace-editor-box/ace-editor-box.component';
import {Param} from "../../../shared/model/v1/tektonBuild";
import {ConfigmapHulk} from "../../../shared/model/v1/configmap-hulk";
import {ConfigmapHulkService} from "../../../shared/client/v1/configmapHulk.service";

@Component({
  selector: 'create-edit-configmap-hulk',
  templateUrl: 'create-edit-configmap-hulk.component.html',
  styleUrls: ['create-edit-configmap-hulk.scss']
})
export class CreateEditConfigmapHulkComponent {
  @Output() create = new EventEmitter<boolean>();
  modalOpened: boolean;
  @ViewChild('ngForm', { static: true })
  currentForm: NgForm;

  @ViewChild('metaData', { static: false })
  metaData: AceEditorBoxComponent;

  @ViewChild('Describe', { static: false })
  kubeConfig: AceEditorBoxComponent;
  configmapHulk: ConfigmapHulk = new ConfigmapHulk();
  checkOnGoing = false;
  isSubmitOnGoing = false;
  isNameValid = true;
  position = 'right-middle';
  configResource: any = {};

  title: string;
  actionType: ActionType;

  constructor(private configmapHulkService: ConfigmapHulkService,
              private messageHandlerService: MessageHandlerService) {
  }

  newOrEditConfigmapHulk(id?: number) {
    this.modalOpened = true;
    if (id) {
      this.configResource = {};
      this.actionType = ActionType.EDIT;
      this.title = '编辑ConfigMap';
      this.configmapHulkService.getById(id).subscribe(
        status => {
          console.log(status)
          this.configmapHulk = status.data;
          this.configResource = JSON.parse(this.configmapHulk.configResource);
          this.initJsonEditor();
        },
        error => {
          this.messageHandlerService.handleError(error);

        });
    } else {
      this.actionType = ActionType.ADD_NEW;
      this.title = '添加ConfigMap';
      this.configmapHulk = new ConfigmapHulk();
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
    this.configmapHulk.configResource = JSON.stringify(this.configResource);
    if (this.isSubmitOnGoing) {
      return;
    }
    this.isSubmitOnGoing = true;

    switch (this.actionType) {
      case ActionType.ADD_NEW:
        this.configmapHulkService.create(this.configmapHulk).subscribe(
          status => {
            this.isSubmitOnGoing = false;
            this.create.emit(true);
            this.modalOpened = false;
            this.messageHandlerService.showSuccess('创建ConfigMap成功！');
          },
          error => {
            this.isSubmitOnGoing = false;
            this.modalOpened = false;
            this.messageHandlerService.handleError(error);

          }
        );
        break;
      case ActionType.EDIT:
        this.configmapHulkService.update(this.configmapHulk).subscribe(
          status => {
            this.isSubmitOnGoing = false;
            this.create.emit(true);
            this.modalOpened = false;
            this.messageHandlerService.showSuccess('更新ConfigMap成功！');
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

  defaultBuildParam(): Param {
    const param = new Param();

    return param
  }

  trackByFn(index, item) {
    return index;
  }

  onAddBuildVariable() {
    if (this.configResource.params == undefined) {
      this.configResource.params = new Array();
    }
    this.configResource.params.push(this.defaultBuildParam());
  }

  onDelBuildVariable(index: number) {
    this.configResource.params.splice(index,1);
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

