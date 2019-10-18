export class Review {
  id: number;
  name: string;
  appId:  string;
  announcer: string;
  publishTime: Date;
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
