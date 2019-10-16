import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Group } from '../../model/v1/group';
import { PageState } from '../../page/page-state';
import { isNotEmpty } from '../../utils';
import { Observable, throwError } from 'rxjs';
import { Harbor } from '../../model/v1/harbor';

@Injectable()
export class HarborService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  getNames(): Observable<any> {
    return this.http
      .get('/api/v1/harbor/names')
      .catch(error => throwError(error));
  }

  listImages(pageState: PageState, projectName?: string): Observable<any> {
    let params = new HttpParams();
    if (typeof(projectName) !== 'undefined') {
      params = params.set('projectName', projectName);
    }
    return this.http.get('/api/v1/harbor/images', {params: params})
      .catch(error => throwError(error));
  }

  list(pageState: PageState, deleted?: string): Observable<any> {
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
      .get('/api/v1/harbors', {params: params})

      .catch(error => throwError(error));
  }

  create(harbor: Harbor): Observable<any> {
    return this.http
      .post(`/api/v1/harbors`, harbor, this.options)

      .catch(error => throwError(error));
  }

  update(harbor: Harbor): Observable<any> {
    return this.http
      .put(`/api/v1/harbors/${harbor.name}`, harbor, this.options)

      .catch(error => throwError(error));
  }

  deleteByName(name: string, logical?: boolean): Observable<any> {
    const options: any = {};
    if (logical != null) {
      let params = new HttpParams();
      params = params.set('logical', logical + '');
      options.params = params;
    }

    return this.http
      .delete(`/api/v1/harbors/${name}`, options)

      .catch(error => throwError(error));
  }

  getByName(name: string): Observable<any> {
    return this.http
      .get(`/api/v1/harbors/${name}`)

      .catch(error => throwError(error));
  }
}
