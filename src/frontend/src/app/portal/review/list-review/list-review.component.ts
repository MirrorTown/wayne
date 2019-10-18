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
  @Output() delete = new EventEmitter<Review>();
  @Output() edit = new EventEmitter<Review>();

  constructor(
    public authService: AuthService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    console.log('enter list-review');
  }

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    this.paginate.emit(this.state);
  }

  refresh(state?: ClrDatagridStateInterface) {
    console.log(state);
    this.state = state;
    this.paginate.emit(state);
    console.log(this.reviews);
  }

  deleteReview(review: Review) {
    this.delete.emit(review);
  }

  editReview(review: Review) {
    this.edit.emit(review);
  }

  tokenDetail(review: Review) {
  }


}
