import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationMessage } from '../../shared/confirmation-dialog/confirmation-message';
import { ConfirmationButtons, ConfirmationState, ConfirmationTargets } from '../../shared/shared.const';
import { Subscription } from 'rxjs/Subscription';
import { MessageHandlerService } from '../../shared/message-handler/message-handler.service';
import { CreateEditConfigmapHulkComponent } from './create-edit-configmap-hulk/create-edit-configmap-hulk.component';
import { ListConfigmapHulkComponent } from './list-configmap-hulk/list-configmap-hulk.component';
import { PageState } from '../../shared/page/page-state';
import {Pipeline} from "../../shared/model/v1/pipeline";
import {ConfigmapHulkService} from "../../shared/client/v1/configmapHulk.service";
import {ConfigmapHulk} from "../../shared/model/v1/configmap-hulk";

@Component({
  selector: 'configmap-hulk',
  templateUrl: './configmap-hulk.component.html',
  styleUrls: ['./configmap-hulk.component.scss']
})
export class ConfigmapHulkComponent implements OnInit, OnDestroy {
  @ViewChild(ListConfigmapHulkComponent, { static: false })
  list: ListConfigmapHulkComponent;
  @ViewChild(CreateEditConfigmapHulkComponent, { static: false })
  createEdit: CreateEditConfigmapHulkComponent;

  pageState: PageState = new PageState();
  configs: ConfigmapHulk[];

  subscription: Subscription;

  constructor(
    private configmapHulkService: ConfigmapHulkService,
    private messageHandlerService: MessageHandlerService,
    private deletionDialogService: ConfirmationDialogService) {
    this.subscription = deletionDialogService.confirmationConfirm$.subscribe(message => {
      if (message &&
        message.state === ConfirmationState.CONFIRMED &&
        message.source === ConfirmationTargets.ConfigmapHulk) {
        console.log('enter ConfigMapHulk constructor')
        const name = message.data;
        this.configmapHulkService
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
    console.log("retrieve")
    if (state) {
      this.pageState = PageState.fromState(state, {totalPage: this.pageState.page.totalPage, totalCount: this.pageState.page.totalCount});
    }
    this.configmapHulkService.list(this.pageState, 'false')
      .subscribe(
        response => {
          const data = response.data;
          this.pageState.page.totalPage = data.totalPage;
          this.pageState.page.totalCount = data.totalCount;
          this.configs = data.list;
        },
        error => this.messageHandlerService.handleError(error)
      );
  }

  createConfigmapHulk(created: boolean) {
    if (created) {
      this.retrieve();
    }
  }

  openModal(): void {
    this.createEdit.newOrEditConfigmapHulk();
  }

  deleteConfigmapHulk(configmapHulk: ConfigmapHulk) {
    const deletionMessage = new ConfirmationMessage(
      '删除ConfigMap配置确认',
      '你确认删除ConfigMap配置 ' + configmapHulk.name + ' ？',
      configmapHulk.name,
      ConfirmationTargets.ConfigmapHulk,
      ConfirmationButtons.DELETE_CANCEL
    );
    this.deletionDialogService.openComfirmDialog(deletionMessage);
  }

  editConfigmapHulk(configmapHulk: ConfigmapHulk) {
    this.createEdit.newOrEditConfigmapHulk(configmapHulk.id);
  }
}
