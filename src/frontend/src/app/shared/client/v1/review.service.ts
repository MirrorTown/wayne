import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Group } from '../../model/v1/group';
import { PageState } from '../../page/page-state';
import { isNotEmpty } from '../../utils';
import { Observable, throwError } from 'rxjs';
import { Review } from '../../model/v1/review';

@Injectable()
export class ReviewService {
  headers = new HttpHeaders({'Content-type': 'application/json'});
  options = {'headers': this.headers};

  constructor(private http: HttpClient) {
  }

  getNames(): Observable<any> {
    return this.http
      .get('/api/v1/review/names')
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
      .get('/api/v1/reviews', {params: params})

      .catch(error => throwError(error));
  }

  create(review: Review): Observable<any> {
    return this.http
      .post(`/api/v1/reviews`, review, this.options)

      .catch(error => throwError(error));
  }

  update(review: Review): Observable<any> {
    return this.http
      .put(`/api/v1/reviews/${review.name}`, review, this.options)

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
      .delete(`/api/v1/reviews/${name}`, options)

      .catch(error => throwError(error));
  }

  getByName(name: string): Observable<any> {
    return this.http
      .get(`/api/v1/reviews/${name}`)

      .catch(error => throwError(error));
  }
}
