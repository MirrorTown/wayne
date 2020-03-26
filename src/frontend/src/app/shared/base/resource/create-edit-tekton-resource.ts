import { ViewChild } from '@angular/core';
import { CreateEditResource } from './create-edit-resource';
import { ResourceLimitComponent } from '../../component/resource-limit/resource-limit.component';
import { ClusterMeta, Cluster } from '../../model/v1/cluster';
import { defaultResources } from '../../shared.const';
import { AuthService } from 'app/shared/auth/auth.service';
import { MessageHandlerService } from 'app/shared/message-handler/message-handler.service';
import {VolumnMeta} from "../../model/v1/tekton";

export class CreateEditTektonResource extends CreateEditResource {
  @ViewChild(ResourceLimitComponent, { static: false })
  resourceLimitComponent: ResourceLimitComponent;
  defaultClusterNum = 0;
  volumnChecked = false;
  constructor(
    public resourceService: any,
    public authService: AuthService,
    public messageHandlerService: MessageHandlerService
  ) {
    super(resourceService, authService, messageHandlerService);
  }

  setMetaData() {
    // this.volumnMetas['volumn'] = new VolumnMeta(false)
    this.resource.metaData = this.resource.metaData ? this.resource.metaData : '{}';
    const metaData = JSON.parse(this.resource.metaData);
    if (this.clusters && this.clusters.length > 0) {
      const clusters = metaData['clusters'];
      for (const clu of this.clusters) {
        const culsterMeta = new ClusterMeta(false);
        if (clusters && clusters.indexOf(clu.name) > -1) {
          culsterMeta.checked = true;
        }
        this.clusterMetas[clu.name] = culsterMeta;
      }
    }
    this.resource.params = metaData['params'];
    this.volumnMetas = metaData['volumns'];
    this.resource.sa = metaData['sa'];
    console.log(this.resource)
    // this.resourceLimitComponent.setValue(metaData['resources']);
  }

  initMetaData() {
    this.resource.metaData = '{}';
    this.resource.volumn = '{}';
    this.resourceLimitComponent.setValue();
  }

  get replicaLimit(): number {
    let replicaLimit = defaultResources.replicaLimit;
    if (this.resource && this.resource.metaData) {
      const metaData = JSON.parse(this.resource.metaData);
      if (metaData.resources &&
        metaData.resources.replicaLimit) {
        replicaLimit = parseInt(metaData.resources.replicaLimit, 10);
      }
    }
    return replicaLimit;
  }

  replicaValidation(cluster: string): boolean {
    const clusterMeta = this.clusterMetas[cluster];
    if (this.resource && this.resource.metaData && clusterMeta) {
      if (!clusterMeta.checked) {
        return true;
      }
      return parseInt(clusterMeta.value, 10) <= this.replicaLimit;
    }
    return false;
  }

  onAddTektonArgs() {
    if (!this.resource.params) {
      console.log("reset")
      this.resource.params = [];
    }
    if (this.resource.params.length === 0) {
      console.log("init")
      this.resource.params.push("gitReversion")
      this.resource.params.push("gitUrl")
      console.log(this.resource.params.length)
    }
    this.resource.params.push('');
  }

  onChangeVchecked() {
    console.log(this.resource.vchecked);
  }

  onDeleteTektonArg(j: number) {
    this.resource.params.splice(j, 1);
  }

  ngOnInit(): void {
    this.volumnMetas = {};
    this.volumnMetas['volumn'] = new VolumnMeta(false);
  }

  formatMetaData() {
    if (!this.resource.metaData) {
      this.resource.metaData = '{}';
    }
    const metaData = JSON.parse(this.resource.metaData);
    const clusters = [];
    for (const clu of this.clusters) {
      const clusterMeta = this.clusterMetas[clu.name];
      if (clusterMeta && clusterMeta.checked) {
        clusters.push(clu.name);
      }
    }
    metaData.clusters = clusters;
    metaData.params = this.resource.params;
    metaData.volumns = this.volumnMetas;
    metaData.sa = this.resource.sa;
    this.resource.metaData = JSON.stringify(metaData);
    console.log(this.resource)
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing &&
      this.isNameValid &&
      !this.checkOnGoing &&
      this.isClusterValid();
  }

  isClusterReplicaValid(): boolean {
    if (this.clusters) {
      for (const clu of this.clusters) {
        if (!this.replicaValidation(clu.name)) {
          return false;
        }
      }
    }
    return true;
  }
}
