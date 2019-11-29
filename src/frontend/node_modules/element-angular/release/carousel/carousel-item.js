import { Component, ElementRef, forwardRef, Inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElCarousel } from './carousel';
import { fadeAnimation } from '../shared/animation/index';
import { removeNgTag } from '../shared/utils/index';
var ElCarouselItem = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} sanitizer
     * @param {?} el
     */
    function ElCarouselItem(root, sanitizer, el) {
        this.root = root;
        this.sanitizer = sanitizer;
        this.el = el;
        this.label = '';
        this.isActive = false;
    }
    /**
     * @return {?}
     */
    ElCarouselItem.prototype.updateActive = function () {
        var /** @type {?} */ isActive = this.root.model === this.index;
        if (this.isActive !== isActive) {
            this.isActive = isActive;
        }
    };
    /**
     * @return {?}
     */
    ElCarouselItem.prototype.updateStyles = function () {
        var /** @type {?} */ map = {
            '1': 0 - this.width,
            '-1': this.width,
            '2': this.width,
            '-2': 0 - this.width,
            '0': 0,
        };
        var /** @type {?} */ offset = this.root.model - this.index;
        var /** @type {?} */ translate = map[offset];
        var /** @type {?} */ styles = "transform: translateX(" + translate + "px);";
        // change direction disable animation
        var /** @type {?} */ changeDirection = (this.preTranslate < 0 && translate > 0)
            || (this.preTranslate > 0 && translate < 0);
        this.isAnimating = !changeDirection;
        this.styles = this.sanitizer.bypassSecurityTrustStyle(styles);
        // save current value
        this.preTranslate = translate;
    };
    /**
     * @return {?}
     */
    ElCarouselItem.prototype.update = function () {
        this.updateStyles();
        this.updateActive();
    };
    /**
     * @return {?}
     */
    ElCarouselItem.prototype.ngOnInit = function () {
        var _this = this;
        // collect items
        this.root.items.push(this.label);
        this.width = this.el.nativeElement.children[0].offsetWidth;
        removeNgTag(this.el.nativeElement);
        // manually update
        this.root.subscriber.push(function () { return _this.update(); });
        this.update();
    };
    ElCarouselItem.decorators = [
        { type: Component, args: [{
                    selector: 'el-carousel-item',
                    animations: [fadeAnimation],
                    template: "\n    <div class=\"el-carousel__item\"\n      [class.is-active]=\"isActive\"\n      [class.el-carousel__item--card]=\"root.type === 'card'\"\n      [class.is-animating]=\"isAnimating\"\n      [style]=\"styles\">\n      <!--<div class=\"el-carousel__mask\" *ngIf=\"root.type === 'card'\"-->\n        <!--[@fadeAnimation]=\"isActive()\">-->\n      <!--</div>-->\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCarouselItem.ctorParameters = function () { return [
        { type: ElCarousel, decorators: [{ type: Inject, args: [forwardRef(function () { return ElCarousel; }),] },] },
        { type: DomSanitizer, },
        { type: ElementRef, },
    ]; };
    ElCarouselItem.propDecorators = {
        'index': [{ type: Input },],
        'label': [{ type: Input },],
    };
    return ElCarouselItem;
}());
export { ElCarouselItem };
function ElCarouselItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCarouselItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCarouselItem.ctorParameters;
    /** @type {?} */
    ElCarouselItem.propDecorators;
    /** @type {?} */
    ElCarouselItem.prototype.index;
    /** @type {?} */
    ElCarouselItem.prototype.label;
    /** @type {?} */
    ElCarouselItem.prototype.width;
    /** @type {?} */
    ElCarouselItem.prototype.preTranslate;
    /** @type {?} */
    ElCarouselItem.prototype.isAnimating;
    /** @type {?} */
    ElCarouselItem.prototype.isActive;
    /** @type {?} */
    ElCarouselItem.prototype.styles;
    /** @type {?} */
    ElCarouselItem.prototype.root;
    /** @type {?} */
    ElCarouselItem.prototype.sanitizer;
    /** @type {?} */
    ElCarouselItem.prototype.el;
}
//# sourceMappingURL=carousel-item.js.map