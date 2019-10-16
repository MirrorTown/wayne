export class Harbor {
  id: number;
  name: string;
  url:  string;
  user: string;
  passwd: string;
  project: string;
  namespace: string;
  description: string;
  createTime: Date;
  status: number;
  checked: boolean;

  constructor(name?: string, checked?: boolean) {
    if (name) {
      this.name = name;
    }
    if (checked) {
      this.checked = checked;
    }
    this.user = '';
    this.passwd = '';
  }
}

export class HarborMeta {
  constructor(checked: boolean, value = 0) {
    this.checked = checked;
    this.value = value;
  }

  checked: boolean;
  value: number;
}
