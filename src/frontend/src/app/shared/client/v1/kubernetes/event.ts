import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { PageState } from '../../../page/page-state';
import { BaseClient } from './base-client';

@Injectable()
export class EventClient {
  constructor(private http: HttpClient) {
  }

  listPageByResouce(pageState: PageState, cluster: string, namespace: string, resouceType: string,
                    name: string, appId?: number): Observable<any> {
    let params = BaseClient.buildParam(pageState);
    if ((typeof (appId) === 'undefined') || (!appId)) {
      appId = 0;
    }
    params = params.set('type', resouceType);
    params = params.set('name', name);
    return this.http
      .get(`/wayne/api/v1/kubernetes/apps/${appId}/events/namespaces/${namespace}/clusters/${cluster}`, {params: params})
      .catch(error => throwError(error));
  }

  listEventByCluster(pageState: PageState, cluster: string): Observable<any> {
    let params = BaseClient.buildParam(pageState);
    return this.http
      .get(`/wayne/api/v1/events/clusters/${cluster}`, {params: params})
      .catch(error => throwError(error));
  }

}
