import { EventEmitter, Input, Output } from '@angular/core';
var ElTableProps = /** @class */ (function () {
    function ElTableProps() {
        this.height = 'auto';
        // @Input('max-height') maxHeight: string
        this.placeholder = '暂无数据';
        this.stripe = false;
        this.border = false;
        this.scrollX = false;
        this.showHeader = true;
        this.center = '';
        // bind value
        this.model = 0;
        this.modelChange = new EventEmitter();
        this.select = new EventEmitter();
        this.selectAll = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.cellMouseEnter = new EventEmitter();
        this.cellMouseLeave = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.cellDblclick = new EventEmitter();
    }
    ElTableProps.propDecorators = {
        'height': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'stripe': [{ type: Input },],
        'border': [{ type: Input },],
        'scrollX': [{ type: Input, args: ['scroll-x',] },],
        'showHeader': [{ type: Input, args: ['show-header',] },],
        'center': [{ type: Input, args: ['center',] },],
        'rowClassName': [{ type: Input, args: ['row-class-name',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
        'select': [{ type: Output },],
        'selectAll': [{ type: Output, args: ['select-all',] },],
        'selectionChange': [{ type: Output, args: ['selection-change',] },],
        'cellMouseEnter': [{ type: Output, args: ['cell-mouse-enter',] },],
        'cellMouseLeave': [{ type: Output, args: ['cell-mouse-leave',] },],
        'cellClick': [{ type: Output, args: ['cell-click',] },],
        'cellDblclick': [{ type: Output, args: ['cell-dblclick',] },],
    };
    return ElTableProps;
}());
export { ElTableProps };
function ElTableProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTableProps.propDecorators;
    /** @type {?} */
    ElTableProps.prototype.height;
    /** @type {?} */
    ElTableProps.prototype.placeholder;
    /** @type {?} */
    ElTableProps.prototype.stripe;
    /** @type {?} */
    ElTableProps.prototype.border;
    /** @type {?} */
    ElTableProps.prototype.scrollX;
    /** @type {?} */
    ElTableProps.prototype.showHeader;
    /** @type {?} */
    ElTableProps.prototype.center;
    /** @type {?} */
    ElTableProps.prototype.rowClassName;
    /** @type {?} */
    ElTableProps.prototype.model;
    /** @type {?} */
    ElTableProps.prototype.modelChange;
    /** @type {?} */
    ElTableProps.prototype.select;
    /** @type {?} */
    ElTableProps.prototype.selectAll;
    /** @type {?} */
    ElTableProps.prototype.selectionChange;
    /** @type {?} */
    ElTableProps.prototype.cellMouseEnter;
    /** @type {?} */
    ElTableProps.prototype.cellMouseLeave;
    /** @type {?} */
    ElTableProps.prototype.cellClick;
    /** @type {?} */
    ElTableProps.prototype.cellDblclick;
}
//# sourceMappingURL=table.props.js.map