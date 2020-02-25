import { NgModule } from '@angular/core';
import { TektonComponent } from './tekton.component';
import { SharedModule } from '../../shared/shared.module';
import { ListTektonComponent } from './list-tekton/list-tekton.component';
import { CreateEditTektonComponent } from './create-edit-tekton/create-edit-tekton.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditTaskComponent } from './create-edit-task/create-edit-task.component';
import { PublishTaskComponent } from './publish-tastk/publish-task.component';
import { DeploymentClient } from '../../shared/client/v1/kubernetes/deployment';
import { PodClient } from '../../shared/client/v1/kubernetes/pod';
import { DeploymentService } from '../../shared/client/v1/deployment.service';
import { DeploymentTplService } from '../../shared/client/v1/deploymenttpl.service';
import { ClusterService } from '../../shared/client/v1/cluster.service';
import { PublicService } from '../../shared/client/v1/public.service';
import { PublishStatusService } from '../../shared/client/v1/publishstatus.service';
import { LogClient } from '../../shared/client/v1/kubernetes/log';
import { ReviewModule } from '../review/review.module';
import { WorkstepService } from '../../shared/client/v1/workstep.service';
import { ElModule } from 'element-angular';
import {TektonService} from "../../shared/client/v1/tekton.service";
import {TektonTaskService} from "../../shared/client/v1/tektontask.service";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ReviewModule,
    ElModule,
  ],
  providers: [
    TektonService,
    TektonTaskService,
    DeploymentService,
    DeploymentTplService,
    ClusterService,
    DeploymentClient,
    PublicService,
    PodClient,
    PublishStatusService,
    LogClient,
    WorkstepService
  ],
  exports: [
    TektonComponent
  ],
  declarations: [
    TektonComponent,
    CreateEditTektonComponent,
    ListTektonComponent,
    CreateEditTaskComponent,
    PublishTaskComponent,
  ]
})

export class TektonModule {
}
