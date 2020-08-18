export class ConfigmapHulk {
  id: number;
  name: string;
  appName: string;
  sZone:  string;
  env: string;
  scope: number;
  type: string;
  createTime: Date;
  configResource: string;

  constructor(appName?: string) {
    if (appName) {
      this.appName = appName;
    }
    this.sZone = '';
    this.env = '';
    this.type = '';
    this.scope = 0;
  }
}
