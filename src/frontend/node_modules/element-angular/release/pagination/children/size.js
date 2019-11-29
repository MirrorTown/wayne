import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElPaginationSize = /** @class */ (function () {
    function ElPaginationSize() {
        this.modelChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ElPaginationSize.prototype.ngOnInit = function () {
        this.options = this.sizes.map(function (size) { return ({
            value: size,
            label: size + '条/页',
        }); });
    };
    ElPaginationSize.decorators = [
        { type: Component, args: [{
                    selector: 'el-pagination-size',
                    template: "\n    <el-select [model]=\"model\" (modelChange)=\"modelChange.emit($event)\"\n      popper-class=\"is-arrow-fixed\">\n      <el-option *ngFor=\"let item of options\"\n        [label]=\"item.label\"\n        [value]=\"item.value\"></el-option>\n    </el-select>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElPaginationSize.ctorParameters = function () { return []; };
    ElPaginationSize.propDecorators = {
        'model': [{ type: Input },],
        'sizes': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElPaginationSize;
}());
export { ElPaginationSize };
function ElPaginationSize_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPaginationSize.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElPaginationSize.ctorParameters;
    /** @type {?} */
    ElPaginationSize.propDecorators;
    /** @type {?} */
    ElPaginationSize.prototype.model;
    /** @type {?} */
    ElPaginationSize.prototype.sizes;
    /** @type {?} */
    ElPaginationSize.prototype.modelChange;
    /** @type {?} */
    ElPaginationSize.prototype.options;
}
//# sourceMappingURL=size.js.map