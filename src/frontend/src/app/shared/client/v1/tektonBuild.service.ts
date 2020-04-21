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

@Injectable()
export class TektonBuildService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  create(tb: TektonBuild, appId: number): Observable<any> {
    return this.http
      .post(`/api/v1/apps/${appId}/deployments/tbs`, tb)

      .catch(error => throwError(error));
  }

  update(tb: TektonBuild, appId: number): Observable<any> {
    return this.http
      .put(`/api/v1/apps/${appId}/deployments/tbs/${tb.id}`, tb, this.options)

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

}
