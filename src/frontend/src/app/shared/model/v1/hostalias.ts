export class HostAlias {
  constructor(ip?: string, hostnames?: string) {
    if (ip) {
      this.ip = ip;
    }
    if (hostnames) {
      this.hostnames = hostnames;
    }

  }
  id: number;
  appId: number;
  namespaceId: number;
  ip: string;
  hostnames: string;
}
