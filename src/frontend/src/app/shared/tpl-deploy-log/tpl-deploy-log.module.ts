import { NgModule } from '@angular/core';
import { TplDeployLogComponent } from './tpl-deploy-log.component';
import { SharedModule } from '../shared.module';
import { SlsService } from '../client/v1/sls.service';
import { ModalModule } from './_modal'

@NgModule({
  imports: [
    SharedModule,
    ModalModule
  ],
  providers: [SlsService],
  exports: [TplDeployLogComponent],
  declarations: [TplDeployLogComponent
  ]
})

export class TplDeployLogModule {
}
