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
import { Component, ContentChild, ElementRef, forwardRef, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElInputPoprs } from './input-props';
import { getTextareaHeight } from './help';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isParentTag } from '../shared/utils/index';
import { ElFormItem } from '../form/form-item';
var ElInput = /** @class */ (function (_super) {
    __extends(ElInput, _super);
    /**
     * @param {?} sanitizer
     * @param {?} el
     * @param {?} form
     */
    function ElInput(sanitizer, el, form) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.el = el;
        _this.form = form;
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @return {?}
     */
    ElInput.prototype.makeTextareaStyles = function () {
        if (!this.autosize || this.type !== 'textarea')
            return;
        var /** @type {?} */ height = getTextareaHeight(this.textarea.nativeElement, this.autosize.minRows, this.autosize.maxRows);
        var /** @type {?} */ styles = "resize: " + this.resize + "; height: " + height + ";";
        this.textareaStyles = this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ElInput.prototype.handleInput = function (val) {
        var _this = this;
        this.model = val;
        this.modelChange.emit(val);
        this.controlChange(val);
        var /** @type {?} */ timer = setTimeout(function () {
            _this.makeTextareaStyles();
            clearTimeout(timer);
        }, 0);
    };
    /**
     * @return {?}
     */
    ElInput.prototype.showPointer = function () {
        var /** @type {?} */ clickEvent = !!(this.iconClick.observers && this.iconClick.observers.length);
        var /** @type {?} */ mouseEvent = !!(this.iconMousedown.observers && this.iconMousedown.observers.length);
        return clickEvent || mouseEvent;
    };
    /**
     * @return {?}
     */
    ElInput.prototype.ngOnInit = function () {
        var _this = this;
        // auto follow form status
        var /** @type {?} */ parentIsForm = isParentTag(this.el.nativeElement, 'el-form-item');
        if (parentIsForm) {
            var /** @type {?} */ iconStatus_1 = {
                error: 'circle-close', success: 'circle-check', validating: 'circle-validating',
            };
            this.iconClass = 'el-input__validateIcon';
            this.form.statusSubscriber.push(function (status) {
                _this.icon = iconStatus_1[status] || '';
            });
        }
        if (this.value && !this.model) {
            this.model = this.value;
        }
    };
    /**
     * @return {?}
     */
    ElInput.prototype.ngAfterViewInit = function () {
        var _this = this;
        // no content required
        if (this.type === 'textarea') {
            return setTimeout(function () {
                _this.makeTextareaStyles();
            }, 0);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElInput.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElInput.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElInput.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElInput.decorators = [
        { type: Component, args: [{
                    selector: 'el-input',
                    styles: ["\n    .icon-disabled { cursor: not-allowed; } .icon-disabled:before { cursor: not-allowed; }\n    .icon-pointer { cursor: pointer; }"],
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElInput; }),
                            multi: true
                        }],
                    template: "\n    <div [class]=\"(type === 'text' ? 'el-input' : 'el-textarea') +\n    (size ? ' el-input--' + size : '') + ' ' + parentClass\"\n      [class.is-disabled]=\"elDisabled\"\n      [class.el-input-group]=\"prepend || append\"\n      [class.el-input-group--append]=\"append\"\n      [class.el-input-group--prepend]=\"prepend\">\n      <ng-container *ngIf=\"type === 'text'\">\n        \n        <div class=\"el-input-group__prepend\" *ngIf=\"prepend\">\n          <ng-template [ngTemplateOutlet]=\"prepend\">\n          </ng-template>\n        </div>\n        \n        <span class=\"el-input__suffix\" *ngIf=\"icon\" (click)=\"iconClick.emit($event)\"\n          (mouseenter)=\"iconMouseEnter.emit($event)\" (mouseleave)=\"iconMouseLeave.emit($event)\"\n          (mousedown)=\"iconMousedown.emit($event)\" (mouseup)=\"iconMouseup.emit($event)\"\n          [class.icon-pointer]=\"showPointer()\"\n          [class.icon-disabled]=\"elDisabled\">\n          <span class=\"el-input__suffix-inner\">\n            <i [class]=\"'el-input__icon ' + ('el-icon-' + icon) + (iconClick ? ' is-clickable ' : ' ')\n              + (iconClass ? iconClass : '')\"\n              [attr.disabled]=\"elDisabled\"\n              [class.icon-disabled]=\"elDisabled\"\n              *ngIf=\"icon\"></i>\n          </span>\n        </span>\n        <input class=\"el-input__inner\"\n          [autocomplete]=\"autoComplete\" [value]=\"value\" [name]=\"name\" [type]=\"nativeType\"\n          [placeholder]=\"placeholder\" [autofocus]=\"autofocus\"\n          [disabled]=\"elDisabled\" [readonly]=\"readonly\"\n          [maxlength]=\"maxlength\" [minlength]=\"minlength\"\n          [ngModel]=\"model\" (ngModelChange)=\"handleInput($event)\"\n          (focus)=\"focus.emit($event)\" (blur)=\"blur.emit($event)\">\n        <i *ngIf=\"validating\" class=\"el-input__icon el-icon-loading\"></i>\n        \n        <div class=\"el-input-group__append\" *ngIf=\"append\">\n          <ng-template [ngTemplateOutlet]=\"append\">\n          </ng-template>\n        </div>\n      </ng-container>\n      \n      <ng-container *ngIf=\"type === 'textarea'\">\n        <textarea class=\"el-textarea__inner\" #textarea\n          [style]=\"textareaStyles\"\n          [value]=\"value\" [name]=\"name\"\n          [placeholder]=\"placeholder\" [autofocus]=\"autofocus\"\n          [disabled]=\"elDisabled\" [readonly]=\"readonly\"\n          [maxlength]=\"maxlength\" [minlength]=\"minlength\"\n          [ngModel]=\"model\" (input)=\"handleInput($event.target.value)\"\n          (focus)=\"focus.emit($event)\" (blur)=\"blur.emit($event)\"></textarea>\n      </ng-container>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElInput.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: ElFormItem, },
    ]; };
    ElInput.propDecorators = {
        'prepend': [{ type: ContentChild, args: ['prepend',] },],
        'append': [{ type: ContentChild, args: ['append',] },],
        'textarea': [{ type: ViewChild, args: ['textarea',] },],
    };
    return ElInput;
}(ElInputPoprs));
export { ElInput };
function ElInput_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInput.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElInput.ctorParameters;
    /** @type {?} */
    ElInput.propDecorators;
    /** @type {?} */
    ElInput.prototype.prepend;
    /** @type {?} */
    ElInput.prototype.append;
    /** @type {?} */
    ElInput.prototype.textarea;
    /** @type {?} */
    ElInput.prototype.textareaStyles;
    /** @type {?} */
    ElInput.prototype.controlChange;
    /** @type {?} */
    ElInput.prototype.controlTouch;
    /** @type {?} */
    ElInput.prototype.sanitizer;
    /** @type {?} */
    ElInput.prototype.el;
    /** @type {?} */
    ElInput.prototype.form;
}
//# sourceMappingURL=input.js.map