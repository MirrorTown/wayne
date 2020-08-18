import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListConfigmapHulkComponent } from './list-configmap-hulk/list-configmap-hulk.component';
import { ConfigmapHulkComponent } from './configmap-hulk.component';
import { CreateEditConfigmapHulkComponent } from './create-edit-configmap-hulk/create-edit-configmap-hulk.component';
// import { TrashHarborComponent } from './trash-harbor/trash-cluster.component';
import { ElModule } from 'element-angular';
import { PipelineService } from '../../shared/client/v1/pipeline.service';
import {ConfigmapHulkService} from "../../shared/client/v1/configmapHulk.service";

@NgModule({
  imports: [
    SharedModule,
    ElModule
  ],
  providers: [
    ConfigmapHulkService
  ],
  exports: [ConfigmapHulkComponent,
    ListConfigmapHulkComponent],
  declarations: [ConfigmapHulkComponent,
    ListConfigmapHulkComponent, CreateEditConfigmapHulkComponent ]
})

export class ConfigmapHulkModule {
}
