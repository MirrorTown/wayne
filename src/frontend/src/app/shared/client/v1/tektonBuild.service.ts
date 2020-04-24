import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { PageState } from '../../page/page-state';
import { isNotEmpty } from '../../utils';
import { DeploymentTpl } from '../../model/v1/deploymenttpl';
import { throwError } from 'rxjs';
import {TektonBuild} from "../../model/v1/tektonBuild";
import {BuildReview} from "../../model/v1/review";

@Injectable()
export class TektonBuildService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  edit(tb: TektonBuild, appId: number): Observable<any> {
    return this.http
      .post(`/api/v1/apps/${appId}/deployments/tbs`, tb)

      .catch(error => throwError(error));
  }

  create(tb: TektonBuild, appId: number): Observable<any> {
    return this.http
      .put(`/api/v1/apps/${appId}/deployments/tbs/${tb.id}`, tb, this.options)

      .catch(error => throwError(error));
  }

  publish(nid: number, buildReview: BuildReview) {
    return this.http
      .put(`/api/v1/build/reviews/publish`, buildReview, this.options)

      .catch(error => throwError(error));
  }

  deleteById(id: number, appId: number, logical?: boolean): Observable<any> {
    const options: any = {};
    if (logical != null) {
      let params = new HttpParams();
      params = params.set('logical', logical + '');
      options.params = params;
    }

    return this.http
      .delete(`/api/v1/apps/${appId}/deployments/tbs/${id}`, options)

      .catch(error => throwError(error));
  }

  getById(deploymentId: number, appId: number): Observable<any> {
    return this.http
      .get(`/api/v1/apps/${appId}/deployments/tbs/${deploymentId}`)

      .catch(error => throwError(error));
  }

  list(pageState: PageState): Observable<any> {
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
      .get('/api/v1/build/reviews', {params: params})

      .catch(error => throwError(error));
  }

}
