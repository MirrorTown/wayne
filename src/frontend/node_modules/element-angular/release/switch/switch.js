import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElSwitch = /** @class */ (function () {
    /**
     * @param {?} sanitizer
     */
    function ElSwitch(sanitizer) {
        this.sanitizer = sanitizer;
        this.elDisabled = false;
        this.activeColor = '#409EFF';
        this.inactiveColor = '#C0CCDA';
        this.modelChange = new EventEmitter();
        this._model = false;
        this.hasText = false;
        this.controlChange = function () { };
        this.controlTouch = function () { };
    }
    Object.defineProperty(ElSwitch.prototype, "disabled", {
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
    Object.defineProperty(ElSwitch.prototype, "model", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._model = val;
            this.updateStyles();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} nextValue
     * @return {?}
     */
    ElSwitch.prototype.changeHandle = function (nextValue) {
        this.model = nextValue;
        this.modelChange.emit(nextValue);
        this.controlChange(nextValue);
    };
    /**
     * @return {?}
     */
    ElSwitch.prototype.updateStyles = function () {
        var /** @type {?} */ baseStyle = "width: " + this.realWidth + "px;";
        var /** @type {?} */ translate = this._model ? "translate3d(" + (this.realWidth - 20) + "px, 0, 0)" : '';
        var /** @type {?} */ color = this._model ? this.activeColor : this.inactiveColor;
        var /** @type {?} */ colorStyles = "border-color: " + color + "; background-color: " + color + ";";
        this.iconTransform = this.sanitizer.bypassSecurityTrustStyle("transform: " + translate);
        if (this.activeColor && this.inactiveColor) {
            baseStyle += colorStyles;
        }
        this.coreStyles = this.sanitizer.bypassSecurityTrustStyle(baseStyle);
    };
    /**
     * @return {?}
     */
    ElSwitch.prototype.ngOnInit = function () {
        this.realWidth = this.width ? this.width : 40;
        this.updateStyles();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElSwitch.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElSwitch.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElSwitch.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElSwitch.decorators = [
        { type: Component, args: [{
                    selector: 'el-switch',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElSwitch; }),
                            multi: true
                        }],
                    template: "\n    <label class=\"el-switch\"\n      [class.is-disabled]=\"elDisabled\"\n      [class.el-switch--wide]=\"hasText\"\n      [class.is-checked]=\"_model\">\n      <div class=\"el-switch__mask\" *ngIf=\"elDisabled\"></div>\n      <input class=\"el-switch__input\" type=\"checkbox\"\n        [name]=\"name\" [disabled]=\"elDisabled\"\n        [ngModel]=\"_model\" (ngModelChange)=\"changeHandle($event)\">\n      \n      <div class=\"el-switch__label el-switch__label--left\" [class.is-active]=\"!_model\"\n        *ngIf=\"inactiveText || inactiveIconClass\">\n        <i [class]=\"inactiveIconClass\" *ngIf=\"inactiveIconClass\"></i>\n        <span *ngIf=\"!inactiveIconClass\">{{ inactiveText }}</span>\n      </div>\n\n      <span class=\"el-switch__core\" [style]=\"coreStyles\">\n        <span class=\"el-switch__button\" [style]=\"iconTransform\"></span>\n      </span>\n\n      <div class=\"el-switch__label el-switch__label--right\" [class.is-active]=\"_model\"\n           *ngIf=\"activeText || activeIconClass\">\n        <i [class]=\"activeIconClass\" *ngIf=\"activeIconClass\"></i>\n        <span *ngIf=\"!activeIconClass\">{{ activeText }}</span>\n      </div>\n    </label>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSwitch.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    ElSwitch.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'name': [{ type: Input },],
        'width': [{ type: Input },],
        'activeIconClass': [{ type: Input, args: ['active-icon-class',] },],
        'inactiveIconClass': [{ type: Input, args: ['inactive-icon-class',] },],
        'activeText': [{ type: Input, args: ['active-text',] },],
        'inactiveText': [{ type: Input, args: ['inactive-text',] },],
        'activeColor': [{ type: Input, args: ['active-color',] },],
        'inactiveColor': [{ type: Input, args: ['inactive-color',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElSwitch;
}());
export { ElSwitch };
function ElSwitch_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSwitch.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSwitch.ctorParameters;
    /** @type {?} */
    ElSwitch.propDecorators;
    /** @type {?} */
    ElSwitch.prototype.elDisabled;
    /** @type {?} */
    ElSwitch.prototype.name;
    /** @type {?} */
    ElSwitch.prototype.width;
    /** @type {?} */
    ElSwitch.prototype.activeIconClass;
    /** @type {?} */
    ElSwitch.prototype.inactiveIconClass;
    /** @type {?} */
    ElSwitch.prototype.activeText;
    /** @type {?} */
    ElSwitch.prototype.inactiveText;
    /** @type {?} */
    ElSwitch.prototype.activeColor;
    /** @type {?} */
    ElSwitch.prototype.inactiveColor;
    /** @type {?} */
    ElSwitch.prototype.modelChange;
    /** @type {?} */
    ElSwitch.prototype._model;
    /** @type {?} */
    ElSwitch.prototype.hasText;
    /** @type {?} */
    ElSwitch.prototype.realWidth;
    /** @type {?} */
    ElSwitch.prototype.coreStyles;
    /** @type {?} */
    ElSwitch.prototype.iconTransform;
    /** @type {?} */
    ElSwitch.prototype.controlChange;
    /** @type {?} */
    ElSwitch.prototype.controlTouch;
    /** @type {?} */
    ElSwitch.prototype.sanitizer;
}
//# sourceMappingURL=switch.js.map