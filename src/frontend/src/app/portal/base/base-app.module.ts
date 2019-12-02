import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../../shared/footer/footer.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { BaseComponent } from './base.component';
import { PublishHistoryModule } from '../common/publish-history/publish-history.module';
import { TplDetailModule } from '../../shared/tpl-detail/tpl-detail.module';
import { TplDeployLogModule } from '../../shared/tpl-deploy-log/tpl-deploy-log.module'

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    FooterModule,
    SidenavModule,
    PublishHistoryModule,
    TplDetailModule,
    TplDeployLogModule,
  ],
  providers: [],
  exports: [BaseComponent],
  declarations: [BaseComponent
  ]
})

export class BaseAppModule {
}
