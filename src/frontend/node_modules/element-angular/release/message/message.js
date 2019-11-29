import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as Icons from './images';
import { MessageAnimation } from './message.animation';
var ElMessageContainer = /** @class */ (function () {
    /**
     * @param {?} sanitizer
     */
    function ElMessageContainer(sanitizer) {
        this.sanitizer = sanitizer;
        this.showClose = false;
        this.type = 'info';
        this.center = false;
        this.duration = 3000;
        // user setting
        this.iconClass = '';
        this.customClass = '';
        this.zIndex = 1000;
        this.message = '';
        this.showBox = false;
        this.onClose = function () { };
        this.onDestroy = function () { };
    }
    /**
     * @return {?}
     */
    ElMessageContainer.prototype.makeTypeClass = function () {
        return this.type && !this.iconClass ? "el-message__icon el-icon-" + this.type : '';
    };
    /**
     * @return {?}
     */
    ElMessageContainer.prototype.makeLink = function () {
        return this.sanitizer.bypassSecurityTrustUrl(Icons[this.type]);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ElMessageContainer.prototype.show = function (message) {
        var _this = this;
        this.message = message;
        this.showBox = true;
        this.timer = setTimeout(function () {
            _this.close();
        }, this.duration);
    };
    /**
     * @return {?}
     */
    ElMessageContainer.prototype.close = function () {
        this.timer && clearTimeout(this.timer);
        this.showBox = false;
        this.onClose();
        this.onDestroy();
    };
    /**
     * @return {?}
     */
    ElMessageContainer.prototype.startTimer = function () {
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
    ElMessageContainer.prototype.clearTimer = function () {
        this.timer && clearTimeout(this.timer);
    };
    ElMessageContainer.decorators = [
        { type: Component, args: [{
                    selector: 'el-message-container',
                    styles: [""],
                    template: "\n    <div [class]=\"'el-message ' + customClass + (type && !iconClass ? ' el-message--' + type : '')\"\n      [class.is-center]=\"center\"\n      style=\"visibility: hidden; transition: all .25s\" role=\"alertdialog\"\n      [ngStyle]=\"{ 'z-index': zIndex }\"\n      (mouseenter)=\"clearTimer()\" (mouseleave)=\"startTimer()\"\n      [@messageAnimation]=\"showBox\">\n      <i [class]=\"iconClass\" *ngIf=\"iconClass\"></i>\n      <i [class]=\"makeTypeClass()\" *ngIf=\"!iconClass\"></i>\n      \n      <p class=\"el-message__content\" tabindex=\"0\">{{ message }}</p>\n      <div *ngIf=\"showClose\" class=\"el-message__closeBtn el-icon-close\" (click)=\"close()\" role=\"button\"></div>\n    </div>\n  ",
                    animations: [MessageAnimation]
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMessageContainer.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    return ElMessageContainer;
}());
export { ElMessageContainer };
function ElMessageContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMessageContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMessageContainer.ctorParameters;
    /** @type {?} */
    ElMessageContainer.prototype.id;
    /** @type {?} */
    ElMessageContainer.prototype.showClose;
    /** @type {?} */
    ElMessageContainer.prototype.type;
    /** @type {?} */
    ElMessageContainer.prototype.center;
    /** @type {?} */
    ElMessageContainer.prototype.duration;
    /** @type {?} */
    ElMessageContainer.prototype.iconClass;
    /** @type {?} */
    ElMessageContainer.prototype.customClass;
    /** @type {?} */
    ElMessageContainer.prototype.zIndex;
    /** @type {?} */
    ElMessageContainer.prototype.message;
    /** @type {?} */
    ElMessageContainer.prototype.showBox;
    /** @type {?} */
    ElMessageContainer.prototype.timer;
    /** @type {?} */
    ElMessageContainer.prototype.onClose;
    /** @type {?} */
    ElMessageContainer.prototype.onDestroy;
    /** @type {?} */
    ElMessageContainer.prototype.sanitizer;
}
//# sourceMappingURL=message.js.map