import { Input, Directive, ElementRef, Renderer2, } from '@angular/core';
import { DocumentWrapper, WindowWrapper } from '../shared/services/index';
var ElLoadingDirective = /** @class */ (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} document
     * @param {?} window
     */
    function ElLoadingDirective(el, renderer, document, window) {
        this.el = el;
        this.renderer = renderer;
        this.document = document;
        this.window = window;
        this.lock = false; // ban scroll on loading active
        this.fullScreen = false;
        this.elLoadingTop = '50%';
        this.visible = false;
    }
    Object.defineProperty(ElLoadingDirective.prototype, "showLoading", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this.visible = val;
            if (!this.cacheElement)
                return;
            this.cacheElement.innerHTML = this.makeHtml();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} status
     * @return {?}
     */
    ElLoadingDirective.prototype.toggleLock = function (status) {
        if (status === void 0) { status = false; }
        if (!this.lock)
            return;
        var /** @type {?} */ nextValue = status ? 'hidden' : this.cacheOverflow;
        this.renderer.setStyle(this.document.body, 'overflow', nextValue);
    };
    /**
     * @return {?}
     */
    ElLoadingDirective.prototype.makeHtml = function () {
        this.lock && this.toggleLock(this.visible);
        return "\n      <div class=\"el-loading-mask " + this.customClass + " " + (this.fullScreen ? ' is-fullscreen' : '') + "\"\n        style=\"display: " + (this.visible ? 'block' : 'none') + "\">\n        <div class=\"el-loading-spinner\" style=\"top: " + this.elLoadingTop + "\">\n          <svg class=\"circular\" viewBox=\"25 25 50 50\">\n            <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\"/>\n          </svg>\n          <p class=\"el-loading-text\" style=\"display: " + (this.text ? 'block' : 'none') + "\">\n            " + this.text + "\n          </p>\n        </div>\n      </div>\n    ";
    };
    /**
     * @return {?}
     */
    ElLoadingDirective.prototype.ngOnInit = function () {
        // save old overflow
        if (this.lock) {
            this.cacheOverflow = this.window.getComputedStyle(this.document.body).overflow;
        }
        this.cacheElement = this.renderer.createElement('div');
        this.cacheElement.innerHTML = this.makeHtml();
        var /** @type {?} */ parentElement = this.fullScreen ? this.document.body : this.el.nativeElement;
        if (!this.fullScreen) {
            this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        }
        this.renderer.appendChild(parentElement, this.cacheElement);
    };
    ElLoadingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-loading]',
                },] },
    ];
    /**
     * @nocollapse
     */
    ElLoadingDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: DocumentWrapper, },
        { type: WindowWrapper, },
    ]; };
    ElLoadingDirective.propDecorators = {
        'text': [{ type: Input },],
        'lock': [{ type: Input },],
        'customClass': [{ type: Input, args: ['custom-class',] },],
        'fullScreen': [{ type: Input, args: ['full-screen',] },],
        'elLoadingTop': [{ type: Input, args: ['el-loading-top',] },],
        'showLoading': [{ type: Input, args: ['el-loading',] },],
    };
    return ElLoadingDirective;
}());
export { ElLoadingDirective };
function ElLoadingDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElLoadingDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElLoadingDirective.ctorParameters;
    /** @type {?} */
    ElLoadingDirective.propDecorators;
    /** @type {?} */
    ElLoadingDirective.prototype.text;
    /** @type {?} */
    ElLoadingDirective.prototype.lock;
    /** @type {?} */
    ElLoadingDirective.prototype.customClass;
    /** @type {?} */
    ElLoadingDirective.prototype.fullScreen;
    /** @type {?} */
    ElLoadingDirective.prototype.elLoadingTop;
    /** @type {?} */
    ElLoadingDirective.prototype.cacheElement;
    /** @type {?} */
    ElLoadingDirective.prototype.cacheOverflow;
    /** @type {?} */
    ElLoadingDirective.prototype.visible;
    /** @type {?} */
    ElLoadingDirective.prototype.el;
    /** @type {?} */
    ElLoadingDirective.prototype.renderer;
    /** @type {?} */
    ElLoadingDirective.prototype.document;
    /** @type {?} */
    ElLoadingDirective.prototype.window;
}
//# sourceMappingURL=loading.directive.js.map