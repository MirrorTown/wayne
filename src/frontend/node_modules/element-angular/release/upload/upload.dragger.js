import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElUploadDragger = /** @class */ (function () {
    function ElUploadDragger() {
        this.elDisabled = false;
        this.change = new EventEmitter();
        this.dragger = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ElUploadDragger.prototype.dragoverHandle = function (event) {
        event.preventDefault();
        if (this.elDisabled)
            return;
        this.dragger = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElUploadDragger.prototype.dragLeaveHandle = function (event) {
        event.preventDefault();
        this.dragger = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElUploadDragger.prototype.dropHandle = function (event) {
        event.preventDefault();
        if (this.elDisabled)
            return;
        this.change.emit({ target: { files: event.dataTransfer.files } });
    };
    ElUploadDragger.decorators = [
        { type: Component, args: [{
                    selector: 'el-upload-dragger',
                    template: "\n    <div class=\"el-upload-dragger\"\n      [class.is-dragover]=\"dragger\"\n      (drop)=\"dropHandle($event)\"\n      (dragover)=\"dragoverHandle($event)\"\n      (dragleave)=\"dragLeaveHandle($event)\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElUploadDragger.ctorParameters = function () { return []; };
    ElUploadDragger.propDecorators = {
        'elDisabled': [{ type: Input },],
        'change': [{ type: Output },],
    };
    return ElUploadDragger;
}());
export { ElUploadDragger };
function ElUploadDragger_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadDragger.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUploadDragger.ctorParameters;
    /** @type {?} */
    ElUploadDragger.propDecorators;
    /** @type {?} */
    ElUploadDragger.prototype.elDisabled;
    /** @type {?} */
    ElUploadDragger.prototype.change;
    /** @type {?} */
    ElUploadDragger.prototype.dragger;
}
//# sourceMappingURL=upload.dragger.js.map