import { Injectable } from '@angular/core';
var DateFormat = /** @class */ (function () {
    function DateFormat() {
    }
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormat.checkedDate = function (date) {
        return typeof date === 'number' ? new Date(date) : date;
    };
    /**
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    DateFormat.getDayCountOfMonth = function (year, month) {
        var /** @type {?} */ isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        return [
            month === 1 && !isLeapYear,
            month === 1 && isLeapYear,
            !!([3, 5, 8, 10].find(function (num) { return num === month; })),
            true,
        ].reduce(function (pre, next, index) { return pre ? pre : (next ? 28 + index : 0); }, 0);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormat.getFirstDayOfMonth = function (date) {
        var /** @type {?} */ checkedDate = DateFormat.checkedDate(date);
        checkedDate.setDate(1);
        return checkedDate.getDay();
    };
    /**
     * @param {?} targetDate
     * @return {?}
     */
    DateFormat.getCurrentMonthOffset = function (targetDate) {
        var /** @type {?} */ checkedDate = DateFormat.checkedDate(targetDate);
        var /** @type {?} */ currentDate = new Date();
        if (currentDate.getFullYear() !== checkedDate.getFullYear()) {
            return null;
        }
        var /** @type {?} */ offset = currentDate.getMonth() - checkedDate.getMonth();
        return (offset > 1 || offset < -1) ? null : offset;
    };
    /**
     * @param {?} input
     * @param {?} format
     * @return {?}
     */
    DateFormat.moment = function (input, format) {
        var /** @type {?} */ d = new Date(input);
        if (String(d) === 'Invalid Date')
            return '';
        var /** @type {?} */ makeReg = function (value) { return new RegExp("(" + value + ")"); };
        var /** @type {?} */ keys = ['M+', 'd+', 'h+', 'm+', 's+', 'q+', 'S'];
        var /** @type {?} */ values = [
            d.getMonth() + 1,
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds(),
            Math.floor((d.getMonth() + 3) / 3),
            d.getMilliseconds(),
        ];
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        var /** @type {?} */ len = 0, /** @type {?} */ key, /** @type {?} */ val;
        while (len < keys.length) {
            key = keys[len];
            val = values[len];
            if (makeReg(key).test(format)) {
                format = ((format)).replace(RegExp.$1, (RegExp.$1.length === 1) ? val : ('00' + val).substr(('' + val).length));
            }
            len++;
        }
        return format;
    };
    /**
     * @param {?=} input
     * @return {?}
     */
    DateFormat.prototype.getTime = function (input) {
        var /** @type {?} */ date = new Date(input);
        if (String(date) === 'Invalid Date') {
            return 0;
        }
        return date.getTime();
    };
    DateFormat.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    DateFormat.ctorParameters = function () { return []; };
    return DateFormat;
}());
export { DateFormat };
function DateFormat_tsickle_Closure_declarations() {
    /** @type {?} */
    DateFormat.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DateFormat.ctorParameters;
}
//# sourceMappingURL=format.js.map