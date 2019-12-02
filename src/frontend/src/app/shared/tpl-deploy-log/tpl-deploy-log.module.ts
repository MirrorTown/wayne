import { NgModule } from '@angular/core';
import { TplDeployLogComponent } from './tpl-deploy-log.component';
import { SharedModule } from '../shared.module';
import { SlsService } from '../client/v1/sls.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [SlsService],
  exports: [TplDeployLogComponent],
  declarations: [TplDeployLogComponent
  ]
})

export class TplDeployLogModule {
}
