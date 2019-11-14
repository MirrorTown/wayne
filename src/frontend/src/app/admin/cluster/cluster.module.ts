import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListClusterComponent } from './list-cluster/list-cluster.component';
import { EventClusterComponent } from './event-cluster/event-cluster.component'
import { ClusterComponent } from './cluster.component';
import { CreateEditClusterComponent } from './create-edit-cluster/create-edit-cluster.component';
import { TrashClusterComponent } from './trash-cluster/trash-cluster.component';
import { ClusterService } from '../../shared/client/v1/cluster.service';
import { EventClient } from '../../shared/client/v1/kubernetes/event';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ClusterService,
    EventClient
  ],
  exports: [ClusterComponent,
    ListClusterComponent,
    EventClusterComponent],
  declarations: [ClusterComponent, EventClusterComponent,
    ListClusterComponent, CreateEditClusterComponent, TrashClusterComponent]
})

export class ClusterModule {
}
