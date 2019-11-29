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
import { Component } from '@angular/core';
import { ElPaginationProps } from './pagination.props';
var ElPagination = /** @class */ (function (_super) {
    __extends(ElPagination, _super);
    function ElPagination() {
        var _this = _super.call(this) || this;
        _this.showPager = true;
        _this.showPrev = true;
        _this.showNext = true;
        _this.showTotal = true;
        _this.showSize = true;
        _this.showJumper = true;
        return _this;
    }
    /**
     * @param {?} ElName
     * @param {?} layout
     * @return {?}
     */
    ElPagination.showLayout = function (ElName, layout) {
        var /** @type {?} */ member = layout.find(function (name) { return name === ElName; });
        return !!member;
    };
    /**
     * @param {?} step
     * @return {?}
     */
    ElPagination.prototype.nextHandle = function (step) {
        var /** @type {?} */ nextPage = this.model + step;
        this.model = nextPage < 1 ? 1 : nextPage > this.total ? this.total : nextPage;
        this.modelChange.emit(this.model);
    };
    /**
     * @param {?} nextPageSize
     * @return {?}
     */
    ElPagination.prototype.updatePageSize = function (nextPageSize) {
        this.pageCount = Math.ceil(this.total / nextPageSize);
        this.model = 1;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElPagination.prototype.ngOnChanges = function (changes) {
        if (!changes)
            return;
        if (changes.total && changes.total.isFirstChange())
            return;
        this.updateLayout();
    };
    /**
     * @return {?}
     */
    ElPagination.prototype.ngOnInit = function () {
        if (!this.pageCount && this.total === undefined) {
            return console.warn('el-pagination required [total]');
        }
        this.updateLayout();
    };
    /**
     * @return {?}
     */
    ElPagination.prototype.updateLayout = function () {
        if (this.total === undefined || this.total === null) {
            this.total = Math.round(this.pageCount * this.pageSize);
        }
        this.pageCount = Math.ceil(this.total / this.pageSize) || 1;
        this.showPager = ElPagination.showLayout('pager', this.layout);
        this.showPrev = ElPagination.showLayout('prev', this.layout);
        this.showNext = ElPagination.showLayout('next', this.layout);
        this.showTotal = ElPagination.showLayout('total', this.layout);
        this.showSize = ElPagination.showLayout('size', this.layout);
        this.showJumper = ElPagination.showLayout('jumper', this.layout);
    };
    ElPagination.decorators = [
        { type: Component, args: [{
                    selector: 'el-pagination',
                    template: "\n    <div class=\"el-pagination\"\n      [class.el-pagination--small]=\"small\"\n      style=\"display: inline-table;\">\n      <span class=\"el-pagination__total\" *ngIf=\"showTotal\">\u5171 {{total}} \u6761</span>\n      <el-pagination-size *ngIf=\"showSize\"\n        [model]=\"pageSize\" [sizes]=\"pageSizes\"\n        (modelChange)=\"updatePageSize($event)\">\n      </el-pagination-size>\n      \n      <el-pagination-btn dir=\"left\" (next)=\"nextHandle($event)\"\n        *ngIf=\"showPrev\"\n        [disabled]=\"model <= 1\">\n      </el-pagination-btn>\n      <el-pagination-pager [current]=\"model\" [count]=\"pageCount\"\n        *ngIf=\"showPager\"\n        (next)=\"nextHandle($event)\">\n      </el-pagination-pager>\n      <el-pagination-btn dir=\"right\" (next)=\"nextHandle($event)\"\n        *ngIf=\"showNext\"\n        [disabled]=\"model === pageCount\">\n      </el-pagination-btn>\n\n      <el-pagination-jump *ngIf=\"showJumper\"\n        [model]=\"model\" [max]=\"pageCount\"\n        (next)=\"nextHandle($event)\">\n      </el-pagination-jump>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElPagination.ctorParameters = function () { return []; };
    return ElPagination;
}(ElPaginationProps));
export { ElPagination };
function ElPagination_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPagination.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElPagination.ctorParameters;
    /** @type {?} */
    ElPagination.prototype.showPager;
    /** @type {?} */
    ElPagination.prototype.showPrev;
    /** @type {?} */
    ElPagination.prototype.showNext;
    /** @type {?} */
    ElPagination.prototype.showTotal;
    /** @type {?} */
    ElPagination.prototype.showSize;
    /** @type {?} */
    ElPagination.prototype.showJumper;
}
//# sourceMappingURL=pagination.js.map