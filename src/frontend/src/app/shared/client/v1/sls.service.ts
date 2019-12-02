import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { PageState } from '../../page/page-state';
import { isNotEmpty } from '../../utils';
import { throwError } from 'rxjs';
import { DeployLog } from '../../model/v1/deploy-log';

@Injectable()
export class SlsService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  getDeployLog(log: DeployLog): Observable<any> {
    let params = new HttpParams();

    return this.http
      .post(`/aliyun/wayne/sls/search`, log,{params: params})
      .catch(error => throwError(error));
  }
}
