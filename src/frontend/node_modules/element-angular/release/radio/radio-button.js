import { Component, Input, Output, EventEmitter, Optional, ElementRef, } from '@angular/core';
import { ElRadioGroup } from './radio-group';
import { isParentTag, removeNgTag } from '../shared/utils/index';
var ElRadioButton = /** @class */ (function () {
    /**
     * @param {?} rootGroup
     * @param {?} el
     */
    function ElRadioButton(rootGroup, el) {
        this.rootGroup = rootGroup;
        this.el = el;
        this.elDisabled = false;
        this.nativeName = '';
        this.modelChange = new EventEmitter();
        this.showLabel = false;
        this.parentIsGroup = false;
    }
    Object.defineProperty(ElRadioButton.prototype, "disabled", {
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
    ElRadioButton.prototype.changeHandle = function () {
        if (this.parentIsGroup) {
            return this.rootGroup.changeHandle(this.label);
        }
        this.modelChange.emit(this.label);
    };
    /**
     * @return {?}
     */
    ElRadioButton.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ nativeElement = this.el.nativeElement;
        var /** @type {?} */ update = function () {
            _this.elDisabled = _this.rootGroup.elDisabled;
            _this.model = _this.rootGroup.model;
            _this.size = _this.rootGroup.buttonSize;
            _this.activeStyles = {
                backgroundColor: _this.rootGroup.fillColor || '',
                borderColor: _this.rootGroup.fillColor || '',
                boxShadow: _this.rootGroup.fillColor ? "-1px 0 0 0 " + _this.rootGroup.fillColor : '',
                color: _this.rootGroup.textColor || '',
            };
        };
        this.parentIsGroup = isParentTag(nativeElement, 'el-radio-group');
        removeNgTag(nativeElement);
        if (this.parentIsGroup && this.rootGroup) {
            update();
            this.rootGroup.subscriber.push(update);
        }
    };
    ElRadioButton.decorators = [
        { type: Component, args: [{
                    selector: 'el-radio-button',
                    template: "\n    <label [class]=\"'el-radio-button' + (size ? ' el-radio-button--' + size : '')\"\n      [class.is-disabled]=\"elDisabled\"\n      [class.is-active]=\"model === label\">\n      <input class=\"el-radio-button__orig-radio\" type=\"radio\"\n        [value]=\"label\" [name]=\"nativeName\" [disabled]=\"elDisabled\"\n        [ngModel]=\"model\" (ngModelChange)=\"changeHandle()\">\n      <span class=\"el-radio-button__inner\" [ngStyle]=\"model === label && activeStyles\">\n        <ng-content></ng-content>\n      </span>\n    </label>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRadioButton.ctorParameters = function () { return [
        { type: ElRadioGroup, decorators: [{ type: Optional },] },
        { type: ElementRef, },
    ]; };
    ElRadioButton.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'label': [{ type: Input },],
        'nativeName': [{ type: Input, args: ['name',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElRadioButton;
}());
export { ElRadioButton };
function ElRadioButton_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadioButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadioButton.ctorParameters;
    /** @type {?} */
    ElRadioButton.propDecorators;
    /** @type {?} */
    ElRadioButton.prototype.elDisabled;
    /** @type {?} */
    ElRadioButton.prototype.label;
    /** @type {?} */
    ElRadioButton.prototype.nativeName;
    /** @type {?} */
    ElRadioButton.prototype.model;
    /** @type {?} */
    ElRadioButton.prototype.modelChange;
    /** @type {?} */
    ElRadioButton.prototype.size;
    /** @type {?} */
    ElRadioButton.prototype.showLabel;
    /** @type {?} */
    ElRadioButton.prototype.parentIsGroup;
    /** @type {?} */
    ElRadioButton.prototype.activeStyles;
    /** @type {?} */
    ElRadioButton.prototype.rootGroup;
    /** @type {?} */
    ElRadioButton.prototype.el;
}
//# sourceMappingURL=radio-button.js.map