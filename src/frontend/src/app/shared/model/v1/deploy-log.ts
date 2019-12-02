export class DeployLog {
  id: number;
  instanceName: string;
  query:  string;
  fromDate: string;
  toDate: string;
  pageNum: number;
  limit: number;

  constructor(instanceName?: string, query?: string, pageNum?: number, limit?: number) {
    if (instanceName) {
      this.instanceName = instanceName;
    }
    if (query) {
      this.query = query;
    }
    if (pageNum) {
      this.pageNum = pageNum;
    }
    if (limit) {
      this.limit = limit;
    }
    this.fromDate = undefined;
    this.toDate = undefined;
  }
}

export class DeployLogMeta {
  constructor(checked: boolean, value = 0) {
    this.checked = checked;
    this.value = value;
  }

  checked: boolean;
  value: number;
}
