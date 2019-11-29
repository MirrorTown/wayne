import { Injectable, Optional } from '@angular/core';
import { ElMessageContainer } from './message';
import { ExDynamicService } from '../shared/services/index';
var ElMessageService = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} dynamic
     */
    function ElMessageService(root, dynamic) {
        this.root = root;
        this.dynamic = dynamic;
        this.components = [];
        this.createComponent();
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    ElMessageService.prototype.show = function (msg) {
        var _this = this;
        if (this.components.length === 0 || this.components[this.components.length - 1].init) {
            this.createComponent();
        }
        // mark the component
        var /** @type {?} */ current = this.components[this.components.length - 1];
        current.init = true;
        current.instance.onDestroy = function () {
            // component detach and destroy
            _this.dynamic.destroy(current.copy);
            // remove empty item
            var /** @type {?} */ index = _this.components.findIndex(function (com) { return com.id === current.id; });
            _this.components.splice(index, 1);
        };
        var /** @type {?} */ timer = setTimeout(function () {
            current.instance.show(msg);
            clearTimeout(timer);
        }, 0);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    ElMessageService.prototype.success = function (msg) {
        this.setOptions({ type: 'success' });
        this.show(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    ElMessageService.prototype.warning = function (msg) {
        this.setOptions({ type: 'warning' });
        this.show(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    ElMessageService.prototype.info = function (msg) {
        this.setOptions({ type: 'info' });
        this.show(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    ElMessageService.prototype.error = function (msg) {
        this.setOptions({ type: 'error' });
        this.show(msg);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ElMessageService.prototype.setOptions = function (options) {
        if (this.components.length === 0 || this.components[this.components.length - 1].init) {
            this.createComponent();
        }
        var /** @type {?} */ last = this.components[this.components.length - 1];
        last.instance = Object.assign(last.instance, options);
    };
    /**
     * @return {?}
     */
    ElMessageService.prototype.createComponent = function () {
        var /** @type {?} */ com = this.dynamic.generator(ElMessageContainer);
        this.components.push({
            instance: com.instance,
            id: com.instance.id,
            copy: com,
            init: false
        });
    };
    ElMessageService.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    ElMessageService.ctorParameters = function () { return [
        { type: ElMessageContainer, decorators: [{ type: Optional },] },
        { type: ExDynamicService, },
    ]; };
    return ElMessageService;
}());
export { ElMessageService };
function ElMessageService_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMessageService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMessageService.ctorParameters;
    /** @type {?} */
    ElMessageService.prototype.components;
    /** @type {?} */
    ElMessageService.prototype.root;
    /** @type {?} */
    ElMessageService.prototype.dynamic;
}
//# sourceMappingURL=message.service.js.map