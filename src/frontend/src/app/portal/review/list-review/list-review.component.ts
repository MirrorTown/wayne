import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Page } from '../../../shared/page/page-state';
import { Review } from '../../../shared/model/v1/review';
import { AuthService } from '../../../shared/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'list-review',
  templateUrl: 'list-review.component.html',
  styleUrls: ['list-review.scss']
})
export class ListReviewComponent implements OnInit {
  @Input() showState: object;

  @Input() reviews: Review[];
  @Input() page: Page;
  state: ClrDatagridStateInterface;
  currentPage = 1;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() pass = new EventEmitter<Review>();
  @Output() reject = new EventEmitter<Review>();

  constructor(
    public authService: AuthService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    console.log(this.state);
    this.paginate.emit(this.state);
  }

  refresh(state?: ClrDatagridStateInterface) {
    this.state = state;
    this.paginate.emit(state);
  }

  passReview(review: Review) {
    this.pass.emit(review);
  }

  rejectReview(review: Review) {
    this.reject.emit(review);
  }

}
