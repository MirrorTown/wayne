import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListHarborComponent } from './list-harbor/list-harbor.component';
import { HarborComponent } from './harbor.component';
import { CreateEditHarborComponent } from './create-edit-harbor/create-edit-harbor.component';
// import { TrashHarborComponent } from './trash-harbor/trash-cluster.component';
import { HarborService } from '../../shared/client/v1/harbor.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    HarborService
  ],
  exports: [HarborComponent,
    ListHarborComponent],
  declarations: [HarborComponent,
    ListHarborComponent, CreateEditHarborComponent ]
})

export class HarborModule {
}
