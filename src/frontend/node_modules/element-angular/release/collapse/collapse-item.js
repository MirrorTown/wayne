import { Component, ContentChild, Input, Optional } from '@angular/core';
import { ElCollapse } from './collapse';
import { dropAnimation } from '../shared/animation/index';
var ElCollapseItem = /** @class */ (function () {
    /**
     * @param {?} root
     */
    function ElCollapseItem(root) {
        this.root = root;
        this.value = null;
        this.isActive = false;
    }
    /**
     * @return {?}
     */
    ElCollapseItem.prototype.updateActiveStatus = function () {
        var _this = this;
        this.isActive = this.root.modelValue.some(function (val) { return val === _this.value; });
    };
    /**
     * @return {?}
     */
    ElCollapseItem.prototype.clickHandle = function () {
        if (this.value === null) {
            this.value = Math.random().toString(16).substr(2, 8);
        }
        this.root.updateModel(this.value);
    };
    /**
     * @return {?}
     */
    ElCollapseItem.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ updateHandle = function () { return _this.updateActiveStatus(); };
        this.root.subscriber.push(updateHandle);
    };
    ElCollapseItem.decorators = [
        { type: Component, args: [{
                    selector: 'el-collapse-item',
                    animations: [dropAnimation],
                    styles: [".el-collapse-item-fix-border:last-child { margin-bottom: 0; }"],
                    template: "\n    <div class=\"el-collapse-item el-collapse-item-fix-border\" [class.is-active]=\"isActive\">\n      <div role=\"tab\" [attr.aria-expanded]=\"isActive\">\n        <div class=\"el-collapse-item__header\" (click)=\"clickHandle()\" role=\"button\">\n          <i class=\"el-collapse-item__arrow el-icon-arrow-right\"></i>\n          <ng-container *ngIf=\"labelTmp\">\n            <ng-template [ngTemplateOutlet]=\"labelTmp\">\n            </ng-template>\n          </ng-container>\n          <ng-container *ngIf=\"!labelTmp\">{{label}}</ng-container>\n        </div>\n      </div>\n      \n      <div class=\"el-collapse-item__wrap\" [ngStyle]=\"{'border-width': isActive ? '1px' : '0'}\">\n        <div class=\"el-collapse-item__content\" [@dropAnimation]=\"isActive\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCollapseItem.ctorParameters = function () { return [
        { type: ElCollapse, decorators: [{ type: Optional },] },
    ]; };
    ElCollapseItem.propDecorators = {
        'labelTmp': [{ type: ContentChild, args: ['label',] },],
        'label': [{ type: Input },],
        'value': [{ type: Input },],
    };
    return ElCollapseItem;
}());
export { ElCollapseItem };
function ElCollapseItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCollapseItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCollapseItem.ctorParameters;
    /** @type {?} */
    ElCollapseItem.propDecorators;
    /** @type {?} */
    ElCollapseItem.prototype.labelTmp;
    /** @type {?} */
    ElCollapseItem.prototype.label;
    /** @type {?} */
    ElCollapseItem.prototype.value;
    /** @type {?} */
    ElCollapseItem.prototype.isActive;
    /** @type {?} */
    ElCollapseItem.prototype.root;
}
//# sourceMappingURL=collapse-item.js.map