import { Injectable, Optional } from '@angular/core';
import { ElNotificationContainer } from './notification';
import { ExDynamicService } from '../shared/services/index';
var ElNotificationService = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} dynamic
     */
    function ElNotificationService(root, dynamic) {
        this.root = root;
        this.dynamic = dynamic;
        this.components = [];
        this.createComponent();
    }
    /**
     * @param {?} msg
     * @param {?=} title
     * @return {?}
     */
    ElNotificationService.prototype.show = function (msg, title) {
        var _this = this;
        var /** @type {?} */ len = this.components.length;
        if (len === 0 || this.components[len - 1].init) {
            this.createComponent();
        }
        // mark the component
        var /** @type {?} */ currentLen = this.components.length;
        var /** @type {?} */ current = this.components[currentLen - 1];
        current.init = true;
        current.instance.setContent(msg, title);
        // init current component
        if (currentLen > 1) {
            var /** @type {?} */ lastInstance = this.components[currentLen - 2].instance;
            current.instance.offset = lastInstance.height + lastInstance.offset + 15;
        }
        current.instance.onDestroy = function () {
            var /** @type {?} */ index = _this.components.findIndex(function (com) { return com.id === current.id; });
            // reflow top style
            _this.components.forEach(function (com, i) {
                if (i <= index)
                    return;
                com.instance.offset = com.instance.offset - current.instance.height - 15;
            });
            // component detach and remove element
            _this.dynamic.destroy(current.copy);
            // remove empty item
            _this.components.splice(index, 1);
        };
        var /** @type {?} */ timer = setTimeout(function () {
            current.instance.show();
            clearTimeout(timer);
        }, 0);
    };
    /**
     * @param {?} msg
     * @param {?=} title
     * @return {?}
     */
    ElNotificationService.prototype.success = function (msg, title) {
        this.setOptions({ type: 'success' });
        this.show(msg, title);
    };
    /**
     * @param {?} msg
     * @param {?=} title
     * @return {?}
     */
    ElNotificationService.prototype.warning = function (msg, title) {
        this.setOptions({ type: 'warning' });
        this.show(msg, title);
    };
    /**
     * @param {?} msg
     * @param {?=} title
     * @return {?}
     */
    ElNotificationService.prototype.info = function (msg, title) {
        this.setOptions({ type: 'info' });
        this.show(msg, title);
    };
    /**
     * @param {?} msg
     * @param {?=} title
     * @return {?}
     */
    ElNotificationService.prototype.error = function (msg, title) {
        this.setOptions({ type: 'error' });
        this.show(msg, title);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ElNotificationService.prototype.setOptions = function (options) {
        if (this.components.length === 0 || this.components[this.components.length - 1].init) {
            this.createComponent();
        }
        var /** @type {?} */ last = this.components[this.components.length - 1];
        last.instance = Object.assign(last.instance, options);
    };
    /**
     * @return {?}
     */
    ElNotificationService.prototype.createComponent = function () {
        var /** @type {?} */ com = this.dynamic.generator(ElNotificationContainer);
        this.components.push({
            instance: com.instance,
            id: com.instance.id,
            copy: com,
            init: false
        });
    };
    ElNotificationService.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    ElNotificationService.ctorParameters = function () { return [
        { type: ElNotificationContainer, decorators: [{ type: Optional },] },
        { type: ExDynamicService, },
    ]; };
    return ElNotificationService;
}());
export { ElNotificationService };
function ElNotificationService_tsickle_Closure_declarations() {
    /** @type {?} */
    ElNotificationService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElNotificationService.ctorParameters;
    /** @type {?} */
    ElNotificationService.prototype.components;
    /** @type {?} */
    ElNotificationService.prototype.root;
    /** @type {?} */
    ElNotificationService.prototype.dynamic;
}
//# sourceMappingURL=notification.service.js.map