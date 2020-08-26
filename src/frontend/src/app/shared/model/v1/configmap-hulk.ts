export class ConfigmapHulk {
  id: number;
  name: string;
  appName: string;
  sZone:  string;
  env: number;
  scope: number;
  type: number;
  createTime: Date;
  configResource: string;

  constructor(appName?: string) {
    if (appName) {
      this.appName = appName;
    }
    this.sZone = '';
    this.env = 2;
    this.type = 1;
    this.scope = 1;
  }
}
