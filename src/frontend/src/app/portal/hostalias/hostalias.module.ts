import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateHostAliasComponent } from './create-hostalias/create-hostalias.component';
import { ClusterService } from '../../shared/client/v1/cluster.service';
import { LogClient } from '../../shared/client/v1/kubernetes/log';
import { HostAliasService } from '../../shared/client/v1/hostAlias.service';
import { HostAliaseComponent } from './hostalias.component';
import { ListHostAliasComponent } from './list-hostalias/list-hostalias.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    HostAliasService,
    ClusterService,
    LogClient
  ],
  exports: [
    HostAliaseComponent,
  ],
  declarations: [
    HostAliaseComponent,
    CreateHostAliasComponent,
    ListHostAliasComponent,
  ]
})

export class HostAliasModule {
}
