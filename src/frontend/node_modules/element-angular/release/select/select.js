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
import { Component, ElementRef, Renderer2, forwardRef, ViewChild, } from '@angular/core';
import { ElSelectPoprs } from './select-props';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WindowWrapper } from '../shared/services/index';
var ElSelect = /** @class */ (function (_super) {
    __extends(ElSelect, _super);
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} window
     */
    function ElSelect(el, renderer, window) {
        var _this = _super.call(this) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.window = window;
        _this.subscriber = [];
        _this.multipleLabels = [];
        _this.multiplePlaceholder = _this.placeholder;
        _this.dropdownActive = false;
        _this.iconClass = 'arrow-up';
        _this.selectOptions = [];
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @param {?=} isEnter
     * @return {?}
     */
    ElSelect.prototype.mouseHandle = function (isEnter) {
        if (isEnter === void 0) { isEnter = false; }
        this.clearable = this.clearable && !this.multiple;
        if (!this.clearable || !this.model)
            return;
        this.iconClass = "" + (isEnter ? 'circle-close is-reverse' : 'arrow-up');
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    ElSelect.prototype.toggleHandle = function (event) {
        this.clearable = this.clearable && !this.multiple;
        if (this.elDisabled)
            return;
        event && event.stopPropagation();
        this.dropdownActive = !this.dropdownActive;
        var /** @type {?} */ nextClass = 'arrow-up' + (this.dropdownActive ? ' is-reverse' : '');
        this.iconClass = !this.clearable ? nextClass : this.iconClass;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElSelect.prototype.clearSelected = function (event) {
        this.clearable = this.clearable && !this.multiple;
        if (!this.clearable)
            return;
        event.stopPropagation();
        // reset icon
        this.mouseHandle(false);
        // reset selected label
        this.changeLabel(null, null);
        // reset model
        this.model = null;
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
        this.subscriber.forEach(function (sub) { return sub(); });
        // close dropdown menu
        this.dropdownActive = false;
    };
    /**
     * @param {?} nextLabel
     * @param {?=} nextValue
     * @return {?}
     */
    ElSelect.prototype.changeLabel = function (nextLabel, nextValue) {
        this.dropdownActive && this.toggleHandle();
        // only update label
        this.selectedLabel = this.multiple ? '' : nextLabel;
        if (!nextValue || this.model === nextValue)
            return;
        if (this.multiple) {
            this.updateValueWithMultipleMode(nextLabel, nextValue);
            this.updateLayoutWithMultipleMode();
        }
        else {
            this.model = nextValue;
        }
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
        this.subscriber.forEach(function (sub) { return sub(); });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ElSelect.prototype.appendOptions = function (item) {
        this.selectOptions.push(item);
    };
    /**
     * @return {?}
     */
    ElSelect.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ timer = window.setTimeout(function () {
            _this.selfWidth = _this.el.nativeElement.getBoundingClientRect().width;
            clearTimeout(timer);
        }, 0);
        this.globalListener = this.renderer.listen('document', 'click', function () {
            _this.dropdownActive && _this.toggleHandle();
        });
        this.updatePlaceholderWithMultipleMode();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElSelect.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        if (changes.model.isFirstChange())
            return;
        // reset model
        if (!changes.model.currentValue) {
            this.selectedLabel = changes.model.currentValue;
            this.model = changes.model.currentValue;
            this.modelChange.emit(changes.model.currentValue);
            this.controlChange(this.model);
        }
        this.subscriber.forEach(function (sub) { return sub(); });
    };
    /**
     * @return {?}
     */
    ElSelect.prototype.ngOnDestroy = function () {
        this.globalListener && this.globalListener();
    };
    /**
     * @return {?}
     */
    ElSelect.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ timer = this.window.setTimeout(function () {
            _this.initModelWithMultipleMode();
            _this.window.clearTimeout(timer);
        }, 0);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElSelect.prototype.writeValue = function (value) {
        this.model = value;
        this.initModelWithMultipleMode();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElSelect.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElSelect.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    /**
     * @return {?}
     */
    ElSelect.prototype.updateLayoutWithMultipleMode = function () {
        var _this = this;
        var /** @type {?} */ updateHandle = function () {
            if (!_this.tags)
                return;
            var /** @type {?} */ children = _this.tags.nativeElement && _this.tags.nativeElement.children;
            var /** @type {?} */ inputEl = _this.input.el.nativeElement;
            if (!children || !children.length || !inputEl)
                return;
            var /** @type {?} */ inputWidth = inputEl.getBoundingClientRect().width;
            var /** @type {?} */ unit = inputWidth - 34;
            var /** @type {?} */ row = 1;
            Array.from(children).reduce(function (count, el) {
                var /** @type {?} */ currentWidth = el.getBoundingClientRect().width || 80;
                if (count + currentWidth < unit)
                    return count + currentWidth;
                // add a row
                row++;
                return currentWidth;
            }, 0);
            var /** @type {?} */ el = inputEl.querySelector('.el-input__inner');
            _this.renderer.setStyle(el, 'height', Math.ceil(row) * 40 + "px");
        };
        var /** @type {?} */ timer = this.window.setTimeout(function () {
            updateHandle();
            _this.window.clearTimeout(timer);
        }, 0);
    };
    /**
     * @param {?} nextLabel
     * @param {?=} nextValue
     * @return {?}
     */
    ElSelect.prototype.updateValueWithMultipleMode = function (nextLabel, nextValue) {
        var /** @type {?} */ model = Array.isArray(this.model)
            ? (this.model.indexOf(nextValue) > -1 ? this.model.filter(function (v) { return v !== nextValue; }) : this.model.concat(nextValue))
            : [nextValue];
        this.model = model.filter(function (r) { return r !== undefined; });
        this.multipleLabels = !nextLabel || this.multipleLabels.indexOf(nextLabel) > -1
            ? this.multipleLabels.filter(function (v) { return v !== nextLabel; })
            : this.multipleLabels.concat(nextLabel);
        this.updatePlaceholderWithMultipleMode();
    };
    /**
     * @return {?}
     */
    ElSelect.prototype.updatePlaceholderWithMultipleMode = function () {
        if (!this.multiple)
            return;
        this.multiplePlaceholder = this.model && this.model.length ? '' : this.placeholder;
    };
    /**
     * @return {?}
     */
    ElSelect.prototype.initModelWithMultipleMode = function () {
        var _this = this;
        if (!this.model || !this.multiple || !this.selectOptions.length)
            return;
        if (!Array.isArray(this.model))
            this.model = [this.model];
        this.multipleLabels = this.model
            .map(function (item) {
            var /** @type {?} */ option = _this.selectOptions.find(function (option) { return option.value === item; });
            if (option && option.label)
                return option.label;
            return null;
        })
            .filter(function (r) { return !!r; });
        this.updateLayoutWithMultipleMode();
    };
    ElSelect.decorators = [
        { type: Component, args: [{
                    selector: 'el-select',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElSelect; }),
                            multi: true
                        }],
                    styles: ["\n    .el-select-dropdown__list { overflow: hidden; }\n    .el-select__tags__padding { padding-right: 30px; }\n  "],
                    template: "\n    <div class=\"el-select\" (click)=\"toggleHandle($event)\">\n      <div class=\"el-select__tags el-select__tags__padding\" *ngIf=\"multiple && model && model.length\" #tags>\n        <el-tag *ngFor=\"let tag of multipleLabels; let i = index\"\n          [closable]=\"!elDisabled\"\n          [size]=\"size\"\n          (close)=\"$event.stopPropagation();changeLabel(tag, model[i])\"\n          type=\"info\">{{tag}}</el-tag>\n      </div>\n      \n      <el-input iconClass=\"el-select__caret\" #input\n        [model]=\"selectedLabel\"\n        [placeholder]=\"multiple ? multiplePlaceholder : placeholder\"\n        [icon]=\"iconClass\"\n        [name]=\"name\"\n        [size]=\"size\"\n        [elDisabled]=\"elDisabled\" [readonly]=\"true\"\n        (mouseenter)=\"mouseHandle(true)\" (mouseleave)=\"mouseHandle(false)\"\n        (icon-click)=\"clearSelected($event)\">\n      </el-input>\n      <ng-container>\n        <el-select-dropdown [isActived]=\"dropdownActive\">\n          <ul class=\"el-scrollbar__view el-select-dropdown__list\">\n            <ng-content></ng-content>\n          </ul>\n        </el-select-dropdown>\n      </ng-container>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSelect.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: WindowWrapper, },
    ]; };
    ElSelect.propDecorators = {
        'tags': [{ type: ViewChild, args: ['tags',] },],
        'input': [{ type: ViewChild, args: ['input',] },],
    };
    return ElSelect;
}(ElSelectPoprs));
export { ElSelect };
function ElSelect_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSelect.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSelect.ctorParameters;
    /** @type {?} */
    ElSelect.propDecorators;
    /** @type {?} */
    ElSelect.prototype.tags;
    /** @type {?} */
    ElSelect.prototype.input;
    /** @type {?} */
    ElSelect.prototype.selfWidth;
    /** @type {?} */
    ElSelect.prototype.subscriber;
    /** @type {?} */
    ElSelect.prototype.multipleLabels;
    /** @type {?} */
    ElSelect.prototype.multiplePlaceholder;
    /** @type {?} */
    ElSelect.prototype.dropdownActive;
    /** @type {?} */
    ElSelect.prototype.selectedLabel;
    /** @type {?} */
    ElSelect.prototype.iconClass;
    /** @type {?} */
    ElSelect.prototype.globalListener;
    /** @type {?} */
    ElSelect.prototype.selectOptions;
    /** @type {?} */
    ElSelect.prototype.controlChange;
    /** @type {?} */
    ElSelect.prototype.controlTouch;
    /** @type {?} */
    ElSelect.prototype.el;
    /** @type {?} */
    ElSelect.prototype.renderer;
    /** @type {?} */
    ElSelect.prototype.window;
}
//# sourceMappingURL=select.js.map