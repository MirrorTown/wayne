import { Component, Input, Output, EventEmitter, ElementRef, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { ElCheckboxGroup } from './checkbox-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { DomSanitizer } from '@angular/platform-browser';
var ElCheckboxButton = /** @class */ (function () {
    /**
     * @param {?} hostGroup
     * @param {?} el
     * @param {?} domSanitizer
     */
    function ElCheckboxButton(hostGroup, el, domSanitizer) {
        this.hostGroup = hostGroup;
        this.el = el;
        this.domSanitizer = domSanitizer;
        this.elDisabled = false;
        this.indeterminate = false;
        this.checked = false;
        this.modelChange = new EventEmitter();
        this.parentIsGroup = false;
        this.isFocus = false;
        this.showLabel = false;
    }
    Object.defineProperty(ElCheckboxButton.prototype, "disabled", {
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
    ElCheckboxButton.prototype.activeStyle = function () {
        if (!this.hostGroup)
            return this.domSanitizer.bypassSecurityTrustStyle('');
        var /** @type {?} */ styles = "backgroundColor: " + this.hostGroup.fill + ";" +
            ("borderColor: " + this.hostGroup.fill + ";color: " + this.hostGroup.textColor + ";") +
            ("box-shadow: -1px 0 0 0 " + this.hostGroup.fill + ";");
        return this.domSanitizer.bypassSecurityTrustStyle(this.checked && !this.elDisabled ? styles : '');
    };
    /**
     * @return {?}
     */
    ElCheckboxButton.prototype.isChecked = function () {
        if (this.parentIsGroup) {
            return this.hostGroup.model.indexOf(this.label) > -1;
        }
        return this.model;
    };
    /**
     * @param {?} t
     * @return {?}
     */
    ElCheckboxButton.prototype.changeHandle = function (t) {
        this.parentIsGroup && this.hostGroup.updateModelFromChildren(t, this.label);
        this.model = t;
        this.checked = this.isChecked();
    };
    /**
     * @return {?}
     */
    ElCheckboxButton.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ nativeElement = this.el.nativeElement;
        this.parentIsGroup = isParentTag(nativeElement, 'el-checkbox-group');
        removeNgTag(nativeElement);
        // update model from group
        if (this.parentIsGroup) {
            this.labels = this.hostGroup.model;
            this.size = this.hostGroup.size;
            this.model = this.isChecked();
            // update handle
            this.hostGroup.subscriber.push(function () { return _this.model = _this.isChecked(); });
        }
        this.checked = this.isChecked();
    };
    /**
     * @return {?}
     */
    ElCheckboxButton.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ contentText = this.content && this.content.nativeElement.innerText;
        setTimeout(function () {
            _this.showLabel = !contentText || contentText.length < 1;
        }, 0);
    };
    ElCheckboxButton.decorators = [
        { type: Component, args: [{
                    selector: 'el-checkbox-button',
                    template: "\n    <label [class]=\"'el-checkbox-button' + (size ? ' el-checkbox-button--' + size : '') \"\n      role=\"checkbox\"\n      [class.is-disabled]=\"elDisabled\" [class.is-focus]=\"isFocus\"\n      [class.is-indeterminate]=\"indeterminate\" [class.is-checked]=\"checked\">\n      <input class=\"el-checkbox-button__original\" type=\"checkbox\"\n        [disabled]=\"elDisabled\" [value]=\"label\" [name]=\"name\"\n        [ngModel]=\"model\" (ngModelChange)=\"changeHandle($event)\"\n        (focus)=\"isFocus = true\" (blur)=\"isFocus = false\">\n      <span class=\"el-checkbox-button__inner\"\n        [style]=\"activeStyle()\">\n        <ng-container *ngIf=\"showLabel\">{{label}}</ng-container>\n        <span *ngIf=\"!showLabel\" #content>\n          <ng-content></ng-content>\n        </span>\n      </span>\n    </label>\n  ",
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCheckboxButton.ctorParameters = function () { return [
        { type: ElCheckboxGroup, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: DomSanitizer, },
    ]; };
    ElCheckboxButton.propDecorators = {
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
    return ElCheckboxButton;
}());
export { ElCheckboxButton };
function ElCheckboxButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCheckboxButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCheckboxButton.ctorParameters;
    /** @type {?} */
    ElCheckboxButton.propDecorators;
    /** @type {?} */
    ElCheckboxButton.prototype.content;
    /** @type {?} */
    ElCheckboxButton.prototype.elDisabled;
    /** @type {?} */
    ElCheckboxButton.prototype.label;
    /** @type {?} */
    ElCheckboxButton.prototype.model;
    /** @type {?} */
    ElCheckboxButton.prototype.indeterminate;
    /** @type {?} */
    ElCheckboxButton.prototype.checked;
    /** @type {?} */
    ElCheckboxButton.prototype.name;
    /** @type {?} */
    ElCheckboxButton.prototype.trueLabel;
    /** @type {?} */
    ElCheckboxButton.prototype.modelChange;
    /** @type {?} */
    ElCheckboxButton.prototype.labels;
    /** @type {?} */
    ElCheckboxButton.prototype.parentIsGroup;
    /** @type {?} */
    ElCheckboxButton.prototype.isFocus;
    /** @type {?} */
    ElCheckboxButton.prototype.showLabel;
    /** @type {?} */
    ElCheckboxButton.prototype.size;
    /** @type {?} */
    ElCheckboxButton.prototype.hostGroup;
    /** @type {?} */
    ElCheckboxButton.prototype.el;
    /** @type {?} */
    ElCheckboxButton.prototype.domSanitizer;
}
//# sourceMappingURL=checkbox-button.js.map