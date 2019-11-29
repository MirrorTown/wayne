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
import { Component, ViewChild, Renderer2, forwardRef } from '@angular/core';
import { ElRateProps } from './rate.props';
import { DomSanitizer } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElRate = /** @class */ (function (_super) {
    __extends(ElRate, _super);
    /**
     * @param {?} sanitizer
     * @param {?} renderer
     */
    function ElRate(sanitizer, renderer) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.renderer = renderer;
        _this.scores = [];
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @param {?} __0
     * @param {?=} index
     * @param {?=} reset
     * @return {?}
     */
    ElRate.prototype.hoverToggle = function (_a, index, reset) {
        var srcElement = _a.srcElement;
        if (reset === void 0) { reset = false; }
        if (this.elDisabled)
            return;
        var /** @type {?} */ iconElement = srcElement.tagName === 'I' ? srcElement : srcElement.children[0];
        if (reset) {
            this.model = this.backupModel;
            this.renderer.removeClass(iconElement, 'hover');
        }
        else {
            this.model = index;
            this.renderer.addClass(iconElement, 'hover');
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElRate.prototype.selectValue = function (index) {
        if (this.elDisabled)
            return;
        this.model = this.backupModel = index;
        this.modelChange.emit(index);
        this.controlChange;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElRate.prototype.makeIconClasses = function (index) {
        var /** @type {?} */ voidClass = this.elDisabled ? this.rateMap.elDisabled.class : this.rateMap.void.class;
        var /** @type {?} */ activeItem = this.findCurrentType(this.model, this.rateMap);
        var /** @type {?} */ classes = index <= this.model ? activeItem.class : voidClass;
        return 'el-rate__icon ' + classes;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElRate.prototype.makeIconStyles = function (index) {
        var /** @type {?} */ voidColor = this.elDisabled ? this.rateMap.elDisabled.color : this.rateMap.void.color;
        var /** @type {?} */ activeItem = this.findCurrentType(this.model, this.rateMap);
        var /** @type {?} */ styles = "color: " + (index <= this.model ? activeItem.color : voidColor) + ";";
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @param {?} index
     * @param {?} rateMap
     * @return {?}
     */
    ElRate.prototype.findCurrentType = function (index, rateMap) {
        if (index <= this.lowThreshold)
            return rateMap.low;
        if (index >= this.highThreshold)
            return rateMap.high;
        return rateMap.medium;
    };
    /**
     * @return {?}
     */
    ElRate.prototype.ngOnInit = function () {
        this.scores = new Array(this.max).fill('');
        this.backupModel = this.model;
        this.rateMap = {
            low: { color: this.colors[0], class: this.iconClasses[0] },
            medium: { color: this.colors[1], class: this.iconClasses[1] },
            high: { color: this.colors[2], class: this.iconClasses[2] },
            void: { color: this.voidColor, class: this.voidIconClass },
            elDisabled: { color: this.disabledVoidColor, class: this.disabledVoidIconClass },
        };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElRate.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElRate.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElRate.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElRate.decorators = [
        { type: Component, args: [{
                    selector: 'el-rate',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElRate; }),
                            multi: true
                        }],
                    template: "\n    <div class=\"el-rate\" role=\"slider\">\n      <span *ngFor=\"let s of scores; let i = index\" class=\"el-rate__item\"\n        [ngStyle]=\"{cursor: elDisabled ? 'auto' : 'pointer'}\"\n        (mousemove)=\"hoverToggle($event, i)\"\n        (mouseleave)=\"hoverToggle($event, i, true)\"\n        (click)=\"selectValue(i)\">\n        <i class=\"el-rate__icon\" [style]=\"makeIconStyles(i)\"\n          [class]=\"makeIconClasses(i)\"\n          [class.hover]=\"i\"\n          #rateIcon></i>\n      </span>\n      <span *ngIf=\"showText\" class=\"el-rate__text\" [ngStyle]=\"{ color: textColor }\">\n        {{ texts[model] }}\n      </span>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRate.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: Renderer2, },
    ]; };
    ElRate.propDecorators = {
        'rateIcon': [{ type: ViewChild, args: ['rateIcon',] },],
    };
    return ElRate;
}(ElRateProps));
export { ElRate };
function ElRate_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRate.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRate.ctorParameters;
    /** @type {?} */
    ElRate.propDecorators;
    /** @type {?} */
    ElRate.prototype.rateIcon;
    /** @type {?} */
    ElRate.prototype.scores;
    /** @type {?} */
    ElRate.prototype.rateMap;
    /** @type {?} */
    ElRate.prototype.backupModel;
    /** @type {?} */
    ElRate.prototype.controlChange;
    /** @type {?} */
    ElRate.prototype.controlTouch;
    /** @type {?} */
    ElRate.prototype.sanitizer;
    /** @type {?} */
    ElRate.prototype.renderer;
}
//# sourceMappingURL=rate.js.map