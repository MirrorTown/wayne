import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElPaginationJump = /** @class */ (function () {
    function ElPaginationJump() {
        this.next = new EventEmitter();
    }
    /**
     * @param {?} page
     * @param {?} max
     * @return {?}
     */
    ElPaginationJump.nextPageNumber = function (page, max) {
        if (page <= 1)
            return 1;
        if (page >= max)
            return max;
        return page;
    };
    /**
     * @param {?} nextValue
     * @return {?}
     */
    ElPaginationJump.prototype.changeHandle = function (nextValue) {
        if (Number.isNaN(+nextValue))
            return;
        var /** @type {?} */ next = ElPaginationJump.nextPageNumber(+nextValue, this.max);
        var /** @type {?} */ pre = this.model;
        this.model = Math.round(next);
        this.next.emit(this.model - pre);
    };
    ElPaginationJump.decorators = [
        { type: Component, args: [{
                    selector: 'el-pagination-jump',
                    template: "\n    <span class=\"el-pagination__jump\">\n      \u524D\u5F80\n    <div class=\"el-input el-pagination__editor is-in-pagination\">\n      <input class=\"el-input__inner\" type=\"number\" #input\n        autocomplete=\"off\" rows=\"2\"\n        [min]=\"1\" [max]=\"max\" [ngModel]=\"model\"\n        (keyup.enter)=\"changeHandle(input.value)\" (blur)=\"changeHandle(input.value)\"/>\n    </div>\n      \u9875\n    </span>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElPaginationJump.ctorParameters = function () { return []; };
    ElPaginationJump.propDecorators = {
        'model': [{ type: Input },],
        'max': [{ type: Input },],
        'next': [{ type: Output },],
    };
    return ElPaginationJump;
}());
export { ElPaginationJump };
function ElPaginationJump_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPaginationJump.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElPaginationJump.ctorParameters;
    /** @type {?} */
    ElPaginationJump.propDecorators;
    /** @type {?} */
    ElPaginationJump.prototype.model;
    /** @type {?} */
    ElPaginationJump.prototype.max;
    /** @type {?} */
    ElPaginationJump.prototype.next;
}
//# sourceMappingURL=jump.js.map