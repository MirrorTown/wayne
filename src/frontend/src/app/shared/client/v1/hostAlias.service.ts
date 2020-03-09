import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PageState } from '../../page/page-state';
import { isNotEmpty } from '../../utils';
import { Observable, throwError } from 'rxjs';
import { HostAlias } from '../../../shared/model/v1/hostalias';

@Injectable()
export class HostAliasService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  list(pageState: PageState, appId: number, nsId: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageNo', pageState.page.pageNo + '');
    params = params.set('pageSize', pageState.page.pageSize + '');
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
        if ( key === 'id') {
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
      .get(`/wayne/api/v1/hostalias/namespace/${nsId}/apps/${appId}`, {params: params})

      .catch(error => throwError(error));
  }

  create(hostAliases: HostAlias[], appId: number, nsId: number): Observable<any> {
    return this.http
      .post(`/wayne/api/v1/hostalias/namespace/${nsId}/apps/${appId}`, hostAliases, this.options)

      .catch(error => throwError(error));
  }

  update(hostAliases: HostAlias[]): Observable<any> {
    return this.http
      .put(`/wayne/api/v1/hostalias`, hostAliases, this.options)

      .catch(error => throwError(error));
  }

  deleteById(hostaliasId: number): Observable<any> {
    const options: any = {};

    return this.http
      .delete(`/wayne/api/v1/hostalias/${hostaliasId}`, options)

      .catch(error => throwError(error));
  }

  getByName(name: string): Observable<any> {
    return this.http
      .get(`/wayne/api/v1/harbors/${name}`)

      .catch(error => throwError(error));
  }
}
