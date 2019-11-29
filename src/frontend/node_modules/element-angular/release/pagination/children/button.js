import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
var ElPaginationButton = /** @class */ (function () {
    function ElPaginationButton() {
        this.disabled = false;
        this.next = new EventEmitter();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    ElPaginationButton.prototype.clickHandle = function (step) {
        if (this.disabled)
            return;
        this.next.emit(step);
    };
    ElPaginationButton.decorators = [
        { type: Component, args: [{
                    selector: 'el-pagination-btn',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <button type=\"button\" class=\"btn-prev\"\n      *ngIf=\"dir === 'left'\"\n      [class.disabled]=\"disabled\"\n      (click)=\"clickHandle(-1)\">\n      <i class=\"el-icon el-icon-arrow-left\"></i>\n    </button>\n    <button type=\"button\" class=\"btn-next\"\n      *ngIf=\"dir === 'right'\"\n      [class.disabled]=\"disabled\"\n      (click)=\"clickHandle(1)\">\n    <i class=\"el-icon el-icon-arrow-right\"></i>\n    </button>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElPaginationButton.ctorParameters = function () { return []; };
    ElPaginationButton.propDecorators = {
        'dir': [{ type: Input },],
        'disabled': [{ type: Input },],
        'next': [{ type: Output },],
    };
    return ElPaginationButton;
}());
export { ElPaginationButton };
function ElPaginationButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPaginationButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElPaginationButton.ctorParameters;
    /** @type {?} */
    ElPaginationButton.propDecorators;
    /** @type {?} */
    ElPaginationButton.prototype.dir;
    /** @type {?} */
    ElPaginationButton.prototype.disabled;
    /** @type {?} */
    ElPaginationButton.prototype.next;
}
//# sourceMappingURL=button.js.map