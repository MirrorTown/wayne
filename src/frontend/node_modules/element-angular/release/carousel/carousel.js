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
import { Component, ContentChildren, forwardRef, } from '@angular/core';
import { ElCarouselItem } from './carousel-item';
import { ElCarouselProps } from './carousel-props';
import { carouselBtnLeftAnimation, carouselBtnRightAnimation } from './animations';
var ElCarousel = /** @class */ (function (_super) {
    __extends(ElCarousel, _super);
    function ElCarousel() {
        var _this = _super.call(this) || this;
        _this.subscriber = [];
        _this.items = [];
        _this.hasLabel = false;
        return _this;
    }
    /**
     * @param {?} nextValue
     * @param {?} eventType
     * @return {?}
     */
    ElCarousel.prototype.btnActionHandle = function (nextValue, eventType) {
        if (this.trigger !== eventType)
            return;
        this.autoplay && this.resetInterval();
        this.setActiveItem(nextValue);
    };
    /**
     * @param {?} nextValue
     * @param {?} eventType
     * @return {?}
     */
    ElCarousel.prototype.indicatorActionHandle = function (nextValue, eventType) {
        if (this.indicatorTrigger !== eventType)
            return;
        this.autoplay && this.resetInterval();
        this.setActiveItem(nextValue);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElCarousel.prototype.setActiveItem = function (index) {
        if (!this.children)
            return;
        var /** @type {?} */ len = this.children.length;
        var /** @type {?} */ nextValue = index >= len ? 0 : index < 0 ? len - 1 : index;
        this.model = nextValue;
        this.subscriber.forEach(function (func) { return func(); });
        this.modelChange.emit(this.model);
    };
    /**
     * @return {?}
     */
    ElCarousel.prototype.resetInterval = function () {
        var _this = this;
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(function () {
            _this.setActiveItem(_this.model + 1);
        }, this.interval);
    };
    /**
     * @return {?}
     */
    ElCarousel.prototype.ngAfterContentChecked = function () {
        var _this = this;
        var /** @type {?} */ timer = setTimeout(function () {
            _this.children.forEach(function (item, index) {
                item.index = index;
                item.updateActive();
                item.updateStyles();
            });
            // all labels are validated
            _this.hasLabel = !_this.items.some(function (item) { return !item; });
            // auto play
            _this.autoplay && _this.resetInterval();
            clearTimeout(timer);
        }, 0);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElCarousel.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        this.setActiveItem(changes.model.currentValue);
    };
    /**
     * @return {?}
     */
    ElCarousel.prototype.ngOnDestroy = function () {
        this.timer && clearInterval(this.timer);
    };
    ElCarousel.decorators = [
        { type: Component, args: [{
                    selector: 'el-carousel',
                    animations: [carouselBtnLeftAnimation, carouselBtnRightAnimation],
                    template: "\n    <div class=\"el-carousel\"\n      #carousel\n      [class.el-carousel--card]=\"type === 'card'\"\n      (mouseenter)=\"carousel.hover = true\"\n      (mouseleave)=\"carousel.hover = false\">\n      <div class=\"el-carousel__container\" [ngStyle]=\"{height: height}\">\n        <button class=\"el-carousel__arrow el-carousel__arrow--left\"\n          #leftBtn\n          *ngIf=\"arrow !== 'never'\"\n          [@carouselBtnLeftAnimation]=\"arrow === 'always' || carousel.hover\"\n          (mouseenter)=\"btnActionHandle(model - 1,'hover')\"\n          (click)=\"btnActionHandle(model - 1, 'click')\">\n          <i class=\"el-icon-arrow-left\"></i>\n        </button>\n        <button class=\"el-carousel__arrow el-carousel__arrow--right\"\n          #rightBtn\n          *ngIf=\"arrow !== 'never'\"\n          [@carouselBtnRightAnimation]=\"arrow === 'always' || carousel.hover\"\n          (mouseenter)=\"btnActionHandle(model + 1, 'hover')\"\n          (click)=\"btnActionHandle(model + 1, 'click')\">\n          <i class=\"el-icon-arrow-right\"></i>\n        </button>\n        <ng-content></ng-content>\n      </div>\n      <ul class=\"el-carousel__indicators\" *ngIf=\"indicatorPosition !== 'none'\"\n        [class.el-carousel__indicators--labels]=\"hasLabel\"\n        [class.el-carousel__indicators--outside]=\"indicatorPosition === 'outside' || type === 'card'\">\n        <li *ngFor=\"let item of items; let i = index\"\n          class=\"el-carousel__indicator\"\n          [class.is-active]=\"i === model\"\n          (mouseenter)=\"indicatorActionHandle(i, 'hover')\"\n          (click)=\"indicatorActionHandle(i, 'click')\">\n          <button class=\"el-carousel__button\">\n            <span *ngIf=\"hasLabel\">{{item}}</span>\n          </button>\n        </li>\n      </ul>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCarousel.ctorParameters = function () { return []; };
    ElCarousel.propDecorators = {
        'children': [{ type: ContentChildren, args: [forwardRef(function () { return ElCarouselItem; }),] },],
    };
    return ElCarousel;
}(ElCarouselProps));
export { ElCarousel };
function ElCarousel_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCarousel.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCarousel.ctorParameters;
    /** @type {?} */
    ElCarousel.propDecorators;
    /** @type {?} */
    ElCarousel.prototype.children;
    /** @type {?} */
    ElCarousel.prototype.subscriber;
    /** @type {?} */
    ElCarousel.prototype.items;
    /** @type {?} */
    ElCarousel.prototype.hasLabel;
    /** @type {?} */
    ElCarousel.prototype.timer;
}
//# sourceMappingURL=carousel.js.map