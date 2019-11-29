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
import { Component, forwardRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElSliderProps } from './slider.props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElSlider = /** @class */ (function (_super) {
    __extends(ElSlider, _super);
    /**
     * @param {?} sanitizer
     */
    function ElSlider(sanitizer) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.start = 0;
        _this.isDragging = false;
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @return {?}
     */
    ElSlider.prototype.makeRunwayStyle = function () {
        var /** @type {?} */ styles = this.vertical ? "height: " + this.height + "px;" : '';
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElSlider.prototype.makeBarStyle = function () {
        var /** @type {?} */ val = (this.model - this.min) * 100 / (this.max - this.min);
        var /** @type {?} */ styles = this.vertical ? "height: " + val + "%; bottom: " + this.start + "%;"
            : "width: " + val + "%; left: " + this.start + "%;";
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElSlider.prototype.resetSize = function () {
        if (!this.runwayElement)
            return;
        this.size = this.runwayElement.nativeElement["client" + (this.vertical ? 'Height' : 'Width')];
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElSlider.prototype.onSliderClick = function (event) {
        if (this.elDisabled || this.isDragging)
            return;
        this.resetSize();
        var /** @type {?} */ val = this.vertical ? event.clientY : event.clientX;
        var _a = this.runwayElement.nativeElement.getBoundingClientRect(), left = _a.left, bottom = _a.bottom;
        var /** @type {?} */ offset = Math.abs(val - (this.vertical ? bottom : left));
        // update value
        this.model = Math.round((offset / this.size) * (this.max - this.min)) + this.min;
        this.moveChange(this.model);
        this.makeBarStyle();
    };
    /**
     * @param {?} nextValue
     * @return {?}
     */
    ElSlider.prototype.moveChange = function (nextValue) {
        this.model = nextValue;
        this.modelChange.emit(nextValue);
        this.controlChange(nextValue);
    };
    /**
     * @return {?}
     */
    ElSlider.prototype.ngOnInit = function () {
        if (!this.model) {
            this.model = this.min;
        }
    };
    /**
     * @return {?}
     */
    ElSlider.prototype.ngAfterViewInit = function () {
        this.resetSize();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElSlider.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElSlider.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElSlider.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElSlider.decorators = [
        { type: Component, args: [{
                    selector: 'el-slider',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElSlider; }),
                            multi: true
                        }],
                    template: "\n    <div class=\"el-slider\" [class.is-vertical]=\"vertical\">\n      <div class=\"el-slider__runway\" [class.disabled]=\"elDisabled\"\n        [style]=\"makeRunwayStyle()\" (click)=\"onSliderClick($event)\" #runway>\n        <div class=\"el-slider__bar\" [style]=\"makeBarStyle()\"></div>\n        <el-slider-button [vertical]=\"vertical\"\n          [model]=\"model\"\n          (modelChange)=\"moveChange($event)\"\n          [min]=\"min\" [max]=\"max\"\n          [format-tooltip]=\"formatTooltip\"\n          [elDisabled]=\"!showTooltip\">\n        </el-slider-button>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSlider.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    ElSlider.propDecorators = {
        'runwayElement': [{ type: ViewChild, args: ['runway',] },],
    };
    return ElSlider;
}(ElSliderProps));
export { ElSlider };
function ElSlider_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSlider.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSlider.ctorParameters;
    /** @type {?} */
    ElSlider.propDecorators;
    /** @type {?} */
    ElSlider.prototype.runwayElement;
    /** @type {?} */
    ElSlider.prototype.size;
    /** @type {?} */
    ElSlider.prototype.start;
    /** @type {?} */
    ElSlider.prototype.isDragging;
    /** @type {?} */
    ElSlider.prototype.controlChange;
    /** @type {?} */
    ElSlider.prototype.controlTouch;
    /** @type {?} */
    ElSlider.prototype.sanitizer;
}
//# sourceMappingURL=slider.js.map