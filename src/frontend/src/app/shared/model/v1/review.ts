export class Review {
  id: number;
  name: string;
  appId:  string;
  announcer: string;
  publishTime: Date;
  announceTime: string;
  auditors: string;
  createTime: Date;
  updateTime: Date;
  status: number;
  checked: boolean;

  constructor(name?: string, checked?: boolean) {
    if (name) {
      this.name = name;
    }
    if (checked) {
      this.checked = checked;
    }
  }
}

export class BuildReview{
  id: number;
  name: string;
  appId:  string;
  announcer: string;
  buildTime: Date;
  announceTime: string;
  version: string;
  auditors: string;
  createTime: Date;
  updateTime: Date;
  status: number;
  checked: boolean;

  constructor(name?: string, checked?: boolean) {
    if (name) {
      this.name = name;
    }
    if (checked) {
      this.checked = checked;
    }
  }
}
