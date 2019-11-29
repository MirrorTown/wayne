import { Component, Input, EventEmitter, Output, } from '@angular/core';
import { ElTableFormat } from '../utils/format';
import { DomSanitizer } from '@angular/platform-browser';
var ElTableBody = /** @class */ (function () {
    /**
     * @param {?} tableFormat
     * @param {?} sanitizer
     */
    function ElTableBody(tableFormat, sanitizer) {
        this.tableFormat = tableFormat;
        this.sanitizer = sanitizer;
        this.stripe = false;
        this.center = false;
        this.cellClick = new EventEmitter();
        this.cellDblClick = new EventEmitter();
        this.cellMouseEnter = new EventEmitter();
        this.cellMouseLeave = new EventEmitter();
        this.formatModel = [];
    }
    /**
     * @param {?} str
     * @return {?}
     */
    ElTableBody.prototype.renderHtml = function (str) {
        return this.sanitizer.bypassSecurityTrustHtml(str);
    };
    /**
     * @param {?} domHandle
     * @param {?} next
     * @return {?}
     */
    ElTableBody.prototype.merge = function (domHandle, next) {
        return Object.assign(domHandle, next);
    };
    /**
     * @param {?} content
     * @return {?}
     */
    ElTableBody.prototype.isTemplateRef = function (content) {
        return content && typeof content === 'object';
    };
    /**
     * @return {?}
     */
    ElTableBody.prototype.getBodyWidth = function () {
        var /** @type {?} */ width = ElTableFormat.getCSSValue(this.layout.bodyWidth);
        if (!width)
            return this.layout.bodyWidth;
        return width - this.layout.scrollBarWidth;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElTableBody.prototype.getFormatModel = function (index) {
        return this.formatModel[index];
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElTableBody.prototype.destroyRowFunc = function (index) {
        var _this = this;
        return function () {
            _this.model.splice(index, 1);
            _this.formatModel = _this.tableFormat.formatRowData(_this.model);
        };
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElTableBody.prototype.makeRowClass = function (index) {
        var /** @type {?} */ userRows = this.formatModel[index];
        var /** @type {?} */ userClass = this.rowClassName ? this.rowClassName(userRows, index) : '';
        return 'el-table__row ' + userClass;
    };
    /**
     * @param {?} event
     * @param {?} Ref
     * @return {?}
     */
    ElTableBody.prototype.doubleClickHandle = function (event, Ref) {
        Ref.event = event;
        this.cellDblClick.emit(Ref);
    };
    /**
     * @param {?} event
     * @param {?} Ref
     * @return {?}
     */
    ElTableBody.prototype.clickHandle = function (event, Ref) {
        Ref.event = event;
        this.cellClick.emit(Ref);
    };
    /**
     * @param {?} event
     * @param {?} isEnter
     * @return {?}
     */
    ElTableBody.prototype.cellMouseActionHandle = function (event, isEnter) {
        if (isEnter)
            return this.cellMouseEnter.emit(event);
        this.cellMouseLeave.emit(event);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElTableBody.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        this.formatModel = this.tableFormat.formatRowData(this.model);
    };
    ElTableBody.decorators = [
        { type: Component, args: [{
                    selector: 'el-table-body',
                    template: "\n    <table class=\"el-table__body\" [ngStyle]=\"{ width: getBodyWidth() | cssValue }\"\n      cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n      <tr *ngFor=\"let tr of model; let k = index\" #tableRow\n        [hidden]=\"tr.hidden\"\n        [class]=\"makeRowClass(k)\"\n        [class.hover-row]=\"tableRow.hover\"\n        [class.el-table__row--striped]=\"stripe && k % 2 === 1\"\n        (mouseenter)=\"tableRow.hover = true\" (mouseleave)=\"tableRow.hover = false\">\n        <ng-container *ngFor=\"let td of tr; let i = index;\">\n          <td *ngIf=\"!td.hidden\" #tdRef\n            [ngStyle]=\"{ width: td.width | cssValue }\"\n            [class]=\"'el-table_1_column_' + (i + 1)\"\n            (mouseenter)=\"cellMouseActionHandle($event, true);tdRef.destroy = destroyRowFunc(k);\"\n            (mouseleave)=\"cellMouseActionHandle($event, false)\"\n            (click)=\"clickHandle($event, tdRef)\"\n            (dblclick)=\"doubleClickHandle($event, tdRef)\">\n            <div class=\"cell\" [ngStyle]=\"{ 'text-align': center ? 'center' : 'unset' }\">\n              <ng-container *ngIf=\"!isTemplateRef(td.value) && !td._renderHTML\">{{ td.value }}</ng-container>\n              <div *ngIf=\"!isTemplateRef(td.value) && td._renderHTML\" [innerHtml]=\"renderHtml(td.value)\"></div>\n              <ng-container *ngIf=\"isTemplateRef(td.value)\">\n                <ng-template [ngTemplateOutlet]=\"td.value\" [ngTemplateOutletContext]=\"{\n                scope: merge(tdRef, {rowData: getFormatModel(k), index: k})}\"></ng-template>\n              </ng-container>\n            </div>\n          </td>\n        </ng-container>\n      </tr>\n    </table>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTableBody.ctorParameters = function () { return [
        { type: ElTableFormat, },
        { type: DomSanitizer, },
    ]; };
    ElTableBody.propDecorators = {
        'model': [{ type: Input, args: ['model',] },],
        'stripe': [{ type: Input },],
        'center': [{ type: Input },],
        'layout': [{ type: Input },],
        'rowClassName': [{ type: Input, args: ['row-class-name',] },],
        'cellClick': [{ type: Output, args: ['cell-click',] },],
        'cellDblClick': [{ type: Output, args: ['cell-dblclick',] },],
        'cellMouseEnter': [{ type: Output, args: ['cell-mouse-enter',] },],
        'cellMouseLeave': [{ type: Output, args: ['cell-mouse-leave',] },],
    };
    return ElTableBody;
}());
export { ElTableBody };
function ElTableBody_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTableBody.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTableBody.ctorParameters;
    /** @type {?} */
    ElTableBody.propDecorators;
    /** @type {?} */
    ElTableBody.prototype.model;
    /** @type {?} */
    ElTableBody.prototype.stripe;
    /** @type {?} */
    ElTableBody.prototype.center;
    /** @type {?} */
    ElTableBody.prototype.layout;
    /** @type {?} */
    ElTableBody.prototype.rowClassName;
    /** @type {?} */
    ElTableBody.prototype.cellClick;
    /** @type {?} */
    ElTableBody.prototype.cellDblClick;
    /** @type {?} */
    ElTableBody.prototype.cellMouseEnter;
    /** @type {?} */
    ElTableBody.prototype.cellMouseLeave;
    /** @type {?} */
    ElTableBody.prototype.formatModel;
    /** @type {?} */
    ElTableBody.prototype.tableFormat;
    /** @type {?} */
    ElTableBody.prototype.sanitizer;
}
//# sourceMappingURL=body.js.map