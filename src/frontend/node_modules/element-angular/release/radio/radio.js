import { Component, Input, Output, EventEmitter, ElementRef, Optional, forwardRef, } from '@angular/core';
import { ElRadioGroup } from './radio-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElRadio = /** @class */ (function () {
    /**
     * @param {?} rootGroup
     * @param {?} el
     */
    function ElRadio(rootGroup, el) {
        this.rootGroup = rootGroup;
        this.el = el;
        this.elDisabled = false;
        this.label = '';
        this.nativeName = '';
        this.modelChange = new EventEmitter();
        this.isFocus = false;
        this.parentIsGroup = false;
        this.controlChange = function () { };
        this.controlTouch = function () { };
        console.log(this.elDisabled);
    }
    Object.defineProperty(ElRadio.prototype, "disabled", {
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
     * @return {?}
     */
    ElRadio.prototype.changeHandle = function () {
        if (this.parentIsGroup) {
            return this.rootGroup.changeHandle(this.label);
        }
        this.model = this.label;
        this.modelChange.emit(this.label);
        this.controlChange(this.label);
    };
    /**
     * @return {?}
     */
    ElRadio.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ nativeElement = this.el.nativeElement;
        var /** @type {?} */ update = function () {
            if (_this.rootGroup.elDisabled) {
                _this.elDisabled = _this.rootGroup.elDisabled;
            }
            _this.model = _this.rootGroup.model;
        };
        this.parentIsGroup = isParentTag(nativeElement, 'el-radio-group');
        removeNgTag(nativeElement);
        if (this.parentIsGroup && this.rootGroup) {
            update();
            this.rootGroup.subscriber.push(update);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElRadio.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElRadio.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElRadio.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElRadio.decorators = [
        { type: Component, args: [{
                    selector: 'el-radio',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElRadio; }),
                            multi: true,
                        }],
                    template: "\n    <label class=\"el-radio\" role=\"radio\" tabindex=\"0\">\n      <span class=\"el-radio__input\"\n        style=\"float: left;\"\n        [class.is-disabled]=\"elDisabled\"\n        [class.is-checked]=\"model === label\"\n        [class.is-focus]=\"isFocus\">\n        <span class=\"el-radio__inner\"></span>\n        <input class=\"el-radio__original\" type=\"radio\"\n          [value]=\"label\" [name]=\"nativeName\" [disabled]=\"elDisabled\"\n          (focus)=\"isFocus = true\" (blur)=\"isFocus = false\"\n          [ngModel]=\"model\" (ngModelChange)=\"changeHandle()\">\n      </span>\n      <span class=\"el-radio__label\"><ng-content></ng-content></span>\n    </label>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRadio.ctorParameters = function () { return [
        { type: ElRadioGroup, decorators: [{ type: Optional },] },
        { type: ElementRef, },
    ]; };
    ElRadio.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'label': [{ type: Input },],
        'nativeName': [{ type: Input, args: ['name',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElRadio;
}());
export { ElRadio };
function ElRadio_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadio.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadio.ctorParameters;
    /** @type {?} */
    ElRadio.propDecorators;
    /** @type {?} */
    ElRadio.prototype.elDisabled;
    /** @type {?} */
    ElRadio.prototype.label;
    /** @type {?} */
    ElRadio.prototype.nativeName;
    /** @type {?} */
    ElRadio.prototype.model;
    /** @type {?} */
    ElRadio.prototype.modelChange;
    /** @type {?} */
    ElRadio.prototype.isFocus;
    /** @type {?} */
    ElRadio.prototype.parentIsGroup;
    /** @type {?} */
    ElRadio.prototype.controlChange;
    /** @type {?} */
    ElRadio.prototype.controlTouch;
    /** @type {?} */
    ElRadio.prototype.rootGroup;
    /** @type {?} */
    ElRadio.prototype.el;
}
//# sourceMappingURL=radio.js.map