import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { PageState } from '../../page/page-state';
import { isNotEmpty } from '../../utils';
import { throwError } from 'rxjs';

@Injectable()
export class PublishService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  listHistories(pageState: PageState, type?: number, resourceId?: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageNo', pageState.page.pageNo + '');
    params = params.set('pageSize', pageState.page.pageSize + '');
    params = params.set('type', type + '');
    params = params.set('resourceId', resourceId + '');
    params = params.set('sortby', '-id');
    Object.getOwnPropertyNames(pageState.params).map(key => {
      const value = pageState.params[key];
      if (isNotEmpty(value)) {
        params = params.set(key, value);
      }
    });

    const filterList: Array<string> = [];
    Object.getOwnPropertyNames(pageState.filters).map(key => {
      const value = pageState.filters[key];
      if (isNotEmpty(value)) {
        if (key === 'deleted' || key === 'id') {
          filterList.push(`${key}=${value}`);
        } else {
          filterList.push(`${key}__contains=${value}`);
        }
      }
    });
    if (filterList.length) {
      params = params.set('filter', filterList.join(','));
    }
    // sort param
    if (Object.keys(pageState.sort).length !== 0) {
      const sortType: any = pageState.sort.reverse ? `-${pageState.sort.by}` : pageState.sort.by;
      params = params.set('sortby', sortType);
    }

    return this.http
      .get('/api/v1/publish/histories', {params: params})

      .catch(error => throwError(error));
  }

  listStatus(type?: number, resourceId?: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('type', type + '');
    params = params.set('resourceId', resourceId + '');
    return this.http
      .get('/api/v1/publishstatus', {params: params});
  }

  getDeployStatistics(startTime: string, endTime: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('start_time', startTime);
    params = params.set('end_time', endTime);
    return this.http
      .get('/api/v1/publish/statistics', {params: params})

      .catch(error => throwError(error));
  }

  getDeployChart(startTime: string, endTime: string, resourceName: string, cluster: string, user: string, resourceType: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('start_time', startTime);
    params = params.set('end_time', endTime);
    params = params.set('resource_name', resourceName);
    params = params.set('cluster', cluster);
    params = params.set('user', user);
    return this.http
      .get(`/api/v1/publish/chart/${resourceType}`, {params: params})
  }

  rollback(image: string, cluster: string, tplId: number, nsId: number, template?: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('image', image);
    return this.http
      .post(`/api/v1/publish/tpl/${tplId}/namespace/${nsId}/clusters/${cluster}`, template, {params: params})
      .catch(error => throwError(error));
  }
}
