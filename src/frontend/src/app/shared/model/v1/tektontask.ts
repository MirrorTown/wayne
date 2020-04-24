import { Deployment } from './deployment';
import { TemplateState } from '../../shared.const';
import { PublishStatus } from './publish-status';

export class TektonTask {
  id: number;
  name: string;
  tektonParamId: number;
  template: string;
  description: string;
  deleted: boolean;
  user: string;
  createTime: Date;
  updateTime?: Date;
  tektonParam: Deployment;

  status: TektonStatus[];
  containerVersions: string[];
}

export class TektonStatus {
  id: number;
  tektonParamId: number;
  templateId: number;
  cluster: string;
  state: TemplateState;
  current: number;
  desired: number;
  warnings: Event[];
  errNum: number;

  constructor() {
    this.errNum = 0;
  }

  static fromPublishStatus(state: PublishStatus) {
    const dStatus = new TektonStatus();
    dStatus.id = state.id;
    dStatus.tektonParamId = state.resourceId;
    dStatus.templateId = state.templateId;
    dStatus.cluster = state.cluster;
    return dStatus;
  }
}

export class Event {
  message: string;
  sourceComponent: string;
  Name: string;
  object: string;
  count: number;
  firstSeen: Date;
  lastSeen: Date;
  reason: string;
  type: string;
}
