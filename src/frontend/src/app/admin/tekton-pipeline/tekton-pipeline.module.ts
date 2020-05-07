import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListTektonPipelineComponent } from './list-tekton-pipeline/list-tekton-pipeline.component';
import { TektonPipelineComponent } from './tekton-pipeline.component';
import { CreateEditTektonPipelineComponent } from './create-edit-tekton-pipeline/create-edit-tekton-pipeline.component';
// import { TrashHarborComponent } from './trash-harbor/trash-cluster.component';
import { PipelineService } from '../../shared/client/v1/pipeline.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    PipelineService
  ],
  exports: [TektonPipelineComponent,
    ListTektonPipelineComponent],
  declarations: [TektonPipelineComponent,
    ListTektonPipelineComponent, CreateEditTektonPipelineComponent ]
})

export class TektonPipelineModule {
}
