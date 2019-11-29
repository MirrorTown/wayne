import { Component, Input } from '@angular/core';
var ElTableHeader = /** @class */ (function () {
    function ElTableHeader() {
        this.model = [];
        this.border = false;
        this.columnsWidth = [];
    }
    /**
     * @param {?} th
     * @return {?}
     */
    ElTableHeader.prototype.makeClasses = function (th) {
        var /** @type {?} */ isLeaf = this.getColspan(th) > 1 ? '' : 'is-leaf';
        return this.height === 'auto' ? isLeaf + " " : ' gutter';
    };
    /**
     * @param {?} td
     * @return {?}
     */
    ElTableHeader.prototype.getRowspan = function (td) {
        if (td.deep === 0 && td.level !== 0) {
            return td.level + 1;
        }
        return 1;
    };
    /**
     * @param {?} th
     * @return {?}
     */
    ElTableHeader.prototype.getColspan = function (th) {
        return th.childCount > 0 ? th.childCount : 1;
    };
    ElTableHeader.decorators = [
        { type: Component, args: [{
                    selector: 'el-table-header',
                    template: "\n    <ng-template #widthTmp>\n      <col *ngFor=\"let item of columnsWidth\" [width]=\"item.width\">\n    </ng-template>\n    <table class=\"el-table__header\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"\n      [ngStyle]=\"{ width: '100%' }\">\n      <ng-template [ngTemplateOutlet]=\"widthTmp\">\n      </ng-template>\n\n      <tr *ngFor=\"let tr of model\">\n        <th *ngFor=\"let th of tr\" [class]=\"makeClasses(th)\"\n            [ngStyle]=\"{ width: th.width | cssValue }\"\n            [attr.colspan]=\"getColspan(th)\" [attr.rowspan]=\"getRowspan(th)\">\n          <div class=\"cell\" [ngStyle]=\"{\n            width: th.width | cssValue,\n            'display': center ? 'block' : 'inline-block',\n            'text-align': center ? 'center' : 'unset' }\">{{th.label}}</div>\n        </th>\n      </tr>\n    </table>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTableHeader.ctorParameters = function () { return []; };
    ElTableHeader.propDecorators = {
        'model': [{ type: Input },],
        'layout': [{ type: Input },],
        'border': [{ type: Input },],
        'height': [{ type: Input },],
        'center': [{ type: Input },],
        'columnsWidth': [{ type: Input, args: ['columns-width',] },],
    };
    return ElTableHeader;
}());
export { ElTableHeader };
function ElTableHeader_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTableHeader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTableHeader.ctorParameters;
    /** @type {?} */
    ElTableHeader.propDecorators;
    /** @type {?} */
    ElTableHeader.prototype.model;
    /** @type {?} */
    ElTableHeader.prototype.layout;
    /** @type {?} */
    ElTableHeader.prototype.border;
    /** @type {?} */
    ElTableHeader.prototype.height;
    /** @type {?} */
    ElTableHeader.prototype.center;
    /** @type {?} */
    ElTableHeader.prototype.columnsWidth;
}
//# sourceMappingURL=header.js.map