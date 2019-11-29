import { Injectable } from '@angular/core';
var ElTableFormat = /** @class */ (function () {
    function ElTableFormat() {
    }
    /**
     * @param {?} val
     * @return {?}
     */
    ElTableFormat.getCSSValue = function (val) {
        if (val === 'auto')
            return null;
        if (!Number.isNaN(+val))
            return +val;
        if (String(val).endsWith('px')) {
            return +String(val).split('px')[0];
        }
    };
    /**
     * @param {?} tableRows
     * @return {?}
     */
    ElTableFormat.prototype.formatRowData = function (tableRows) {
        var /** @type {?} */ elTableKeys = ['value', 'width', 'index'];
        var /** @type {?} */ tableRowsMap = tableRows.map(function (row, index) {
            var /** @type {?} */ currentRow = {};
            row.forEach(function (item) {
                return Object.keys(item).forEach(function (r) {
                    if (elTableKeys.indexOf(r) < 0) {
                        currentRow[r] = item[r];
                    }
                });
            });
            currentRow['index'] = index;
            return currentRow;
        });
        return tableRowsMap;
    };
    ElTableFormat.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    ElTableFormat.ctorParameters = function () { return []; };
    return ElTableFormat;
}());
export { ElTableFormat };
function ElTableFormat_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTableFormat.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTableFormat.ctorParameters;
}
//# sourceMappingURL=format.js.map