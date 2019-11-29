import { EventEmitter, Input, Output } from '@angular/core';
var ElPaginationProps = /** @class */ (function () {
    function ElPaginationProps() {
        this.small = false;
        this.layout = ['prev', 'pager', 'next', 'total'];
        this.pageSize = 10;
        this.pageSizes = [10, 20, 30, 40, 50, 100];
        this.model = 1; // current page
        this.modelChange = new EventEmitter();
    }
    ElPaginationProps.propDecorators = {
        'small': [{ type: Input },],
        'total': [{ type: Input },],
        'layout': [{ type: Input },],
        'pageSize': [{ type: Input, args: ['page-size',] },],
        'pageSizes': [{ type: Input, args: ['page-sizes',] },],
        'pageCount': [{ type: Input, args: ['page-count',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElPaginationProps;
}());
export { ElPaginationProps };
function ElPaginationProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPaginationProps.propDecorators;
    /** @type {?} */
    ElPaginationProps.prototype.small;
    /** @type {?} */
    ElPaginationProps.prototype.total;
    /** @type {?} */
    ElPaginationProps.prototype.layout;
    /** @type {?} */
    ElPaginationProps.prototype.pageSize;
    /** @type {?} */
    ElPaginationProps.prototype.pageSizes;
    /** @type {?} */
    ElPaginationProps.prototype.pageCount;
    /** @type {?} */
    ElPaginationProps.prototype.model;
    /** @type {?} */
    ElPaginationProps.prototype.modelChange;
}
//# sourceMappingURL=pagination.props.js.map