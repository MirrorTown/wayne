import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElUploadList = /** @class */ (function () {
    function ElUploadList() {
        this.files = [];
        this.elDisabled = false;
        this.remove = new EventEmitter();
        this.preview = new EventEmitter();
    }
    /**
     * @param {?} file
     * @return {?}
     */
    ElUploadList.prototype.clickHandle = function (file) {
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ElUploadList.prototype.removeHandle = function (file) {
        this.remove.emit(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ElUploadList.prototype.previewHandle = function (file) {
        this.preview.emit(file);
    };
    ElUploadList.decorators = [
        { type: Component, args: [{
                    selector: 'el-upload-list',
                    template: "\n    <ul [class]=\"'el-upload-list el-upload-list--' + listType\"\n      [class.is-disabled]=\"elDisabled\">\n      <li *ngFor=\"let file of files; let i = index\"\n        [class]=\"'el-upload-list__item is-' + file.status\">\n        <img class=\"el-upload-list__item-thumbnail\"\n          *ngIf=\"file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1\"\n          [src]=\"file.url\">\n        <a class=\"el-upload-list__item-name\" (click)=\"clickHandle(file)\">\n          <i class=\"el-icon-document\"></i>\n          {{file.name}}\n        </a>\n        <label class=\"el-upload-list__item-status-label\">\n          <i [class.el-icon-check]=\"['picture-card', 'picture'].indexOf(listType) > -1\"\n            [class.el-icon-circle-check]=\"listType === 'text'\"\n            [class.el-icon-upload-success]=\"true\"></i>\n        </label>\n        <i class=\"el-icon-close\" *ngIf=\"!elDisabled\" (click)=\"removeHandle(file)\"></i>\n        <el-progress *ngIf=\"file.status === 'uploading'\"\n          [type]=\"listType === 'picture-card' ? 'circle' : 'line'\"\n          [stroke-width]=\"listType === 'picture-card' ? 6 : 2\"\n          [percentage]=\"file.percentage\">\n        </el-progress>\n        <span class=\"el-upload-list__item-actions\" *ngIf=\"listType === 'picture-card'\">\n        <span class=\"el-upload-list__item-preview\"\n          *ngIf=\"listType === 'picture-card'\"\n          (click)=\"previewHandle(file)\">\n          <i class=\"el-icon-view\"></i>\n        </span>\n        <span class=\"el-upload-list__item-delete\"\n          *ngIf=\"!elDisabled\"\n          (click)=\"removeHandle(file)\">\n          <i class=\"el-icon-delete2\"></i>\n        </span>\n      </span>\n      </li>\n    </ul>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElUploadList.ctorParameters = function () { return []; };
    ElUploadList.propDecorators = {
        'files': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'listType': [{ type: Input, args: ['list-type',] },],
        'remove': [{ type: Output },],
        'preview': [{ type: Output },],
    };
    return ElUploadList;
}());
export { ElUploadList };
function ElUploadList_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadList.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUploadList.ctorParameters;
    /** @type {?} */
    ElUploadList.propDecorators;
    /** @type {?} */
    ElUploadList.prototype.files;
    /** @type {?} */
    ElUploadList.prototype.elDisabled;
    /** @type {?} */
    ElUploadList.prototype.listType;
    /** @type {?} */
    ElUploadList.prototype.remove;
    /** @type {?} */
    ElUploadList.prototype.preview;
}
//# sourceMappingURL=upload.list.js.map