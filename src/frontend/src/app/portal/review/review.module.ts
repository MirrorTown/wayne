import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReviewService } from '../../shared/client/v1/review.service';
import { ListReviewComponent } from './list-review/list-review.component';
import { ReviewComponent } from './review.component';
import { SidenavNamespaceModule } from '../sidenav-namespace/sidenav-namespace.module';

@NgModule({
  imports: [
    SharedModule,
    SidenavNamespaceModule
  ],
  providers: [
    ReviewService
  ],
  exports: [],
  declarations: [
    ReviewComponent,
    ListReviewComponent
  ]
})

export class ReviewModule {
}
