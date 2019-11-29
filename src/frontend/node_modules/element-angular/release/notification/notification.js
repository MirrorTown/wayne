import { Component, ElementRef } from '@angular/core';
import { notifyAnimation } from '../shared/animation/index';
export var /** @type {?} */ typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
};
var ElNotificationContainer = /** @class */ (function () {
    /**
     * @param {?} el
     */
    function ElNotificationContainer(el) {
        this.el = el;
        this.height = 0;
        // user setting
        this.offset = 15;
        this.type = '';
        this.duration = 3000;
        this.iconClass = '';
        this.customClass = '';
        this.zIndex = 1000;
        this.position = 'top-right';
        this.title = '';
        this.message = '';
        this.showBox = false;
        this.horizontalDirection = 'right';
        this.onClose = function () { };
        this.onDestroy = function () { };
    }
    /**
     * @return {?}
     */
    ElNotificationContainer.prototype.makeClass = function () {
        return typeMap[this.type] ? "el-icon-" + typeMap[this.type] : '';
    };
    /**
     * @param {?} message
     * @param {?=} title
     * @return {?}
     */
    ElNotificationContainer.prototype.setContent = function (message, title) {
        var _this = this;
        if (title === void 0) { title = ''; }
        this.message = message;
        this.title = title;
        setTimeout(function () {
            _this.height = _this.el.nativeElement.children[0].offsetHeight;
        }, 0);
    };
    /**
     * @return {?}
     */
    ElNotificationContainer.prototype.show = function () {
        var _this = this;
        this.showBox = true;
        this.timer = setTimeout(function () {
            _this.close();
        }, this.duration);
    };
    /**
     * @return {?}
     */
    ElNotificationContainer.prototype.close = function () {
        this.timer && clearTimeout(this.timer);
        this.showBox = false;
        this.onClose();
        this.onDestroy();
    };
    /**
     * @return {?}
     */
    ElNotificationContainer.prototype.startTimer = function () {
        var _this = this;
        if (!this.showBox)
            return;
        this.timer = setTimeout(function () {
            _this.close();
        }, this.duration);
    };
    /**
     * @return {?}
     */
    ElNotificationContainer.prototype.clearTimer = function () {
        this.timer && clearTimeout(this.timer);
    };
    /**
     * @return {?}
     */
    ElNotificationContainer.prototype.ngOnInit = function () {
        this.horizontalDirection = this.position.includes('right') ? 'right' : 'left';
    };
    ElNotificationContainer.decorators = [
        { type: Component, args: [{
                    selector: 'el-notification-container',
                    template: "\n    <div [class]=\"'el-notification ' + horizontalDirection + ' ' + customClass\"\n      [@notifyAnimation]=\"showBox\"\n      [ngStyle]=\"{top: (offset ? offset + 'px' : 'auto'), 'z-index': zIndex}\"\n      style=\"visibility: hidden;\"\n      (mouseenter)=\"clearTimer()\" (mouseleave)=\"startTimer()\">\n      <i [class]=\"'el-notification__icon ' + makeClass() + ' ' + iconClass\"\n        *ngIf=\"type || iconClass\"></i>\n      <div class=\"el-notification__group\" [class.is-with-icon]=\"makeClass() || iconClass\">\n        <h2 class=\"el-notification__title\" *ngIf=\"title\">{{title}}</h2>\n        <div class=\"el-notification__content\"><p>{{message}}</p></div>\n        <div class=\"el-notification__closeBtn el-icon-close\" (click)=\"close()\"></div>\n      </div>\n    </div>\n  ",
                    animations: [notifyAnimation]
                },] },
    ];
    /**
     * @nocollapse
     */
    ElNotificationContainer.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return ElNotificationContainer;
}());
export { ElNotificationContainer };
function ElNotificationContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    ElNotificationContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElNotificationContainer.ctorParameters;
    /** @type {?} */
    ElNotificationContainer.prototype.id;
    /** @type {?} */
    ElNotificationContainer.prototype.height;
    /** @type {?} */
    ElNotificationContainer.prototype.offset;
    /** @type {?} */
    ElNotificationContainer.prototype.type;
    /** @type {?} */
    ElNotificationContainer.prototype.duration;
    /** @type {?} */
    ElNotificationContainer.prototype.iconClass;
    /** @type {?} */
    ElNotificationContainer.prototype.customClass;
    /** @type {?} */
    ElNotificationContainer.prototype.zIndex;
    /** @type {?} */
    ElNotificationContainer.prototype.position;
    /** @type {?} */
    ElNotificationContainer.prototype.title;
    /** @type {?} */
    ElNotificationContainer.prototype.message;
    /** @type {?} */
    ElNotificationContainer.prototype.showBox;
    /** @type {?} */
    ElNotificationContainer.prototype.timer;
    /** @type {?} */
    ElNotificationContainer.prototype.horizontalDirection;
    /** @type {?} */
    ElNotificationContainer.prototype.onClose;
    /** @type {?} */
    ElNotificationContainer.prototype.onDestroy;
    /** @type {?} */
    ElNotificationContainer.prototype.el;
}
//# sourceMappingURL=notification.js.map