import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subscription } from 'rxjs/Subscription';
import { MessageHandlerService } from '../../shared/message-handler/message-handler.service';
import { CacheService } from '../../shared/auth/cache.service';
import { AuthService } from '../../shared/auth/auth.service';
import { PageState } from '../../shared/page/page-state';
import { ListReviewComponent } from './list-review/list-review.component';
import { Review } from '../../shared/model/v1/review';
import { ReviewService } from '../../shared/client/v1/review.service';

const showState = {
  'name': {hidden: false},
  'announcer': {hidden: false},
  'publish_time': {hidden: false},
  'auditors': {hidden: false},
  'auditors_time': {hidden: false},
  'status': {hidden: false},
  'action': {hidden: false}
};

@Component({
  selector: 'wayne-review.content-container',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  @ViewChild(ListReviewComponent, { static: false })
  listReview: ListReviewComponent;
  changedReviews: Review[];
  pageState: PageState = new PageState();
  showList: any[] = new Array();
  showState: object = showState;
  subscription: Subscription;

  constructor(private reviewService: ReviewService,
              public cacheService: CacheService,
              public authService: AuthService,
              private messageHandlerService: MessageHandlerService) {}

  ngOnInit() {
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
      this.pageState = PageState.fromState(state, {
        totalPage: this.pageState.page.totalPage,
        totalCount: this.pageState.page.totalCount
      });
    }
    this.pageState.params['resourceId'] = this.cacheService.namespaceId;
    this.pageState.sort.by = 'id';
    this.pageState.sort.reverse = true;
    this.reviewService.list(this.pageState)
      .subscribe(
        response => {
          const data = response.data;
          this.pageState.page.totalPage = data.totalPage;
          this.pageState.page.totalCount = data.totalCount;
          this.changedReviews = data.list;
        },
        error => this.messageHandlerService.handleError(error)
      );
  }

  createReview(created: boolean) {
    if (created) {
      this.retrieve();
    }
  }

  openModal(): void {
  }

  passReview(review: Review) {
    review.status = 1;
    this.reviewService.update(this.cacheService.namespaceId, review).subscribe(
      response => {
        this.messageHandlerService.showSuccess('操作成功!');
        this.retrieve();
      },
      error => this.messageHandlerService.handleError(error)
    );
  }

  rejectReview(review: Review) {
    review.status = 2;
    this.reviewService.update(this.cacheService.namespaceId, review).subscribe(
      response => {
        this.messageHandlerService.showSuccess('操作成功!');
        this.retrieve();
      },
      error => this.messageHandlerService.handleError(error)
    );
  }
}
