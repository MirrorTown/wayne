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
import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, } from '@angular/core';
var DocumentWrapper = /** @class */ (function (_super) {
    __extends(DocumentWrapper, _super);
    function DocumentWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentWrapper.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    DocumentWrapper.ctorParameters = function () { return []; };
    return DocumentWrapper;
}(Document));
export { DocumentWrapper };
function DocumentWrapper_tsickle_Closure_declarations() {
    /** @type {?} */
    DocumentWrapper.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DocumentWrapper.ctorParameters;
}
var WindowWrapper = /** @class */ (function (_super) {
    __extends(WindowWrapper, _super);
    function WindowWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowWrapper.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    WindowWrapper.ctorParameters = function () { return []; };
    return WindowWrapper;
}(Window));
export { WindowWrapper };
function WindowWrapper_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowWrapper.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WindowWrapper.ctorParameters;
}
var ExDynamicService = /** @class */ (function () {
    /**
     * @param {?} document
     * @param {?} factory
     * @param {?} injector
     * @param {?} appRef
     */
    function ExDynamicService(document, factory, injector, appRef) {
        this.document = document;
        this.factory = factory;
        this.injector = injector;
        this.appRef = appRef;
    }
    /**
     * @param {?} Container
     * @return {?}
     */
    ExDynamicService.prototype.generator = function (Container) {
        var /** @type {?} */ id = this.makeID();
        var /** @type {?} */ component = this.factory
            .resolveComponentFactory(Container)
            .create(this.injector);
        this.appRef.attachView(component.hostView);
        var /** @type {?} */ hostElement = this.document.createElement('div');
        hostElement.setAttribute('id', id);
        component.instance.id = id;
        hostElement.appendChild(((component.hostView)).rootNodes[0]);
        this.document.body.appendChild(hostElement);
        return component;
    };
    /**
     * @param {?} com
     * @return {?}
     */
    ExDynamicService.prototype.destroy = function (com) {
        var _this = this;
        var /** @type {?} */ timer = setTimeout(function () {
            _this.destroyWait(com);
            clearTimeout(timer);
        }, 500);
    };
    /**
     * @param {?} com
     * @return {?}
     */
    ExDynamicService.prototype.destroyWait = function (com) {
        var /** @type {?} */ id = com.instance.id;
        this.appRef.detachView(com.hostView);
        com.destroy();
        try {
            var /** @type {?} */ hostElement = this.document.getElementById(id);
            hostElement && hostElement.parentElement.removeChild(hostElement);
        }
        catch (err) { }
    };
    /**
     * @return {?}
     */
    ExDynamicService.prototype.makeID = function () {
        return Math.random().toString(16).substr(2, 8);
    };
    ExDynamicService.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    ExDynamicService.ctorParameters = function () { return [
        { type: DocumentWrapper, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
        { type: ApplicationRef, },
    ]; };
    return ExDynamicService;
}());
export { ExDynamicService };
function ExDynamicService_tsickle_Closure_declarations() {
    /** @type {?} */
    ExDynamicService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ExDynamicService.ctorParameters;
    /** @type {?} */
    ExDynamicService.prototype.document;
    /** @type {?} */
    ExDynamicService.prototype.factory;
    /** @type {?} */
    ExDynamicService.prototype.injector;
    /** @type {?} */
    ExDynamicService.prototype.appRef;
}
//# sourceMappingURL=dynamic.service.js.map