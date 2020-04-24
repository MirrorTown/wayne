import { App } from './app';

export class Tekton {
  id: number;
  name: string;
  metaData: string;
  deleted: boolean;
  appId: number;
  user: string;
  metaDataObj: TektonMetaData;
  createTime: Date;
  updateTime: Date;
  app: App;
  order: number;
  description: string;
}

export class TektonMetaData {
  clusters?: [string];
  params?: [string];

  constructor(init?: TektonMetaData) {
    if (!init) {  return; }
    if (init.clusters) { this.clusters = init.clusters; }
    if (init.params) { this.params = init.params; }
  }


  static emptyObject(): TektonMetaData {
    const result = new TektonMetaData();
    result.clusters = null;
    result.params = null;
    return result;
  }

}

export class VolumnMeta {
  constructor(checked: boolean, name?: string, pvc?: string) {
    this.checked = checked;
    if (name) {this.name = name;}
    if (pvc) {this.pvc = pvc;}
  }

  checked: boolean;
  name: string;
  pvc: string;
}
