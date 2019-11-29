import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElYearTable = /** @class */ (function () {
    function ElYearTable() {
        this.showWeekNumber = false;
        this.modelChange = new EventEmitter();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    ElYearTable.prototype.clickHandle = function (year) {
        this.currentYear = year;
        this.date.setFullYear(year);
        this.modelChange.emit(this.date.getTime());
    };
    /**
     * @param {?} currentYear
     * @return {?}
     */
    ElYearTable.prototype.updateYearRow = function (currentYear) {
        var /** @type {?} */ startYear = ~~(currentYear / 10) * 10;
        return [[], [], []].map(function (v, index) {
            return [0, 1, 2, 3].map(function (num) { return startYear + (index * 4) + num; });
        });
    };
    /**
     * @return {?}
     */
    ElYearTable.prototype.ngOnInit = function () {
        this.date = new Date(this.model);
        this.currentYear = this.date.getFullYear();
        this.yearRows = this.updateYearRow(this.currentYear);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElYearTable.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        if (changes.model.isFirstChange())
            return;
        this.model = changes.model.currentValue;
        this.date = new Date(this.model);
        this.currentYear = this.date.getFullYear();
        this.yearRows = this.updateYearRow(this.currentYear);
    };
    ElYearTable.decorators = [
        { type: Component, args: [{
                    selector: 'el-year-table',
                    template: "\n    <table class=\"el-year-table\">\n      <tbody>\n      <tr *ngFor=\"let years of yearRows\">\n        <td class=\"available\" *ngFor=\"let year of years\"\n          [class.current]=\"year === currentYear\"\n          (click)=\"clickHandle(year)\">\n          <a class=\"cell\">{{year}}</a>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElYearTable.ctorParameters = function () { return []; };
    ElYearTable.propDecorators = {
        'showWeekNumber': [{ type: Input },],
        'model': [{ type: Input },],
        'disabledDate': [{ type: Input, args: ['disabled-date',] },],
        'modelChange': [{ type: Output },],
    };
    return ElYearTable;
}());
export { ElYearTable };
function ElYearTable_tsickle_Closure_declarations() {
    /** @type {?} */
    ElYearTable.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElYearTable.ctorParameters;
    /** @type {?} */
    ElYearTable.propDecorators;
    /** @type {?} */
    ElYearTable.prototype.showWeekNumber;
    /** @type {?} */
    ElYearTable.prototype.model;
    /** @type {?} */
    ElYearTable.prototype.disabledDate;
    /** @type {?} */
    ElYearTable.prototype.modelChange;
    /** @type {?} */
    ElYearTable.prototype.date;
    /** @type {?} */
    ElYearTable.prototype.yearRows;
    /** @type {?} */
    ElYearTable.prototype.currentYear;
}
//# sourceMappingURL=year-table.js.map