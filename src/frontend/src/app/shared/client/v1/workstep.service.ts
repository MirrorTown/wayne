import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable()
export class WorkstepService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  getById(nsId: number, appId: number, depId: number): Observable<any> {
    return this.http
      .get(`/wayne/api/v1/workstep/namespace/${nsId}/apps/${appId}/deployment/${depId}`)

      .catch(error => throwError(error));
  }

  updateById(nsId: number, appId: number, depId: number): Observable<any> {
    return this.http
      .post(`/wayne/api/v1/workstep/namespace/${nsId}/apps/${appId}/deployment/${depId}`, this.options)

      .catch(error => throwError(error));
  }
}
