import {Deployment, DeploymentMetaData} from './deployment';
import { TemplateState } from '../../shared.const';
import { PublishStatus } from './publish-status';
import {App} from "./app";

export class TektonBuild {
  id: number;
  name: string;
  deploymentId: number;
  metaData: string;
  description: string;
  deleted: boolean;
  user: string;
  stepflow: number;
  status: string;
  createTime: Date;
  updateTime?: Date;
  appId: number;

  buildVersions: string[];
}

export class BuildTpl {
  id: number;
  name: string;
  metaData: string;
  deleted: boolean;
  appId: number;
  user: string;
  metaDataObj: DeploymentMetaData;
  createTime: Date;
  updateTime: Date;
  app: App;
  order: number;
  description: string;
}

export class Param {
  key: string;
  value: string;
}
