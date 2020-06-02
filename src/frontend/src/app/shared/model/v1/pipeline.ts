import {TektonBuild} from "./tektonBuild";

export class Pipeline {
  id: number;
  name: string;
  buildUri:  string;
  user: string;
  logUri: string;
  description: string;
  createTime: Date;
  status: number;
  tektonBuilds: TektonBuild[];
  checked: boolean;
  buildResource: string;

  constructor(name?: string, checked?: boolean) {
    if (name) {
      this.name = name;
    }
    if (checked) {
      this.checked = checked;
    }
    this.user = '';
    this.buildUri = '';
    this.logUri = '';
  }
}

export class PipelineMeta {
  constructor(checked: boolean, value = 0) {
    this.checked = checked;
    this.value = value;
  }

  checked: boolean;
  value: number;
}
