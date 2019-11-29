import { EventEmitter, Input, Output } from '@angular/core';
var ElUploadProps = /** @class */ (function () {
    function ElUploadProps() {
        this.elDisabled = false;
        this.data = {};
        this.name = 'file';
        this.drag = false;
        this.multiple = false;
        this.headers = {};
        this.withCredentials = false;
        this.showFileList = true;
        this.listType = 'text';
        // @Input('auto-upload') autoUpload: boolean = true
        this.fileList = [];
        // lifecycle event
        this.preview = new EventEmitter();
        this.remove = new EventEmitter();
        this.progress = new EventEmitter();
        // about http event
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.uploadFilter = function (f) { return true; };
    }
    Object.defineProperty(ElUploadProps.prototype, "disabled", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            console.warn('Element Angular: (disabled) is discarded, use [elDisabled] replace it.');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElUploadProps.prototype, "lifecycle", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            return {
                preview: function (f) { return _this.preview.emit(f); },
                remove: function (f) { return _this.remove.emit(f); },
                success: function (f, res) { return _this.success.emit({ commonFile: f, response: res }); },
                error: function (f, err) { return _this.error.emit({ commonFile: f, error: err }); },
                progress: function (f, percentage) { return _this.progress.emit({ commonFile: f, percentage: percentage }); },
            };
        },
        enumerable: true,
        configurable: true
    });
    ElUploadProps.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'data': [{ type: Input },],
        'name': [{ type: Input },],
        'action': [{ type: Input },],
        'accept': [{ type: Input },],
        'drag': [{ type: Input },],
        'multiple': [{ type: Input },],
        'headers': [{ type: Input },],
        'withCredentials': [{ type: Input, args: ['with-credentials',] },],
        'showFileList': [{ type: Input, args: ['show-file-list',] },],
        'listType': [{ type: Input, args: ['list-type',] },],
        'fileList': [{ type: Input, args: ['file-list',] },],
        'preview': [{ type: Output },],
        'remove': [{ type: Output },],
        'progress': [{ type: Output },],
        'success': [{ type: Output },],
        'error': [{ type: Output },],
        'uploadFilter': [{ type: Input, args: ['upload-filter',] },],
    };
    return ElUploadProps;
}());
export { ElUploadProps };
function ElUploadProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadProps.propDecorators;
    /** @type {?} */
    ElUploadProps.prototype.elDisabled;
    /** @type {?} */
    ElUploadProps.prototype.data;
    /** @type {?} */
    ElUploadProps.prototype.name;
    /** @type {?} */
    ElUploadProps.prototype.action;
    /** @type {?} */
    ElUploadProps.prototype.accept;
    /** @type {?} */
    ElUploadProps.prototype.drag;
    /** @type {?} */
    ElUploadProps.prototype.multiple;
    /** @type {?} */
    ElUploadProps.prototype.headers;
    /** @type {?} */
    ElUploadProps.prototype.withCredentials;
    /** @type {?} */
    ElUploadProps.prototype.showFileList;
    /** @type {?} */
    ElUploadProps.prototype.listType;
    /** @type {?} */
    ElUploadProps.prototype.fileList;
    /** @type {?} */
    ElUploadProps.prototype.preview;
    /** @type {?} */
    ElUploadProps.prototype.remove;
    /** @type {?} */
    ElUploadProps.prototype.progress;
    /** @type {?} */
    ElUploadProps.prototype.success;
    /** @type {?} */
    ElUploadProps.prototype.error;
    /** @type {?} */
    ElUploadProps.prototype.uploadFilter;
}
//# sourceMappingURL=upload.props.js.map