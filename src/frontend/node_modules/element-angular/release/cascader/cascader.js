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
import { Component, forwardRef, Renderer2 } from '@angular/core';
import { ElCascaderPoprs } from './cascader-props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElCascader = /** @class */ (function (_super) {
    __extends(ElCascader, _super);
    /**
     * @param {?} renderer
     */
    function ElCascader(renderer) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.steps = [];
        _this.menuVisible = false;
        _this.inputHover = false;
        _this.currentLabels = [];
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @return {?}
     */
    ElCascader.prototype.close = function () {
        this.menuVisible = false;
        this.globalListenFunc && this.globalListenFunc();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElCascader.prototype.clickHandle = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.elDisabled)
            return;
        var /** @type {?} */ element = (event.target);
        var /** @type {?} */ isSelfTrigger = ['SPAN', 'I', 'INPUT'].find(function (v) { return v === element.tagName; });
        if (!isSelfTrigger)
            return;
        this.menuVisible = !this.menuVisible;
        if (this.menuVisible) {
            this.globalListenFunc = this.renderer.listen('document', 'click', function () {
                _this.menuVisible = false;
            });
        }
        else {
            this.globalListenFunc && this.globalListenFunc();
        }
    };
    /**
     * @return {?}
     */
    ElCascader.prototype.changeLabels = function () {
        var /** @type {?} */ nextValue = [];
        this.steps.forEach(function (items) {
            var /** @type {?} */ steps = items.filter(function (item) { return item.active; });
            nextValue.push(steps[0]);
        });
        this.currentLabels = nextValue;
        var /** @type {?} */ next = nextValue.map(function (item) { return item.value; });
        this.model = next;
        this.modelChange.emit(next);
        this.controlChange(next);
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    ElCascader.prototype.clearValue = function (event) {
        event && event.stopPropagation();
        this.currentLabels = [];
        var /** @type {?} */ step1 = this.options.map(function (option) {
            return Object.assign(option, {
                active: false,
            });
        });
        this.steps = [step1];
        this.menuVisible = false;
    };
    /**
     * @param {?} event
     * @param {?} step
     * @param {?} index
     * @return {?}
     */
    ElCascader.prototype.selectHandle = function (event, step, index) {
        event.stopPropagation();
        if (this.steps[step][index].elDisabled)
            return;
        this.steps[step] = this.steps[step].map(function (item, i) {
            return Object.assign(item, { active: i === index });
        });
        // reset steps
        this.steps.length = step + 1;
        var /** @type {?} */ next = this.steps[step][index].children;
        // go next
        if (next && Array.isArray(next)) {
            // change on select (props)
            this.changeOnSelect && this.changeLabels();
            var /** @type {?} */ nativeNext = next.map(function (item) { return Object.assign(item, { active: false }); });
            return this.steps.push(nativeNext);
        }
        // last step
        this.changeLabels();
        this.menuVisible = false;
    };
    /**
     * @return {?}
     */
    ElCascader.prototype.showClearIcon = function () {
        return !!(this.clearable && this.inputHover && this.currentLabels.length);
    };
    /**
     * @return {?}
     */
    ElCascader.prototype.ngOnInit = function () {
        this.clearValue();
        if (this.model && this.model.length) {
            var /** @type {?} */ getLabel_1 = function (options, val) {
                var /** @type {?} */ item = options.filter(function (item) { return item.value === val; })[0];
                return { children: item.children, val: item };
            };
            var /** @type {?} */ options_1 = this.options;
            var /** @type {?} */ val = this.model.map(function (v) {
                var _a = getLabel_1(options_1, v), children = _a.children, val = _a.val;
                options_1 = children;
                return val;
            });
            this.currentLabels = val.filter(function (v) { return !!v; });
        }
    };
    /**
     * @return {?}
     */
    ElCascader.prototype.ngOnDestroy = function () {
        this.globalListenFunc && this.globalListenFunc();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElCascader.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElCascader.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElCascader.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElCascader.decorators = [
        { type: Component, args: [{
                    selector: 'el-cascader',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElCascader; }),
                            multi: true
                        }],
                    template: "\n    <span [class]=\"'el-cascader ' +  (menuVisible ? 'is-opened ' : '') + (elDisabled ? 'is-disabled ' : '')\n      + (size ? 'el-cascader--' + size : '')\"\n      (click)=\"clickHandle($event)\"\n      (mouseenter)=\"inputHover = true\" (mouseleave)=\"inputHover = false\">\n      <el-input [readonly]=\"true\"\n        [placeholder]=\"currentLabels.length ? '' : placeholder\"\n        [size]=\"size\" [elDisabled]=\"elDisabled\"\n        [icon]=\"showClearIcon() ? 'circle-close' : 'caret-bottom'\"\n        [iconClass]=\"showClearIcon() ? 'el-cascader__clearIcon' : (menuVisible ? 'is-reverse' : '')\"\n        (icon-click)=\"clearValue($event)\">\n      </el-input>\n    \n      <span class=\"el-cascader__label\" *ngIf=\"currentLabels.length\">\n        <ng-container *ngIf=\"allLevels\">\n          <ng-container *ngFor=\"let item of currentLabels; let i = index\">\n            {{ item.label }}\n            <span *ngIf=\"i < currentLabels.length - 1\"> / </span>\n          </ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!allLevels\">\n          {{ currentLabels[currentLabels.length - 1].label }}\n        </ng-container>\n      </span>\n      <el-cascader-menu></el-cascader-menu>\n  </span>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCascader.ctorParameters = function () { return [
        { type: Renderer2, },
    ]; };
    return ElCascader;
}(ElCascaderPoprs));
export { ElCascader };
function ElCascader_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCascader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCascader.ctorParameters;
    /** @type {?} */
    ElCascader.prototype.steps;
    /** @type {?} */
    ElCascader.prototype.menuVisible;
    /** @type {?} */
    ElCascader.prototype.inputHover;
    /** @type {?} */
    ElCascader.prototype.currentLabels;
    /** @type {?} */
    ElCascader.prototype.globalListenFunc;
    /** @type {?} */
    ElCascader.prototype.controlChange;
    /** @type {?} */
    ElCascader.prototype.controlTouch;
    /** @type {?} */
    ElCascader.prototype.renderer;
}
//# sourceMappingURL=cascader.js.map