import { Component, EventEmitter, Input, Output } from '@angular/core';
var EMonthTable = /** @class */ (function () {
    function EMonthTable() {
        this.showWeekNumber = false;
        this.modelChange = new EventEmitter();
        this.monthRows = [
            ['一月', '二月', '三月', '四月'],
            ['五月', '六月', '七月', '八月'],
            ['九月', '十月', '十一月', '十二月'],
        ];
    }
    /**
     * @param {?} i
     * @param {?} k
     * @return {?}
     */
    EMonthTable.prototype.clickHandle = function (i, k) {
        var /** @type {?} */ monthID = 4 * i + k;
        this.currentMonth = monthID;
        this.date.setMonth(monthID);
        this.modelChange.emit(this.date.getTime());
    };
    /**
     * @param {?} i
     * @param {?} k
     * @return {?}
     */
    EMonthTable.prototype.isCurrentMonth = function (i, k) {
        return this.currentMonth === 4 * i + k;
    };
    /**
     * @return {?}
     */
    EMonthTable.prototype.ngOnInit = function () {
        this.date = new Date(this.model);
        this.currentMonth = this.date.getMonth();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    EMonthTable.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        if (changes.model.isFirstChange())
            return;
        this.model = changes.model.currentValue;
        this.date = new Date(this.model);
        this.currentMonth = this.date.getMonth();
    };
    EMonthTable.decorators = [
        { type: Component, args: [{
                    selector: 'el-month-table',
                    template: "\n    <table class=\"el-month-table\">\n      <tbody>\n      <tr *ngFor=\"let row of monthRows; let i = index;\">\n        <td class=\"available\"\n            *ngFor=\"let item of row; let k = index;\"\n            [class.current]=\"isCurrentMonth(i, k)\"\n            (click)=\"clickHandle(i, k)\">\n          <a class=\"cell\">{{ item }}</a>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    EMonthTable.ctorParameters = function () { return []; };
    EMonthTable.propDecorators = {
        'showWeekNumber': [{ type: Input },],
        'model': [{ type: Input },],
        'disabledDate': [{ type: Input, args: ['disabled-date',] },],
        'modelChange': [{ type: Output },],
    };
    return EMonthTable;
}());
export { EMonthTable };
function EMonthTable_tsickle_Closure_declarations() {
    /** @type {?} */
    EMonthTable.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    EMonthTable.ctorParameters;
    /** @type {?} */
    EMonthTable.propDecorators;
    /** @type {?} */
    EMonthTable.prototype.showWeekNumber;
    /** @type {?} */
    EMonthTable.prototype.model;
    /** @type {?} */
    EMonthTable.prototype.disabledDate;
    /** @type {?} */
    EMonthTable.prototype.modelChange;
    /** @type {?} */
    EMonthTable.prototype.currentMonth;
    /** @type {?} */
    EMonthTable.prototype.date;
    /** @type {?} */
    EMonthTable.prototype.monthRows;
}
//# sourceMappingURL=month-table.js.map