import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ContentChild, } from '@angular/core';
import { fadeAnimation } from './animation';
export var /** @type {?} */ ICON_CLASS_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error',
    'info': 'el-icon-info',
};
var ElAlert = /** @class */ (function () {
    function ElAlert() {
        this.type = 'info';
        this.center = false;
        this.closable = true;
        this.closeText = '';
        this.showIcon = false;
        this.close = new EventEmitter();
        this.visible = true;
    }
    /**
     * @return {?}
     */
    ElAlert.prototype.makeIconClass = function () {
        var /** @type {?} */ base = ICON_CLASS_MAP[this.type] || 'el-icon-info';
        var /** @type {?} */ isBig = this.description || this.descriptionTmp ? ' is-big' : '';
        return base + isBig;
    };
    /**
     * @return {?}
     */
    ElAlert.prototype.makeTitleClass = function () {
        return this.description || this.descriptionTmp ? ' is-bold' : '';
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElAlert.prototype.clickHandle = function (event) {
        this.visible = false;
        this.close.emit(event);
    };
    ElAlert.decorators = [
        { type: Component, args: [{
                    selector: 'el-alert',
                    animations: [fadeAnimation],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div [class]=\"'el-alert el-alert--' + type\" [@fadeAnimation]=\"!visible\"\n      [class.is-center]=\"center\" role=\"alert\">\n      <i [class]=\"'el-alert__icon ' + makeIconClass()\" *ngIf=\"showIcon\"></i>\n      <div class=\"el-alert__content\">\n        <span [class]=\"'el-alert__title ' + makeTitleClass()\">\n          <ng-content></ng-content>\n        </span>\n        <p class=\"el-alert__description\" *ngIf=\"description && !descriptionTmp\">{{description}}</p>\n        <p class=\"el-alert__description\" *ngIf=\"descriptionTmp\"><ng-template [ngTemplateOutlet]=\"descriptionTmp\"></ng-template></p>\n        <i class=\"el-alert__closebtn\"\n          *ngIf=\"closable\"\n          [class.is-customed]=\"closeText !== ''\"\n          [class.el-icon-close]=\"closeText === ''\"\n          (click)=\"clickHandle($event)\">\n          {{closeText}}\n        </i>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElAlert.ctorParameters = function () { return []; };
    ElAlert.propDecorators = {
        'descriptionTmp': [{ type: ContentChild, args: ['description',] },],
        'type': [{ type: Input },],
        'center': [{ type: Input },],
        'description': [{ type: Input },],
        'closable': [{ type: Input },],
        'closeText': [{ type: Input, args: ['close-text',] },],
        'showIcon': [{ type: Input, args: ['show-icon',] },],
        'close': [{ type: Output },],
    };
    return ElAlert;
}());
export { ElAlert };
function ElAlert_tsickle_Closure_declarations() {
    /** @type {?} */
    ElAlert.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElAlert.ctorParameters;
    /** @type {?} */
    ElAlert.propDecorators;
    /** @type {?} */
    ElAlert.prototype.descriptionTmp;
    /** @type {?} */
    ElAlert.prototype.type;
    /** @type {?} */
    ElAlert.prototype.center;
    /** @type {?} */
    ElAlert.prototype.description;
    /** @type {?} */
    ElAlert.prototype.closable;
    /** @type {?} */
    ElAlert.prototype.closeText;
    /** @type {?} */
    ElAlert.prototype.showIcon;
    /** @type {?} */
    ElAlert.prototype.close;
    /** @type {?} */
    ElAlert.prototype.visible;
}
//# sourceMappingURL=alert.js.map