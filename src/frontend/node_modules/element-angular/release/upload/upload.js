var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ContentChild, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { ElUploadProps } from './upload.props';
import { ElUploadRequest } from './upload.request';
var ElUpload = /** @class */ (function (_super) {
    __extends(ElUpload, _super);
    /**
     * @param {?} request
     * @param {?} sanitizer
     */
    function ElUpload(request, sanitizer) {
        var _this = _super.call(this) || this;
        _this.request = request;
        _this.sanitizer = sanitizer;
        _this.files = [];
        return _this;
    }
    /**
     * @return {?}
     */
    ElUpload.generateID = function () {
        return Math.random().toString(16).substr(2, 8);
    };
    /**
     * @param {?} response
     * @return {?}
     */
    ElUpload.updatePercentage = function (response) {
        var loaded = response.loaded, total = response.total;
        if (loaded === undefined || !total)
            return 0;
        return Math.round(loaded / total * 100);
    };
    /**
     * @return {?}
     */
    ElUpload.prototype.clickHandle = function () {
        if (this.elDisabled)
            return;
        this.input.nativeElement.click();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElUpload.prototype.changeHandle = function (event) {
        var _this = this;
        var /** @type {?} */ files = ((event.target)).files;
        if (!files || !files.length)
            return;
        var /** @type {?} */ checkedFiles = this.multiple ? Array.from(files) : [files[0]];
        this.input.nativeElement.value = null;
        checkedFiles.forEach(function (file) {
            var /** @type {?} */ next = {
                id: ElUpload.generateID(),
                name: file.name,
                status: 'ready',
                size: file.size,
                percentage: 0,
                raw: file,
                url: _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
            };
            _this.files.push(next);
            _this.updateFile(next);
            _this.uploadFilter(file) === false ? _this.removeHandle(next) : _this.upload(next);
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ElUpload.prototype.upload = function (file) {
        var _this = this;
        file.status = 'uploading';
        this.updateFile(file);
        this.request.upload(this.action, file.raw)
            .subscribe(function (event) {
            file.percentage = ElUpload.updatePercentage(event);
            file.percentage && _this.lifecycle.progress(file, file.percentage);
            if (event instanceof HttpResponse) {
                _this.lifecycle.success(Object.assign(file, { status: 'success' }), event);
            }
            _this.updateFile(file);
        }, function (err) {
            file.status = 'fail';
            _this.lifecycle.error(file, err);
            _this.removeHandle(file);
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ElUpload.prototype.removeHandle = function (file) {
        this.lifecycle.remove(file);
        var /** @type {?} */ index = this.files.findIndex(function (_a) {
            var id = _a.id;
            return file.id === id;
        });
        this.files.splice(index, 1);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ElUpload.prototype.updateFile = function (file) {
        var /** @type {?} */ index = this.files.findIndex(function (_a) {
            var id = _a.id;
            return file.id === id;
        });
        if (!index)
            return;
        this.files[index] = file;
    };
    /**
     * @return {?}
     */
    ElUpload.prototype.ngOnInit = function () {
        var _this = this;
        this.request
            .setHeader(this.headers)
            .setCredentials(this.withCredentials)
            .setFileName(this.name)
            .addExtraData(this.data);
        this.fileList.forEach(function (file) {
            _this.files.push({
                id: ElUpload.generateID(),
                name: file.name,
                status: 'success',
                raw: null, size: null,
                url: _this.sanitizer.bypassSecurityTrustUrl(file.url),
            });
        });
    };
    ElUpload.decorators = [
        { type: Component, args: [{
                    selector: 'el-upload',
                    template: "\n    <ng-template #uploadList>\n      <el-upload-list [files]=\"files\"  *ngIf=\"showFileList\"\n        [list-type]=\"listType\" [elDisabled]=\"elDisabled\"\n        (remove)=\"removeHandle($event)\" (preview)=\"lifecycle.preview($event)\">\n      </el-upload-list>\n    </ng-template>\n    \n    <ng-template #triggerBlock>\n      <div [class]=\"'el-upload el-upload--' + listType\" (click)=\"clickHandle()\">\n        <el-button *ngIf=\"!trigger\" size=\"small\" type=\"primary\">\u70B9\u51FB\u4E0A\u4F20</el-button>\n        <ng-container *ngIf=\"trigger\">\n          <ng-template [ngTemplateOutlet]=\"trigger\"></ng-template>\n        </ng-container>\n        <input class=\"el-upload__input\" type=\"file\" name=\"file\" #input\n          [accept]=\"accept\" [name]=\"name\" [multiple]=\"multiple\"\n          (change)=\"changeHandle($event)\">\n      </div>\n    </ng-template>\n    \n    <el-upload-dragger *ngIf=\"drag\" [elDisabled]=\"elDisabled\" (change)=\"changeHandle($event)\">\n      <ng-template [ngTemplateOutlet]=\"triggerBlock\"></ng-template>\n    </el-upload-dragger>\n    \n    <ng-container *ngIf=\"listType === 'picture-card'\">\n      <ng-template [ngTemplateOutlet]=\"uploadList\"></ng-template>\n    </ng-container>\n    <ng-container *ngIf=\"!drag\">\n      <ng-template [ngTemplateOutlet]=\"triggerBlock\"></ng-template>\n    </ng-container>\n    \n    <ng-container *ngIf=\"tip\">\n      <ng-template [ngTemplateOutlet]=\"tip\"></ng-template>\n    </ng-container>\n    <ng-container *ngIf=\"listType !== 'picture-card'\">\n      <ng-template [ngTemplateOutlet]=\"uploadList\"></ng-template>\n    </ng-container>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElUpload.ctorParameters = function () { return [
        { type: ElUploadRequest, },
        { type: DomSanitizer, },
    ]; };
    ElUpload.propDecorators = {
        'trigger': [{ type: ContentChild, args: ['trigger',] },],
        'dragger': [{ type: ContentChild, args: ['dragger',] },],
        'tip': [{ type: ContentChild, args: ['tip',] },],
        'input': [{ type: ViewChild, args: ['input',] },],
    };
    return ElUpload;
}(ElUploadProps));
export { ElUpload };
function ElUpload_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUpload.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUpload.ctorParameters;
    /** @type {?} */
    ElUpload.propDecorators;
    /** @type {?} */
    ElUpload.prototype.trigger;
    /** @type {?} */
    ElUpload.prototype.dragger;
    /** @type {?} */
    ElUpload.prototype.tip;
    /** @type {?} */
    ElUpload.prototype.input;
    /** @type {?} */
    ElUpload.prototype.files;
    /** @type {?} */
    ElUpload.prototype.request;
    /** @type {?} */
    ElUpload.prototype.sanitizer;
}
//# sourceMappingURL=upload.js.map