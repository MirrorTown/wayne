import { Component, Inject, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import { PageState } from '../page/page-state';
import {TektonBuild} from "../model/v1/tektonBuild";

@Component({
  selector: 'list-related-app',
  templateUrl: 'list-related-app.component.html',
  styleUrls: ['list-related-app.scss']
})

export class ListRelatedAppComponent implements OnDestroy {
  checkOnGoing = false;
  isSubmitOnGoing = false;
  modalOpened: boolean;
  whetherHotReflash = true;
  tektonBuilds: TektonBuild[];
  apps: TektonBuild[];

  pageState: PageState = new PageState();
  currentPage = 1;
  state: ClrDatagridStateInterface;

  subscription: Subscription;

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    this.refresh(this.state);
  }

  constructor(@Inject(DOCUMENT) private document: any,
              public authService: AuthService) {
  }

  ngOnDestroy(): void {
  }

  openModal(tektonBuilds: TektonBuild[]) {
    this.tektonBuilds = tektonBuilds;
    this.apps = tektonBuilds;
    this.currentPage = 1;
    this.modalOpened = true;
    this.whetherHotReflash = true;
    this.refresh();
  }

  closeModal() {
    this.modalOpened = false;
  }

  refresh(state?: ClrDatagridStateInterface) {
    if (state) {
      this.state = state;
      this.pageState = PageState.fromState(state, {totalPage: this.pageState.page.totalPage, totalCount: this.pageState.page.totalCount});
    }
    if (this.apps) {
      const start = (this.pageState.page.pageNo - 1) * this.pageState.page.pageSize;
      this.tektonBuilds = this.apps.slice(start , start + this.pageState.page.pageSize)
      this.pageState.page.totalPage = this.apps.length / this.state.page.size;
      this.pageState.page.totalCount = this.apps.length;
    }
  }
}


