import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Page } from '../../../shared/page/page-state';
import { BuildReview } from '../../../shared/model/v1/review';
import { AuthService } from '../../../shared/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'list-build-review',
  templateUrl: 'list-build-review.component.html',
  styleUrls: ['list-build-review.scss']
})
export class ListBuildReviewComponent implements OnInit {
  @Input() showState: object;

  @Input() reviews: BuildReview[];
  @Input() page: Page;
  state: ClrDatagridStateInterface;
  currentPage = 1;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() buildPass = new EventEmitter<BuildReview>();
  @Output() buildReject = new EventEmitter<BuildReview>();

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
    this.paginate.emit(this.state);
  }

  refresh(state?: ClrDatagridStateInterface) {
    this.state = state;
    this.paginate.emit(state);
  }

  passReview(review: BuildReview) {
    this.buildPass.emit(review);
  }

  rejectReview(review: BuildReview) {
    this.buildReject.emit(review);
  }

}
