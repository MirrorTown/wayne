import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateFormat } from '../utils/format';
var ElDateTable = /** @class */ (function () {
    function ElDateTable() {
        this.modelChange = new EventEmitter();
        this.weeks = ['日', '一', '二', '三', '四', '五', '六'];
        this.tableRows = [[], [], [], [], [], []];
        this.targetMonthOffset = 0; // default: current month, offset = 0
    }
    /**
     * @param {?} first
     * @param {?} lastCount
     * @return {?}
     */
    ElDateTable.BuildMonthStartRow = function (first, lastCount) {
        var /** @type {?} */ lastday = 7 - first;
        // first loop
        lastCount++;
        lastday++;
        return [0, 1, 2, 3, 4, 5, 6].map(function () {
            lastday--;
            if (lastday > 0)
                return { day: lastday, monthOffset: 0 };
            lastCount--;
            return { day: lastCount, monthOffset: -1 };
        }).reverse();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ElDateTable.prototype.isToday = function (item) {
        if (this.currentMonthOffset === null)
            return false;
        return item.monthOffset === this.currentMonthOffset && this.today === item.day;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ElDateTable.prototype.isTargetDay = function (item) {
        return item.monthOffset === this.targetMonthOffset && item.day === this.targetDay;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ElDateTable.prototype.clickHandle = function (item) {
        var /** @type {?} */ date = this.date;
        var /** @type {?} */ currentMonth = date.getMonth() + 1;
        var /** @type {?} */ targetMonth = currentMonth + item.monthOffset;
        // update target and update view
        this.targetDay = item.day;
        this.targetMonthOffset = item.monthOffset;
        // get time and emit a number
        date.setMonth(targetMonth - 1);
        date.setDate(item.day);
        this.modelChange.emit(date.getTime());
    };
    /**
     * @return {?}
     */
    ElDateTable.prototype.getRows = function () {
        var /** @type {?} */ date = this.date;
        this.targetDay = date.getDate();
        this.today = new Date().getDate();
        this.currentMonthOffset = DateFormat.getCurrentMonthOffset(date);
        var /** @type {?} */ lastMonth = date.getMonth() - 1;
        var /** @type {?} */ lastYear = lastMonth < 0 ? date.getFullYear() - 1 : date.getFullYear();
        var /** @type {?} */ currentMonthdayCount = DateFormat.getDayCountOfMonth(date.getFullYear(), date.getMonth());
        var /** @type {?} */ lastMonthDayCount = DateFormat.getDayCountOfMonth(lastYear, lastMonth < 0 ? 12 : lastMonth);
        var /** @type {?} */ firstDay = DateFormat.getFirstDayOfMonth(date);
        var /** @type {?} */ nextMonthDay = 0;
        this.tableRows = this.tableRows.map(function (row, index) {
            if (index === 0) {
                return ElDateTable.BuildMonthStartRow(firstDay, lastMonthDayCount);
            }
            var /** @type {?} */ thisWeekFirstDay = 7 - firstDay + 7 * (index - 1);
            return new Array(7).fill(0).map(function (v, i) {
                var /** @type {?} */ start = thisWeekFirstDay + i + 1;
                if (start <= currentMonthdayCount)
                    return { day: start, monthOffset: 0 };
                nextMonthDay++;
                return { day: nextMonthDay, monthOffset: 1 };
            });
        });
    };
    /**
     * @return {?}
     */
    ElDateTable.prototype.ngOnInit = function () {
        this.date = new Date(this.model);
        this.getRows();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElDateTable.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        if (changes.model.isFirstChange())
            return;
        this.model = changes.model.currentValue;
        this.date = new Date(this.model);
        this.getRows();
    };
    ElDateTable.decorators = [
        { type: Component, args: [{
                    selector: 'el-date-table',
                    providers: [DateFormat],
                    template: "\n    <table class=\"el-date-table\" cellspacing=\"0\" cellpadding=\"0\">\n      <tbody>\n      <tr>\n        <th *ngFor=\"let week of weeks\">{{week}}</th>\n      </tr>\n      <tr class=\"el-date-table__row\"\n          *ngFor=\"let row of tableRows\">\n        <td *ngFor=\"let item of row\"\n          [class.available]=\"item.monthOffset === 0\"\n          [class.next-month]=\"item.monthOffset === 1\"\n          [class.prev-month]=\"item.monthOffset === -1\"\n          [class.normal]=\"item.monthOffset === 0\"\n          [class.today]=\"isToday(item)\"\n          [class.current]=\"isTargetDay(item)\"\n          (click)=\"clickHandle(item)\">\n          <div>\n            <span>{{item.day}}</span>\n          </div>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDateTable.ctorParameters = function () { return []; };
    ElDateTable.propDecorators = {
        'model': [{ type: Input },],
        'disabledDate': [{ type: Input, args: ['disabled-date',] },],
        'modelChange': [{ type: Output },],
    };
    return ElDateTable;
}());
export { ElDateTable };
function ElDateTable_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDateTable.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDateTable.ctorParameters;
    /** @type {?} */
    ElDateTable.propDecorators;
    /** @type {?} */
    ElDateTable.prototype.model;
    /** @type {?} */
    ElDateTable.prototype.disabledDate;
    /** @type {?} */
    ElDateTable.prototype.modelChange;
    /** @type {?} */
    ElDateTable.prototype.weeks;
    /** @type {?} */
    ElDateTable.prototype.tableRows;
    /** @type {?} */
    ElDateTable.prototype.targetDay;
    /** @type {?} */
    ElDateTable.prototype.targetMonthOffset;
    /** @type {?} */
    ElDateTable.prototype.date;
    /** @type {?} */
    ElDateTable.prototype.today;
    /** @type {?} */
    ElDateTable.prototype.currentMonthOffset;
}
//# sourceMappingURL=date-table.js.map