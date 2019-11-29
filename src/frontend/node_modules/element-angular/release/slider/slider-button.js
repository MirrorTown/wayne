import { Component, Input, Optional, Renderer2, Output, EventEmitter, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeAnimation } from '../shared/animation/index';
import { ElSlider } from './slider';
var ElSliderButton = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} sanitizer
     * @param {?} renderer
     */
    function ElSliderButton(root, sanitizer, renderer) {
        this.root = root;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.elDisabled = false;
        this.model = 0;
        this.vertical = false;
        this.min = 0;
        this.max = 100;
        this.modelChange = new EventEmitter();
        this.hovering = false;
        this.dragging = false;
        this.popper = true;
        this.startPosition = 0;
        this.globalListenFunc = [];
        this.showPopper = false;
    }
    Object.defineProperty(ElSliderButton.prototype, "disabled", {
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
     * @param {?} t
     * @return {?}
     */
    ElSliderButton.prototype.popperMouseHandle = function (t) {
        if (!this.dragging && !t) {
            this.showPopper = false;
        }
        if (t && !this.elDisabled) {
            this.showPopper = true;
        }
    };
    /**
     * @return {?}
     */
    ElSliderButton.prototype.getCurrentPosition = function () {
        return (this.model - this.min) / (this.max - this.min) * 100;
    };
    /**
     * @return {?}
     */
    ElSliderButton.prototype.updateWrapperStyle = function () {
        var /** @type {?} */ currentPosition = this.getCurrentPosition();
        var /** @type {?} */ styles = (this.vertical ? 'bottom' : 'left') + ": " + currentPosition + "%";
        this.wrapperStyles = this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElSliderButton.prototype.formatValue = function () {
        return this.formatTooltip ? this.formatTooltip(this.model) : this.model;
    };
    /**
     * @param {?} t
     * @return {?}
     */
    ElSliderButton.prototype.togglePopper = function (t) {
        this.hovering = t;
        this.popper = t;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElSliderButton.prototype.buttonDownHandle = function (event) {
        var _this = this;
        event.preventDefault();
        this.onDragStart(event);
        (_a = this.globalListenFunc).push.apply(_a, [
            this.renderer.listen('window', 'mousemove', function (e) {
                _this.draggingHandle(e);
            }),
            this.renderer.listen('window', 'mouseup', function () {
                _this.dragEndHandle();
            })
        ]);
        var _a;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElSliderButton.prototype.onDragStart = function (event) {
        // show tooltip
        this.popperMouseHandle(true);
        this.dragging = true;
        if (this.vertical) {
            this.startY = ((event)).clientY;
        }
        else {
            this.startX = ((event)).clientX;
        }
        this.startPosition = this.getCurrentPosition();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElSliderButton.prototype.draggingHandle = function (event) {
        if (!this.dragging)
            return;
        this.togglePopper(true);
        this.root.resetSize();
        var /** @type {?} */ diff = 0;
        if (this.vertical) {
            this.currentY = ((event)).clientY;
            diff = (this.startY - this.currentY) / this.root.size * 100;
        }
        else {
            this.currentX = ((event)).clientX;
            diff = (this.currentX - this.startX) / this.root.size * 100;
        }
        this.position = this.startPosition + diff;
        this.setPosition(this.position);
    };
    /**
     * @return {?}
     */
    ElSliderButton.prototype.dragEndHandle = function () {
        var _this = this;
        if (!this.dragging)
            return;
        // hide tooltip
        this.showPopper = false;
        var /** @type {?} */ timer = setTimeout(function () {
            _this.dragging = false;
            _this.togglePopper(false);
            _this.setPosition(_this.position);
            clearTimeout(timer);
        }, 0);
        this.globalListenFunc.forEach(function (func) { return func(); });
        this.globalListenFunc = [];
    };
    /**
     * @param {?} next
     * @return {?}
     */
    ElSliderButton.prototype.setPosition = function (next) {
        if (next === null)
            return;
        var /** @type {?} */ checkedNext = next < 0 ? 0 : next > 100 ? 100 : next;
        var /** @type {?} */ val = checkedNext * (this.max - this.min) * 0.01 + this.min;
        if (Number.isNaN(val))
            return;
        this.model = Math.round(val);
        this.modelChange.emit(this.model);
        this.updateWrapperStyle();
    };
    /**
     * @return {?}
     */
    ElSliderButton.prototype.ngOnInit = function () {
        this.updateWrapperStyle();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElSliderButton.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        // if (!changes.model.previousValue) return
        this.model = changes.model.currentValue;
        this.updateWrapperStyle();
    };
    ElSliderButton.decorators = [
        { type: Component, args: [{
                    selector: 'el-slider-button',
                    styles: ["\n    .popper-center {\n      position: absolute;\n      left: 15px;\n      top: -35px;\n      display: none;\n      transform: translateX(-50%);\n    }\n    .isVertical { margin-left: 2px; }\n  "],
                    animations: [fadeAnimation],
                    template: "\n    <div class=\"el-slider__button-wrapper\"\n      [class.hover]=\"hovering\" [class.dragging]=\"dragging\"\n      [class.isVertical]=\"vertical\"\n      [style]=\"wrapperStyles\"\n      (mouseenter)=\"togglePopper(true)\"\n      (mouseleave)=\"togglePopper(false)\"\n      (mousedown)=\"buttonDownHandle($event)\">\n      <div class=\"el-slider__button el-tooltip\" #wrapper\n        (mouseenter)=\"popperMouseHandle(true)\" (mouseleave)=\"popperMouseHandle(false)\"></div>\n      <div class=\"el-tooltip__popper is-dark popper-center\" x-placement=\"top\"\n        [@fadeAnimation]=\"!showPopper\">\n        <div x-arrow class=\"popper__arrow\" style=\"left: 50%; transform: translateX(-50%);\"></div>\n        <span>{{ formatValue() }}</span>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSliderButton.ctorParameters = function () { return [
        { type: ElSlider, decorators: [{ type: Optional },] },
        { type: DomSanitizer, },
        { type: Renderer2, },
    ]; };
    ElSliderButton.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'model': [{ type: Input },],
        'vertical': [{ type: Input },],
        'formatTooltip': [{ type: Input, args: ['format-tooltip',] },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElSliderButton;
}());
export { ElSliderButton };
function ElSliderButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSliderButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSliderButton.ctorParameters;
    /** @type {?} */
    ElSliderButton.propDecorators;
    /** @type {?} */
    ElSliderButton.prototype.elDisabled;
    /** @type {?} */
    ElSliderButton.prototype.model;
    /** @type {?} */
    ElSliderButton.prototype.vertical;
    /** @type {?} */
    ElSliderButton.prototype.formatTooltip;
    /** @type {?} */
    ElSliderButton.prototype.min;
    /** @type {?} */
    ElSliderButton.prototype.max;
    /** @type {?} */
    ElSliderButton.prototype.modelChange;
    /** @type {?} */
    ElSliderButton.prototype.hovering;
    /** @type {?} */
    ElSliderButton.prototype.dragging;
    /** @type {?} */
    ElSliderButton.prototype.popper;
    /** @type {?} */
    ElSliderButton.prototype.wrapperStyles;
    /** @type {?} */
    ElSliderButton.prototype.startY;
    /** @type {?} */
    ElSliderButton.prototype.startX;
    /** @type {?} */
    ElSliderButton.prototype.currentY;
    /** @type {?} */
    ElSliderButton.prototype.currentX;
    /** @type {?} */
    ElSliderButton.prototype.startPosition;
    /** @type {?} */
    ElSliderButton.prototype.position;
    /** @type {?} */
    ElSliderButton.prototype.globalListenFunc;
    /** @type {?} */
    ElSliderButton.prototype.showPopper;
    /** @type {?} */
    ElSliderButton.prototype.root;
    /** @type {?} */
    ElSliderButton.prototype.sanitizer;
    /** @type {?} */
    ElSliderButton.prototype.renderer;
}
//# sourceMappingURL=slider-button.js.map