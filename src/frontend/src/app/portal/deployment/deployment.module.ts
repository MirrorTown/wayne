import { NgModule } from '@angular/core';
import { DeploymentComponent } from './deployment.component';
import { SharedModule } from '../../shared/shared.module';
import { ListDeploymentComponent } from './list-deployment/list-deployment.component';
import { CreateEditDeploymentComponent } from './create-edit-deployment/create-edit-deployment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditDeploymentTplComponent } from './create-edit-deploymenttpl/create-edit-deploymenttpl.component';
import { PublishDeploymentTplComponent } from './publish-tpl/publish-tpl.component';
import { DeploymentClient } from '../../shared/client/v1/kubernetes/deployment';
import { PodClient } from '../../shared/client/v1/kubernetes/pod';
import { DeploymentService } from '../../shared/client/v1/deployment.service';
import { DeploymentTplService } from '../../shared/client/v1/deploymenttpl.service';
import { ClusterService } from '../../shared/client/v1/cluster.service';
import { PublicService } from '../../shared/client/v1/public.service';
import { PublishStatusService } from '../../shared/client/v1/publishstatus.service';
import { LogClient } from '../../shared/client/v1/kubernetes/log';
import { ElModule } from 'element-angular';
import { ReviewModule } from '../review/review.module';
import { WorkstepService } from '../../shared/client/v1/workstep.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ReviewModule,
    ElModule
  ],
  providers: [
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
    DeploymentComponent
  ],
  declarations: [
    DeploymentComponent,
    CreateEditDeploymentComponent,
    ListDeploymentComponent,
    CreateEditDeploymentTplComponent,
    PublishDeploymentTplComponent,
  ]
})

export class DeploymentModule {
}
