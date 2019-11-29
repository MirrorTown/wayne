import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
var ElUploadRequest = /** @class */ (function () {
    /**
     * @param {?} http
     */
    function ElUploadRequest(http) {
        this.http = http;
    }
    /**
     * @param {?} path
     * @param {?} file
     * @return {?}
     */
    ElUploadRequest.prototype.upload = function (path, file) {
        var /** @type {?} */ req = new HttpRequest('POST', path, file, {
            headers: this.headers,
            reportProgress: true,
            withCredentials: this.withCredentials,
        });
        return this.http.request(req);
    };
    /**
     * @param {?=} headers
     * @return {?}
     */
    ElUploadRequest.prototype.setHeader = function (headers) {
        if (headers === void 0) { headers = {}; }
        this.headers = new HttpHeaders(headers);
        return this;
    };
    /**
     * @param {?} withCredentials
     * @return {?}
     */
    ElUploadRequest.prototype.setCredentials = function (withCredentials) {
        this.withCredentials = withCredentials;
        return this;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ElUploadRequest.prototype.setFileName = function (name) {
        this.fileName = name;
        return this;
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    ElUploadRequest.prototype.addExtraData = function (data) {
        if (data === void 0) { data = {}; }
        this.defaultBody = data;
        return this;
    };
    ElUploadRequest.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    ElUploadRequest.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return ElUploadRequest;
}());
export { ElUploadRequest };
function ElUploadRequest_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadRequest.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUploadRequest.ctorParameters;
    /** @type {?} */
    ElUploadRequest.prototype.headers;
    /** @type {?} */
    ElUploadRequest.prototype.withCredentials;
    /** @type {?} */
    ElUploadRequest.prototype.fileName;
    /** @type {?} */
    ElUploadRequest.prototype.defaultBody;
    /** @type {?} */
    ElUploadRequest.prototype.http;
}
//# sourceMappingURL=upload.request.js.map