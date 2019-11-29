import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, } from '@angular/core';
import { removeNgTag } from '../shared/utils/index';
import { DomSanitizer } from '@angular/platform-browser';
var ElButton = /** @class */ (function () {
    /**
     * @param {?} el
     * @param {?} sanitizer
     */
    function ElButton(el, sanitizer) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.elDisabled = false;
        this.themeType = '';
        this.nativeType = 'button';
        this.size = '';
        this.icon = '';
        this.loading = false;
        this.plain = false;
        this.round = false;
        this.autofocus = false;
        this.style = '';
        this.nativeClass = '';
        this.click = new EventEmitter();
    }
    Object.defineProperty(ElButton.prototype, "disabled", {
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
     * @param {?} $event
     * @return {?}
     */
    ElButton.prototype.clickHandle = function ($event) {
        this.click.emit($event);
    };
    /**
     * @return {?}
     */
    ElButton.prototype.extendStyles = function () {
        return this.sanitizer.bypassSecurityTrustStyle(this.style);
    };
    /**
     * @return {?}
     */
    ElButton.prototype.ngOnInit = function () {
        removeNgTag(this.el.nativeElement);
    };
    ElButton.decorators = [
        { type: Component, args: [{
                    selector: 'el-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n  <button (click)=\"clickHandle($event)\"\n    [class]=\"'el-button ' + (themeType ? ' el-button--' + themeType : '')\n      + (size ? ' el-button--' + size : '') + ' ' + nativeClass\"\n    [class.is-disabled]=\"elDisabled\"\n    [class.is-loading]=\"loading\"\n    [class.is-plain]=\"plain\"\n    [class.is-round]=\"round\"\n    [disabled]=\"elDisabled\"\n    [type]=\"nativeType\"\n    [style]=\"extendStyles()\"\n    [autofocus]=\"autofocus\">\n    <i class=\"el-icon-loading\" *ngIf=\"loading\"></i>\n    <i [class]=\"'el-icon-' + icon\" *ngIf=\"icon && !loading\"></i>\n    <ng-content></ng-content>\n  </button>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElButton.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DomSanitizer, },
    ]; };
    ElButton.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'themeType': [{ type: Input, args: ['type',] },],
        'nativeType': [{ type: Input, args: ['native-type',] },],
        'size': [{ type: Input },],
        'icon': [{ type: Input },],
        'loading': [{ type: Input },],
        'plain': [{ type: Input },],
        'round': [{ type: Input },],
        'autofocus': [{ type: Input },],
        'style': [{ type: Input },],
        'nativeClass': [{ type: Input, args: ['class',] },],
        'click': [{ type: Output },],
    };
    return ElButton;
}());
export { ElButton };
function ElButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElButton.ctorParameters;
    /** @type {?} */
    ElButton.propDecorators;
    /** @type {?} */
    ElButton.prototype.elDisabled;
    /** @type {?} */
    ElButton.prototype.themeType;
    /** @type {?} */
    ElButton.prototype.nativeType;
    /** @type {?} */
    ElButton.prototype.size;
    /** @type {?} */
    ElButton.prototype.icon;
    /** @type {?} */
    ElButton.prototype.loading;
    /** @type {?} */
    ElButton.prototype.plain;
    /** @type {?} */
    ElButton.prototype.round;
    /** @type {?} */
    ElButton.prototype.autofocus;
    /** @type {?} */
    ElButton.prototype.style;
    /** @type {?} */
    ElButton.prototype.nativeClass;
    /** @type {?} */
    ElButton.prototype.click;
    /** @type {?} */
    ElButton.prototype.el;
    /** @type {?} */
    ElButton.prototype.sanitizer;
}
//# sourceMappingURL=button.js.map