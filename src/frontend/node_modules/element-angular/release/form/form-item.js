import { Component, Input, Optional } from '@angular/core';
import { ElForm } from './form';
import { DomSanitizer } from '@angular/platform-browser';
var ElFormItem = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} sanitizer
     */
    function ElFormItem(root, sanitizer) {
        this.root = root;
        this.sanitizer = sanitizer;
        this.required = false;
        this.showMessage = true;
        this.statusSubscriber = [];
    }
    /**
     * @return {?}
     */
    ElFormItem.prototype.showMessageEl = function () {
        if (this.status !== 'error')
            return false;
        return this.error && this.showMessage && this.root.showMessage;
    };
    /**
     * @return {?}
     */
    ElFormItem.prototype.isInlineMessage = function () {
        var /** @type {?} */ notDefault = typeof this.inlineMessage === 'boolean';
        return notDefault ? this.inlineMessage : this.root.inlineMessage;
    };
    /**
     * @return {?}
     */
    ElFormItem.prototype.makeSize = function () {
        var /** @type {?} */ appointed = this.size || this.root.size || '';
        return appointed ? " el-form-item--" + appointed + " " : '';
    };
    /**
     * @return {?}
     */
    ElFormItem.prototype.makeLabelStyle = function () {
        var /** @type {?} */ width = this.labelWidth || this.root.labelWidth || null;
        var /** @type {?} */ styles = width && this.root.labelPosition !== 'top' ? "width: " + width + ";" : '';
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElFormItem.prototype.makeContentStyle = function () {
        var /** @type {?} */ skipStyle = (this.root.labelPosition === 'top' || this.root.inline)
            || (!this.label && !this.root.labelWidth);
        if (skipStyle)
            return this.sanitizer.bypassSecurityTrustStyle('');
        var /** @type {?} */ width = this.labelWidth || this.root.labelWidth;
        var /** @type {?} */ styles = "margin-left: " + width + ";";
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElFormItem.prototype.ngOnChanges = function (changes) {
        if (!this.root.showIcon)
            return;
        if (!changes || !changes.status)
            return;
        this.statusSubscriber.forEach(function (sub) {
            sub(changes.status.currentValue);
        });
    };
    ElFormItem.decorators = [
        { type: Component, args: [{
                    selector: 'el-form-item',
                    template: "\n  <div [class]=\"'el-form-item ' + makeSize()\"\n    [class.el-form-item--feedback]=\"root.showIcon\"\n    [class.is-error]=\"status === 'error'\"\n    [class.is-success]=\"status === 'success'\"\n    [class.is-validating]=\"status === 'validating'\"\n    [class.is-required]=\"required\">\n    <label class=\"el-form-item__label\" [style]=\"makeLabelStyle()\" *ngIf=\"label\">\n      {{label}}\n    </label>\n    <div class=\"el-form-item__content\" [style]=\"makeContentStyle()\">\n      <ng-content></ng-content>\n      <div *ngIf=\"showMessageEl\" class=\"el-form-item__error\"\n        [class.el-form-item__error--inline]=\"isInlineMessage()\">\n          {{error}}\n        </div>\n    </div>\n  </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElFormItem.ctorParameters = function () { return [
        { type: ElForm, decorators: [{ type: Optional },] },
        { type: DomSanitizer, },
    ]; };
    ElFormItem.propDecorators = {
        'status': [{ type: Input },],
        'error': [{ type: Input },],
        'label': [{ type: Input },],
        'size': [{ type: Input },],
        'required': [{ type: Input },],
        'labelWidth': [{ type: Input, args: ['label-width',] },],
        'showMessage': [{ type: Input, args: ['show-message',] },],
        'inlineMessage': [{ type: Input, args: ['inline-message',] },],
    };
    return ElFormItem;
}());
export { ElFormItem };
function ElFormItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElFormItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElFormItem.ctorParameters;
    /** @type {?} */
    ElFormItem.propDecorators;
    /** @type {?} */
    ElFormItem.prototype.status;
    /** @type {?} */
    ElFormItem.prototype.error;
    /** @type {?} */
    ElFormItem.prototype.label;
    /** @type {?} */
    ElFormItem.prototype.size;
    /** @type {?} */
    ElFormItem.prototype.required;
    /** @type {?} */
    ElFormItem.prototype.labelWidth;
    /** @type {?} */
    ElFormItem.prototype.showMessage;
    /** @type {?} */
    ElFormItem.prototype.inlineMessage;
    /** @type {?} */
    ElFormItem.prototype.statusSubscriber;
    /** @type {?} */
    ElFormItem.prototype.root;
    /** @type {?} */
    ElFormItem.prototype.sanitizer;
}
//# sourceMappingURL=form-item.js.map