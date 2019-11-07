import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbService } from '../../shared/client/v1/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ListHostAliasComponent } from './list-hostalias/list-hostalias.component';
import { CreateHostAliasComponent } from './create-hostalias/create-hostalias.component';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationMessage } from '../../shared/confirmation-dialog/confirmation-message';
import { ConfirmationButtons, ConfirmationState, ConfirmationTargets } from '../../shared/shared.const';
import { Subscription } from 'rxjs/Subscription';
import { MessageHandlerService } from '../../shared/message-handler/message-handler.service';
import { HostAlias } from '../../shared/model/v1/hostalias';
import { HostAliasService } from '../../shared/client/v1/hostAlias.service';
import { AuthService } from '../../shared/auth/auth.service';
import { PageState } from '../../shared/page/page-state';
import { CacheService } from '../../shared/auth/cache.service';

const showState = {
  'ip': {hidden: false},
  'host_name': {hidden: false}
};

@Component({
  selector: 'wayne-hostalias',
  templateUrl: './hostalias.component.html',
  styleUrls: ['./hostalias.component.scss']
})
export class HostAliaseComponent implements OnInit, OnDestroy {
  @ViewChild(ListHostAliasComponent, { static: false })
  listHostAlias: ListHostAliasComponent;
  @ViewChild(CreateHostAliasComponent, { static: false })
  createEditHostAlias: CreateHostAliasComponent;

  pageState: PageState = new PageState();
  resourceId: string;
  listType: string;
  changedHostAliass: HostAlias[];
  componentName = 'HostAlias记录';
  showList: any[] = new Array();
  showState: object = showState;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              public authService: AuthService,
              public cacheService: CacheService,
              private hostAliasService: HostAliasService,
              private messageHandlerService: MessageHandlerService,
              private deletionDialogService: ConfirmationDialogService) {
    this.subscription = deletionDialogService.confirmationConfirm$.subscribe(message => {
      if (message &&
        message.state === ConfirmationState.CONFIRMED &&
        message.source === ConfirmationTargets.HOSTALIASE) {
        const hostAlias = message.data;
        console.log(hostAlias);
        this.hostAliasService.deleteById(hostAlias.id)
          .subscribe(
            response => {
              this.messageHandlerService.showSuccess(this.componentName + '删除成功！');
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
    this.listType = 'hostalias';
    this.initShow();
  }

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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  retrieve(state?: ClrDatagridStateInterface): void {
    if (state) {
      this.pageState = PageState.fromState(state, {totalPage: this.pageState.page.totalPage, totalCount: this.pageState.page.totalCount});
    }
    const appId = parseInt(this.route.parent.snapshot.params['id'], 10);
    const namespaceId = this.cacheService.namespaceId;
    this.hostAliasService.list(this.pageState, appId, namespaceId)
      .subscribe(
        response => {
          const data = response.data;
          this.pageState.page.totalPage = data.totalPage;
          this.pageState.page.totalCount = data.totalCount;
          console.log(data);
          this.changedHostAliass = data.list;
        },
        error => this.messageHandlerService.handleError(error)
      );
  }

  createHostAlias(created: boolean) {
    if (created) {
      this.retrieve();
    }
  }

  openModal(): void {
    if (this.listType === 'hostalias') {
      this.createEditHostAlias.newOrEditHostAlias();
    }
  }

  deleteHostAlias(hostalias: HostAlias) {
    const deletionMessage = new ConfirmationMessage(
      '删除' + this.componentName + '确认',
      '你确认删除 ' + this.componentName + ' ？',
      hostalias,
      ConfirmationTargets.HOSTALIASE,
      ConfirmationButtons.DELETE_CANCEL
    );
    this.deletionDialogService.openComfirmDialog(deletionMessage);
  }

  editHostAlias(hostAlias: HostAlias) {
    this.createEditHostAlias.newOrEditHostAlias(hostAlias.id);
  }
}
