import { Component, ContentChild, ElementRef, Input, Renderer2, ViewChild, } from '@angular/core';
import { fadeAnimation } from '../shared/animation/index';
import { WindowWrapper } from '../shared/services/index';
import { getRealShape, getPositionForDir } from '../shared/utils/index';
var ElTooltip = /** @class */ (function () {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} window
     */
    function ElTooltip(renderer, el, window) {
        this.renderer = renderer;
        this.el = el;
        this.window = window;
        this.elDisabled = false;
        this.watch = false;
        this.placement = 'bottom';
        this.effect = 'dark';
        this.visibleArrow = true;
        this.xPlacement = 'bottom';
        this.showPopper = true;
        this.cache = {};
    }
    Object.defineProperty(ElTooltip.prototype, "disabled", {
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
     * @param {?} hostRect
     * @param {?} selfRect
     * @return {?}
     */
    ElTooltip.prototype.getPosition = function (hostRect, selfRect) {
        var /** @type {?} */ doubleConventions = this.placement.includes('-');
        var /** @type {?} */ arrowDir = doubleConventions ? this.placement.split('-')[1] : 'center';
        var /** @type {?} */ dir = doubleConventions ? this.placement.split('-')[0] : this.placement;
        var /** @type {?} */ position = getPositionForDir(hostRect, selfRect, dir, arrowDir);
        this.cache.position = position;
        this.cache.hostRect = hostRect;
    };
    /**
     * @return {?}
     */
    ElTooltip.prototype.setPopoerPositionAndShow = function () {
        var _a = this.cache, tipElement = _a.tipElement, position = _a.position;
        var /** @type {?} */ arrowElement = tipElement.querySelector('.popper__arrow');
        this.xPlacement = position.arrowFace;
        this.renderer.setStyle(tipElement, 'left', position.left + "px");
        this.renderer.setStyle(tipElement, 'top', position.top + "px");
        // fix tipbox auto wrap
        this.renderer.setStyle(tipElement, 'width', this.tipElementShape.width + "px");
        this.renderer.setStyle(tipElement, 'height', this.tipElementShape.height + "px");
        this.renderer.setStyle(arrowElement, position.arrowDir, position.arrowPosition + "px");
    };
    /**
     * @param {?} host
     * @return {?}
     */
    ElTooltip.prototype.bindEvent = function (host) {
        var _this = this;
        host.addEventListener('mouseenter', function () {
            if (_this.elDisabled)
                return;
            _this.setPopoerPositionAndShow();
            _this.showPopper = true;
        });
        host.addEventListener('mouseleave', function () {
            _this.showPopper = false;
            _this.watch && _this.update();
        });
    };
    /**
     * @return {?}
     */
    ElTooltip.prototype.update = function () {
        var _this = this;
        var _a = this.cache, tipElement = _a.tipElement, hostRect = _a.hostRect;
        this.renderer.setStyle(tipElement, 'width', 'auto');
        this.renderer.setStyle(tipElement, 'height', 'auto');
        setTimeout(function () {
            _this.tipElementShape = getRealShape(tipElement);
            var /** @type {?} */ tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
            _this.getPosition(hostRect, tipRect);
            _this.renderer.setStyle(tipElement, 'width', _this.tipElementShape.width + "px");
            _this.renderer.setStyle(tipElement, 'height', _this.tipElementShape.height + "px");
        }, 0);
    };
    /**
     * @return {?}
     */
    ElTooltip.prototype.ngAfterContentInit = function () {
        var _this = this;
        var /** @type {?} */ tipElement = this.popperContent.nativeElement;
        var /** @type {?} */ hostElement = this.el.nativeElement.children[0];
        this.bindEvent(hostElement);
        this.cache.tipElement = tipElement;
        var /** @type {?} */ timer = setTimeout(function () {
            _this.tipElementShape = getRealShape(tipElement);
            var /** @type {?} */ tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
            var /** @type {?} */ hostRect = hostElement.getBoundingClientRect();
            _this.getPosition(hostRect, tipRect);
            clearTimeout(timer);
        }, 0);
    };
    ElTooltip.decorators = [
        { type: Component, args: [{
                    selector: 'el-tooltip',
                    template: "\n    <div style=\"position: relative; display: inline-block;\">\n      <div [class]=\"'el-tooltip__popper is-' + effect + ' ' + popperClass\"\n        style=\"left: -20000px; top: 0; position: absolute;\"\n        [@fadeAnimation]=\"!showPopper\" [attr.x-placement]=\"xPlacement\" #popperContent>\n        <div x-arrow class=\"popper__arrow\" [hidden]=\"!visibleArrow\"></div>\n        <ng-template [ngTemplateOutlet]=\"tip\"></ng-template>\n      </div>\n      <ng-content></ng-content>\n    </div>\n  ",
                    animations: [fadeAnimation],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTooltip.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: WindowWrapper, },
    ]; };
    ElTooltip.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'watch': [{ type: Input },],
        'placement': [{ type: Input },],
        'popperClass': [{ type: Input },],
        'effect': [{ type: Input },],
        'visibleArrow': [{ type: Input, args: ['visible-arrow',] },],
        'popperContent': [{ type: ViewChild, args: ['popperContent',] },],
        'tip': [{ type: ContentChild, args: ['tip',] },],
    };
    return ElTooltip;
}());
export { ElTooltip };
function ElTooltip_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTooltip.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTooltip.ctorParameters;
    /** @type {?} */
    ElTooltip.propDecorators;
    /** @type {?} */
    ElTooltip.prototype.elDisabled;
    /** @type {?} */
    ElTooltip.prototype.watch;
    /** @type {?} */
    ElTooltip.prototype.placement;
    /** @type {?} */
    ElTooltip.prototype.popperClass;
    /** @type {?} */
    ElTooltip.prototype.effect;
    /** @type {?} */
    ElTooltip.prototype.visibleArrow;
    /** @type {?} */
    ElTooltip.prototype.popperContent;
    /** @type {?} */
    ElTooltip.prototype.tip;
    /** @type {?} */
    ElTooltip.prototype.xPlacement;
    /** @type {?} */
    ElTooltip.prototype.showPopper;
    /** @type {?} */
    ElTooltip.prototype.cache;
    /** @type {?} */
    ElTooltip.prototype.tipElementShape;
    /** @type {?} */
    ElTooltip.prototype.renderer;
    /** @type {?} */
    ElTooltip.prototype.el;
    /** @type {?} */
    ElTooltip.prototype.window;
}
//# sourceMappingURL=tooltip.js.map