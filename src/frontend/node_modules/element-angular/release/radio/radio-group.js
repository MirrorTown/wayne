import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElRadioGroup = /** @class */ (function () {
    function ElRadioGroup() {
        this.elDisabled = false;
        this.fillColor = '#20a0ff';
        this.textColor = '#ffffff';
        this.modelChange = new EventEmitter();
        this.subscriber = [];
        this.controlChange = function () { };
        this.controlTouch = function () { };
    }
    Object.defineProperty(ElRadioGroup.prototype, "disabled", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            console.warn('Element Angular: (disabled) is discarded, use [elDisabled] replace it.');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} nextValue
     * @return {?}
     */
    ElRadioGroup.prototype.changeHandle = function (nextValue) {
        var _this = this;
        setTimeout(function () {
            _this.model = nextValue;
            _this.modelChange.emit(nextValue);
            _this.controlChange(nextValue);
            _this.subscriber.forEach(function (sub) { return sub(); });
        }, 0);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElRadioGroup.prototype.writeValue = function (value) {
        this.model = value;
        this.changeHandle(this.model);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElRadioGroup.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElRadioGroup.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElRadioGroup.decorators = [
        { type: Component, args: [{
                    selector: 'el-radio-group',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElRadioGroup; }),
                            multi: true,
                        }],
                    template: "\n    <div class=\"el-radio-group\" role=\"radiogroup\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRadioGroup.ctorParameters = function () { return []; };
    ElRadioGroup.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'buttonSize': [{ type: Input, args: ['size',] },],
        'fillColor': [{ type: Input, args: ['fill',] },],
        'textColor': [{ type: Input },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElRadioGroup;
}());
export { ElRadioGroup };
function ElRadioGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadioGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadioGroup.ctorParameters;
    /** @type {?} */
    ElRadioGroup.propDecorators;
    /** @type {?} */
    ElRadioGroup.prototype.elDisabled;
    /** @type {?} */
    ElRadioGroup.prototype.buttonSize;
    /** @type {?} */
    ElRadioGroup.prototype.fillColor;
    /** @type {?} */
    ElRadioGroup.prototype.textColor;
    /** @type {?} */
    ElRadioGroup.prototype.model;
    /** @type {?} */
    ElRadioGroup.prototype.modelChange;
    /** @type {?} */
    ElRadioGroup.prototype.subscriber;
    /** @type {?} */
    ElRadioGroup.prototype.controlChange;
    /** @type {?} */
    ElRadioGroup.prototype.controlTouch;
}
//# sourceMappingURL=radio-group.js.map