import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class ElUploadRequest {
    private http;
    headers: HttpHeaders;
    withCredentials: boolean;
    fileName: string;
    defaultBody: any;
    constructor(http: HttpClient);
    upload(path: string, file: File): Observable<any>;
    setHeader(headers?: any): ElUploadRequest;
    setCredentials(withCredentials: boolean): ElUploadRequest;
    setFileName(name: string): ElUploadRequest;
    addExtraData(data?: any): ElUploadRequest;
}
