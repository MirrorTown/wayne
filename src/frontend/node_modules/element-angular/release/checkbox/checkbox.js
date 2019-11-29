import { Component, Input, Output, EventEmitter, ElementRef, Optional, ViewChild, forwardRef, } from '@angular/core';
import { ElCheckboxGroup } from './checkbox-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElCheckbox = /** @class */ (function () {
    /**
     * @param {?} hostGroup
     * @param {?} el
     */
    function ElCheckbox(hostGroup, el) {
        this.hostGroup = hostGroup;
        this.el = el;
        this.elDisabled = false;
        this.indeterminate = false;
        this.checked = false;
        this.modelChange = new EventEmitter();
        this.parentIsGroup = false;
        this.isFocus = false;
        this.showLabel = false;
        this.controlChange = function () { };
        this.controlTouch = function () { };
    }
    Object.defineProperty(ElCheckbox.prototype, "disabled", {
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
    ElCheckbox.prototype.isChecked = function () {
        if (this.parentIsGroup) {
            return this.hostGroup.model.indexOf(this.label) > -1;
        }
        return this.model;
    };
    /**
     * @param {?} t
     * @param {?=} notEmit
     * @return {?}
     */
    ElCheckbox.prototype.changeHandle = function (t, notEmit) {
        if (notEmit === void 0) { notEmit = false; }
        if (this.parentIsGroup) {
            return this.hostGroup.updateModelFromChildren(t, this.label);
        }
        this.model = t;
        this.checked = this.isChecked();
        if (notEmit)
            return;
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
    };
    /**
     * @return {?}
     */
    ElCheckbox.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ nativeElement = this.el.nativeElement;
        this.parentIsGroup = isParentTag(nativeElement, 'el-checkbox-group');
        removeNgTag(nativeElement);
        // update model from group
        if (this.parentIsGroup) {
            this.labels = this.hostGroup.model;
            this.model = this.isChecked();
            // update handle
            this.hostGroup.subscriber.push(function () {
                _this.model = _this.isChecked();
                _this.checked = _this.isChecked();
            });
        }
        this.checked = this.isChecked();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElCheckbox.prototype.ngOnChanges = function (changes) {
        if (!changes || !changes.model)
            return;
        if (changes.model.isFirstChange())
            return;
        this.changeHandle(changes.model.currentValue, true);
    };
    /**
     * @return {?}
     */
    ElCheckbox.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ contentText = this.content && this.content.nativeElement.innerText;
        setTimeout(function () {
            _this.showLabel = !contentText || contentText.length < 1;
        }, 0);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElCheckbox.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElCheckbox.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElCheckbox.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElCheckbox.decorators = [
        { type: Component, args: [{
                    selector: 'el-checkbox',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElCheckbox; }),
                            multi: true
                        }],
                    template: "\n    <label class=\"el-checkbox\">\n    <span class=\"el-checkbox__input\"\n      [class.is-disabled]=\"elDisabled\" [class.is-focus]=\"isFocus\"\n      [class.is-indeterminate]=\"indeterminate\" [class.is-checked]=\"checked\">\n      <span class=\"el-checkbox__inner\"></span>\n      <input class=\"el-checkbox__original\" type=\"checkbox\"\n        [disabled]=\"elDisabled\" [value]=\"label\" [name]=\"name\"\n        [ngModel]=\"model\" (ngModelChange)=\"changeHandle($event)\"\n        (focus)=\"isFocus = true\" (blur)=\"isFocus = false\">\n    </span>\n    <span class=\"el-checkbox__label\" style=\"padding-left: 6px;\">\n      <ng-container *ngIf=\"showLabel\">{{label}}</ng-container>\n      <span *ngIf=\"!showLabel\" #content>\n        <ng-content></ng-content>\n      </span>\n    </span>\n    </label>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCheckbox.ctorParameters = function () { return [
        { type: ElCheckboxGroup, decorators: [{ type: Optional },] },
        { type: ElementRef, },
    ]; };
    ElCheckbox.propDecorators = {
        'content': [{ type: ViewChild, args: ['content',] },],
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'label': [{ type: Input },],
        'model': [{ type: Input },],
        'indeterminate': [{ type: Input },],
        'checked': [{ type: Input },],
        'name': [{ type: Input },],
        'trueLabel': [{ type: Input, args: ['true-label',] },],
        'modelChange': [{ type: Output },],
    };
    return ElCheckbox;
}());
export { ElCheckbox };
function ElCheckbox_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCheckbox.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCheckbox.ctorParameters;
    /** @type {?} */
    ElCheckbox.propDecorators;
    /** @type {?} */
    ElCheckbox.prototype.content;
    /** @type {?} */
    ElCheckbox.prototype.elDisabled;
    /** @type {?} */
    ElCheckbox.prototype.label;
    /** @type {?} */
    ElCheckbox.prototype.model;
    /** @type {?} */
    ElCheckbox.prototype.indeterminate;
    /** @type {?} */
    ElCheckbox.prototype.checked;
    /** @type {?} */
    ElCheckbox.prototype.name;
    /** @type {?} */
    ElCheckbox.prototype.trueLabel;
    /** @type {?} */
    ElCheckbox.prototype.modelChange;
    /** @type {?} */
    ElCheckbox.prototype.labels;
    /** @type {?} */
    ElCheckbox.prototype.parentIsGroup;
    /** @type {?} */
    ElCheckbox.prototype.isFocus;
    /** @type {?} */
    ElCheckbox.prototype.showLabel;
    /** @type {?} */
    ElCheckbox.prototype.controlChange;
    /** @type {?} */
    ElCheckbox.prototype.controlTouch;
    /** @type {?} */
    ElCheckbox.prototype.hostGroup;
    /** @type {?} */
    ElCheckbox.prototype.el;
}
//# sourceMappingURL=checkbox.js.map