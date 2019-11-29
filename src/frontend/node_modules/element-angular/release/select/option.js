import { Component, Input, Optional } from '@angular/core';
import { ElSelect } from './select';
var ElOption = /** @class */ (function () {
    /**
     * @param {?} rootSelect
     */
    function ElOption(rootSelect) {
        this.rootSelect = rootSelect;
        this.elDisabled = false;
        this.rootDisabled = false;
        this.itemSelected = false;
    }
    Object.defineProperty(ElOption.prototype, "disabled", {
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
     * @param {?} event
     * @return {?}
     */
    ElOption.prototype.clickHandle = function (event) {
        event.stopPropagation();
        if (this.elDisabled || this.rootDisabled)
            return;
        this.rootSelect.changeLabel(this.label, this.value);
    };
    /**
     * @return {?}
     */
    ElOption.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ updateHandle = function () {
            if (_this.rootSelect.multiple) {
                _this.itemSelected = Array.isArray(_this.rootSelect.model) && _this.rootSelect.model.indexOf(_this.value) > -1;
            }
            else {
                _this.itemSelected = _this.value === _this.rootSelect.model;
            }
            _this.itemSelected && _this.rootSelect.changeLabel(_this.label);
        };
        this.rootDisabled = this.rootSelect.elDisabled;
        updateHandle();
        this.rootSelect.subscriber.push(updateHandle);
        this.rootSelect.appendOptions({
            value: this.value,
            label: this.label,
        });
    };
    ElOption.decorators = [
        { type: Component, args: [{
                    selector: 'el-option',
                    template: "\n    <li class=\"el-select-dropdown__item\"\n      [class.is-disabled]=\"elDisabled || rootDisabled\"\n      [class.selected]=\"itemSelected\"\n      (click)=\"clickHandle($event)\">\n      <span>{{ label }}</span>\n    </li>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElOption.ctorParameters = function () { return [
        { type: ElSelect, decorators: [{ type: Optional },] },
    ]; };
    ElOption.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'value': [{ type: Input },],
        'label': [{ type: Input },],
    };
    return ElOption;
}());
export { ElOption };
function ElOption_tsickle_Closure_declarations() {
    /** @type {?} */
    ElOption.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElOption.ctorParameters;
    /** @type {?} */
    ElOption.propDecorators;
    /** @type {?} */
    ElOption.prototype.elDisabled;
    /** @type {?} */
    ElOption.prototype.value;
    /** @type {?} */
    ElOption.prototype.label;
    /** @type {?} */
    ElOption.prototype.rootDisabled;
    /** @type {?} */
    ElOption.prototype.itemSelected;
    /** @type {?} */
    ElOption.prototype.rootSelect;
}
//# sourceMappingURL=option.js.map