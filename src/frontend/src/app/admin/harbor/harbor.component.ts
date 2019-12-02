import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationMessage } from '../../shared/confirmation-dialog/confirmation-message';
import { ConfirmationButtons, ConfirmationState, ConfirmationTargets } from '../../shared/shared.const';
import { Subscription } from 'rxjs/Subscription';
import { MessageHandlerService } from '../../shared/message-handler/message-handler.service';
import { CreateEditHarborComponent } from './create-edit-harbor/create-edit-harbor.component';
import { ListHarborComponent } from './list-harbor/list-harbor.component';
import { Harbor } from '../../shared/model/v1/harbor';
import { HarborService } from '../../shared/client/v1/harbor.service';
import { PageState } from '../../shared/page/page-state';

@Component({
  selector: 'wayne-harbor',
  templateUrl: './harbor.component.html',
  styleUrls: ['./harbor.component.scss']
})
export class HarborComponent implements OnInit, OnDestroy {
  @ViewChild(ListHarborComponent, { static: false })
  list: ListHarborComponent;
  @ViewChild(CreateEditHarborComponent, { static: false })
  createEdit: CreateEditHarborComponent;

  pageState: PageState = new PageState();
  harbors: Harbor[];

  subscription: Subscription;

  constructor(
    private harborService: HarborService,
    private messageHandlerService: MessageHandlerService,
    private deletionDialogService: ConfirmationDialogService) {
    this.subscription = deletionDialogService.confirmationConfirm$.subscribe(message => {
      if (message &&
        message.state === ConfirmationState.CONFIRMED &&
        message.source === ConfirmationTargets.HARBOR) {
        console.log('enter harbor constructor')
        const name = message.data;
        this.harborService
          .deleteByName(name)
          .subscribe(
            response => {
              this.messageHandlerService.showSuccess('镜像删除成功！');
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
    console.log('enter harbor');
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
    this.harborService.list(this.pageState, 'false')
      .subscribe(
        response => {
          const data = response.data;
          this.pageState.page.totalPage = data.totalPage;
          this.pageState.page.totalCount = data.totalCount;
          this.harbors = data.list;
        },
        error => this.messageHandlerService.handleError(error)
      );
  }

  createHarbor(created: boolean) {
    if (created) {
      this.retrieve();
    }
  }

  openModal(): void {
    this.createEdit.newOrEditHarbor();
  }

  deleteHarbor(harbor: Harbor) {
    const deletionMessage = new ConfirmationMessage(
      '删除镜像确认',
      '你确认删除镜像 ' + harbor.name + ' ？',
      harbor.name,
      ConfirmationTargets.HARBOR,
      ConfirmationButtons.DELETE_CANCEL
    );
    this.deletionDialogService.openComfirmDialog(deletionMessage);
  }

  editHarbor(harbor: Harbor) {
    this.createEdit.newOrEditHarbor(harbor.name);
  }
}
