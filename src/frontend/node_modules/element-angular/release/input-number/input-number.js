var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, forwardRef } from '@angular/core';
import { ElInputNumberPoprs } from './input-number-props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElInputNumber = /** @class */ (function (_super) {
    __extends(ElInputNumber, _super);
    function ElInputNumber() {
        var _this = _super.call(this) || this;
        _this.minDisabled = false;
        _this.maxDisabled = false;
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ElInputNumber.prototype.changeHandle = function (value) {
        var /** @type {?} */ oldValue = this.model;
        this.model = value;
        if (Number.isNaN(+this.model)) {
            this.model = oldValue;
            return;
        }
        this.maxDisabled = value > this.max;
        this.minDisabled = value < this.min;
        if (this.maxDisabled)
            return this.dispatchModel(this.max);
        if (this.minDisabled)
            return this.dispatchModel(this.min);
        this.modelChange.emit(value);
    };
    /**
     * @param {?} limit
     * @return {?}
     */
    ElInputNumber.prototype.dispatchModel = function (limit) {
        var _this = this;
        var /** @type {?} */ timer = setTimeout(function () {
            _this.model = limit;
            _this.modelChange.emit(limit);
            clearTimeout(timer);
        }, this.debounce);
    };
    /**
     * @param {?=} calcType
     * @return {?}
     */
    ElInputNumber.prototype.decreaseHandle = function (calcType) {
        if (calcType === void 0) { calcType = true; }
        if (this.elDisabled)
            return;
        var /** @type {?} */ step = calcType ? this.step : 0 - this.step;
        var /** @type {?} */ val = Number(this.model) + step;
        if (Number.isNaN(val))
            return;
        this.maxDisabled = val > this.max;
        this.minDisabled = val < this.min;
        if (!this.maxDisabled && !this.minDisabled) {
            this.model = val;
            this.modelChange.emit(this.model);
            this.controlChange(this.model);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElInputNumber.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElInputNumber.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElInputNumber.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElInputNumber.decorators = [
        { type: Component, args: [{
                    selector: 'el-input-number',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElInputNumber; }),
                            multi: true
                        }],
                    styles: ["\n    .el-input-spin-button::-webkit-inner-spin-button { visibility: hidden; -webkit-appearance: none; }\n    .el-input-spin-button { -moz-appearance: textfield; }\n  "],
                    template: "\n    <div [class]=\"'el-input-number' + (size ? ' el-input-number--' + size : '')\"\n      [class.is-disabled]=\"elDisabled\" [class.is-without-controls]=\"!controls\">\n      <span *ngIf=\"controls\" class=\"el-input-number__decrease\" role=\"button\"\n        [class.is-disabled]=\"minDisabled\" (click)=\"decreaseHandle(false)\">\n        <i class=\"el-icon-minus\"></i>\n      </span>\n      <span *ngIf=\"controls\" class=\"el-input-number__increase\" role=\"button\"\n        [class.is-disabled]=\"maxDisabled\" (click)=\"decreaseHandle(true)\">\n        <i class=\"el-icon-plus\"></i>\n      </span>\n\n      <div [class]=\"'el-input ' + (size ? ' el-input--' + size : '')\" [class.is-disabled]=\"elDisabled\">\n        <input class=\"el-input__inner el-input-spin-button  \" autocomplete=\"off\" role=\"spinbutton\"\n          [attr.max]=\"max\" [attr.min]=\"min\" [attr.aria-valuemax]=\"max\" [attr.aria-valuemin]=\"min\"\n          [disabled]=\"elDisabled\" [value]=\"model\" [ngModel]=\"model\" (ngModelChange)=\"changeHandle($event)\"\n          type=\"number\" rows=\"2\" aria-valuenow=\"1\" [attr.aria-disabled]=\"elDisabled\">\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElInputNumber.ctorParameters = function () { return []; };
    return ElInputNumber;
}(ElInputNumberPoprs));
export { ElInputNumber };
function ElInputNumber_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInputNumber.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElInputNumber.ctorParameters;
    /** @type {?} */
    ElInputNumber.prototype.minDisabled;
    /** @type {?} */
    ElInputNumber.prototype.maxDisabled;
    /** @type {?} */
    ElInputNumber.prototype.controlChange;
    /** @type {?} */
    ElInputNumber.prototype.controlTouch;
}
//# sourceMappingURL=input-number.js.map