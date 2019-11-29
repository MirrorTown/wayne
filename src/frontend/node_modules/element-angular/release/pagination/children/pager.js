import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElPaginationPager = /** @class */ (function () {
    function ElPaginationPager() {
        this.current = 1;
        this.next = new EventEmitter();
        this.showPrevMore = false;
        this.showNextMore = false;
        this.quicknextIconClass = 'el-icon-more';
        this.quickprevIconClass = 'el-icon-more';
    }
    /**
     * @param {?} minValue
     * @return {?}
     */
    ElPaginationPager.pagerGenerator = function (minValue) {
        var /** @type {?} */ target = new Array(5).fill('').map(function (v, i) { return i + minValue; });
        return target;
    };
    /**
     * Always show 5 numbers, excluding head and foot
     * like: 1 ... < 5, 6, 7, 8, 9 > ... 100
     *
     * jump page button is [showPrevMore] and [showNextMore]
     *
     * @param {?} current
     * @param {?} count
     * @return {?} number[], like: [2, 3, 4, 5, 6]
     *
     */
    ElPaginationPager.prototype.makePagers = function (current, count) {
        var /** @type {?} */ pagerCount = 7;
        if (count < pagerCount) {
            this.setMoreBtn(false, false);
            var /** @type {?} */ target = ElPaginationPager.pagerGenerator(2);
            target.length = count - 2 >= 0 ? count - 2 : 0;
            return target;
        }
        var /** @type {?} */ max = current + 2;
        var /** @type {?} */ min = current - 2;
        if (max >= count) {
            this.setMoreBtn(true, false);
            return ElPaginationPager.pagerGenerator(count - 5);
        }
        if (min <= 2) {
            this.setMoreBtn(false, true);
            return ElPaginationPager.pagerGenerator(2);
        }
        this.setMoreBtn(true, true);
        return ElPaginationPager.pagerGenerator(min);
    };
    /**
     * @param {?} prev
     * @param {?} next
     * @return {?}
     */
    ElPaginationPager.prototype.setMoreBtn = function (prev, next) {
        this.showPrevMore = prev;
        this.showNextMore = next;
    };
    /**
     * @param {?} to
     * @return {?}
     */
    ElPaginationPager.prototype.clickHandle = function (to) {
        var /** @type {?} */ step = to - this.current;
        this.next.emit(step);
    };
    /**
     * @param {?} step
     * @return {?}
     */
    ElPaginationPager.prototype.jumpHandle = function (step) {
        this.next.emit(step);
    };
    /**
     * @return {?}
     */
    ElPaginationPager.prototype.ngOnInit = function () {
        this.pagers = this.makePagers(this.current, this.count);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElPaginationPager.prototype.ngOnChanges = function (changes) {
        if (!changes)
            return;
        this.pagers = this.makePagers(this.current, this.count);
    };
    ElPaginationPager.decorators = [
        { type: Component, args: [{
                    selector: 'el-pagination-pager',
                    template: "\n    <ul class=\"el-pager\">\n      <li class=\"number\" [class.active]=\"current === 1\"\n        (click)=\"clickHandle(1)\"\n        *ngIf=\"count > 0\">1</li>\n      <li *ngIf=\"showPrevMore\"\n        [class]=\"'el-icon more btn-quickprev ' + quickprevIconClass\"\n        (click)=\"jumpHandle(-5)\"\n        (mouseenter)=\"quickprevIconClass = 'el-icon-d-arrow-left'\"\n        (mouseleave)=\"quickprevIconClass = 'el-icon-more'\"></li>\n      <li class=\"number\"\n        *ngFor=\"let pager of pagers\"\n        (click)=\"clickHandle(pager)\"\n        [class.active]=\"current === pager\">{{ pager }}</li>\n      <li [class]=\"'el-icon more btn-quicknext ' + quicknextIconClass\"\n        *ngIf=\"showNextMore\"\n        (click)=\"jumpHandle(5)\"\n        (mouseenter)=\"quicknextIconClass = 'el-icon-d-arrow-right'\"\n        (mouseleave)=\"quicknextIconClass = 'el-icon-more'\"></li>\n      <li class=\"number\"\n        [class.active]=\"current === count\"\n        (click)=\"clickHandle(count)\"\n        *ngIf=\"count > 1\">{{ count }}</li>\n    </ul>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElPaginationPager.ctorParameters = function () { return []; };
    ElPaginationPager.propDecorators = {
        'current': [{ type: Input },],
        'count': [{ type: Input },],
        'next': [{ type: Output },],
    };
    return ElPaginationPager;
}());
export { ElPaginationPager };
function ElPaginationPager_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPaginationPager.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElPaginationPager.ctorParameters;
    /** @type {?} */
    ElPaginationPager.propDecorators;
    /** @type {?} */
    ElPaginationPager.prototype.current;
    /** @type {?} */
    ElPaginationPager.prototype.count;
    /** @type {?} */
    ElPaginationPager.prototype.next;
    /** @type {?} */
    ElPaginationPager.prototype.pagers;
    /** @type {?} */
    ElPaginationPager.prototype.showPrevMore;
    /** @type {?} */
    ElPaginationPager.prototype.showNextMore;
    /** @type {?} */
    ElPaginationPager.prototype.quicknextIconClass;
    /** @type {?} */
    ElPaginationPager.prototype.quickprevIconClass;
}
//# sourceMappingURL=pager.js.map