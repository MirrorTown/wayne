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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, ElementRef, KeyValueDiffers, Renderer2, ViewChild, } from '@angular/core';
import { DocumentWrapper, WindowWrapper } from '../shared/services/index';
import { ElTableProps } from './table.props';
import { ElTableFormat } from './utils/format';
var ElTable = /** @class */ (function (_super) {
    __extends(ElTable, _super);
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} document
     * @param {?} window
     * @param {?} differs
     */
    function ElTable(el, renderer, document, window, differs) {
        var _this = _super.call(this) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.document = document;
        _this.window = window;
        _this.differs = differs;
        _this.columnsWithLevel = [];
        _this.layout = {
            headerHeight: 40,
            bodyHeight: 'auto',
            bodyWidth: 'auto',
            scrollBarWidth: 0,
        };
        _this.columnsWidth = [];
        _this.columns = [];
        _this.widthCount = 0;
        _this.differ = _this.differs.find([]).create();
        return _this;
    }
    /**
     * @return {?}
     */
    ElTable.GEN_TEMPLATE_KEY = function () {
        return Math.random().toString(16).substr(2, 8);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElTable.prototype.bodyScroll = function (event) {
        if (!this.scrollX)
            return;
        var /** @type {?} */ el = ((event.target));
        if (el.scrollLeft === undefined)
            return;
        this.headerRef.nativeElement.scrollLeft = el.scrollLeft;
    };
    /**
     * @param {?} column
     * @return {?}
     */
    ElTable.prototype.updateColumns = function (column) {
        var /** @type {?} */ next = Object.assign(column, { index: this.columns.length });
        this.columns.push(next);
    };
    /**
     * @return {?}
     */
    ElTable.prototype.updateBodyHeight = function () {
        var _this = this;
        var /** @type {?} */ height = ElTableFormat.getCSSValue(this.height);
        var /** @type {?} */ header = this.headerRef.nativeElement;
        if (!header || !height)
            return;
        var /** @type {?} */ timer = setTimeout(function () {
            var /** @type {?} */ headerHeight = header.offsetHeight;
            if (headerHeight) {
                _this.layout.headerHeight = headerHeight;
                _this.layout.bodyHeight = height - _this.layout.headerHeight;
                _this.layout.scrollBarWidth = _this.window.innerWidth - _this.document.body.clientWidth;
            }
            clearTimeout(timer);
        }, 0);
    };
    /**
     * @return {?}
     */
    ElTable.prototype.updateLayout = function () {
        var /** @type {?} */ elTable = this.el.nativeElement.children[0];
        this.layout.bodyWidth = this.widthCount || elTable.clientWidth;
        if (this.widthCount) {
            this.renderer.setStyle(elTable, 'width', this.widthCount + "px");
        }
    };
    /**
     * @param {?} widthItem
     * @return {?}
     */
    ElTable.prototype.updateColumnsWidth = function (widthItem) {
        this.columnsWidth.push(widthItem);
    };
    /**
     * @param {?} columnsWidth
     * @return {?}
     */
    ElTable.prototype.computeColumnsWidth = function (columnsWidth) {
        var /** @type {?} */ auto = 0, /** @type {?} */ count = 0;
        columnsWidth.forEach(function (item) {
            if (item.auto)
                return auto++;
            if (Number.isNaN(item.width)) {
                item.auto = true;
                return auto++;
            }
            count += item.width;
        });
        // if user has set the width, use fixed width
        // update layout
        if (!auto) {
            this.widthCount = count;
            this.updateLayout();
        }
        var /** @type {?} */ average = (this.layout.bodyWidth - count) / auto;
        return columnsWidth.map(function (item) {
            return item.auto ? Object.assign(item, { width: average }) : item;
        });
    };
    /**
     * @return {?}
     */
    ElTable.prototype.transformColumnsData = function () {
        var _this = this;
        // order by deep
        this.columns = this.columns.map(function (column) {
            if (!Array.isArray(_this.columnsWithLevel[column.level])) {
                _this.columnsWithLevel[column.level] = [];
            }
            _this.columnsWithLevel[column.level].push(column);
            if (column.deep === 0)
                return column;
            return null;
        }).filter(function (r) { return r; });
        this.columnsWithLevel.reverse();
        this.columnsWidth = this.computeColumnsWidth(this.columnsWidth);
        // distribution template
        this.columns = this.columns.map(function (column) {
            if (!column.slot)
                return column;
            var /** @type {?} */ TEMPLATE_KEY = ElTable.GEN_TEMPLATE_KEY();
            _this.modelStorge = _this.model.map(function (v) {
                return Object.assign(v, (_a = {}, _a[TEMPLATE_KEY] = column.slot, _a));
                var _a;
            });
            return Object.assign(column, { modelKey: TEMPLATE_KEY });
        });
        this.orderMap = this.columns.reduce(function (pre, next) {
            return Object.assign(pre, (_a = {}, _a[next.modelKey] = next, _a));
            var _a;
        }, {});
        this.transformModelData();
    };
    /**
     * @return {?}
     */
    ElTable.prototype.transformModelData = function () {
        var /** @type {?} */ orderMap = this.orderMap;
        // add index, width, value
        if (!this.modelStorge) {
            this.modelStorge = this.model;
        }
        var /** @type {?} */ modelWithIndex = this.modelStorge.map(function (row) {
            return Object.keys(__assign({}, row, orderMap)).map(function (v) {
                var /** @type {?} */ item = orderMap[v] || {};
                return _a = {
                        hidden: !item.width,
                        value: row[v]
                    },
                    _a[v] = row[v],
                    _a.index = ~~item.index,
                    _a.width = item.width,
                    _a._renderHTML = item._renderHTML,
                    _a;
                var _a;
            })
                .filter(function (r) { return !!r; });
        });
        // column sort
        this.columnsData = modelWithIndex.map(function (row) {
            return row.sort(function (pre, next) { return pre.index - next.index; });
        });
        this.updateBodyHeight();
    };
    /**
     * @return {?}
     */
    ElTable.prototype.ngOnInit = function () {
        var _this = this;
        this.updateLayout();
        this.updateBodyHeight();
        this.globalListenFunc = this.renderer.listen('window', 'resize', function () {
            _this.updateLayout();
            _this.columnsWidth = _this.computeColumnsWidth(_this.columnsWidth);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElTable.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        if (changes.model.isFirstChange())
            return;
        this.model = changes.model.currentValue;
        this.transformModelData();
    };
    /**
     * @return {?}
     */
    ElTable.prototype.ngDoCheck = function () {
        var _this = this;
        var /** @type {?} */ change = this.differ.diff(this.model);
        if (!change || !this.orderMap)
            return;
        // distribution template
        this.modelStorge = this.model;
        var /** @type {?} */ nextColumns = this.columns.map(function (column) {
            if (!column.slot)
                return column;
            var /** @type {?} */ TEMPLATE_KEY = ElTable.GEN_TEMPLATE_KEY();
            _this.modelStorge = _this.model.map(function (v) {
                return Object.assign(v, (_a = {}, _a[TEMPLATE_KEY] = column.slot, _a));
                var _a;
            });
            return Object.assign(column, { modelKey: TEMPLATE_KEY });
        });
        this.orderMap = nextColumns.reduce(function (pre, next) {
            return Object.assign(pre, (_a = {}, _a[next.modelKey] = next, _a));
            var _a;
        }, {});
        this.transformModelData();
    };
    /**
     * @return {?}
     */
    ElTable.prototype.ngOnDestroy = function () {
        this.globalListenFunc && this.globalListenFunc();
    };
    ElTable.decorators = [
        { type: Component, args: [{
                    selector: 'el-table',
                    styles: ["\n  .el-table__header-scroll::-webkit-scrollbar { visibility: hidden; }\n  "],
                    template: "\n    <div class=\"el-table\"\n      [ngStyle]=\"{ height: height | cssValue }\"\n      [class.el-table--enable-row-transition]=\"true\"\n      [class.el-table--striped]=\"stripe\"\n      [class.el-table--border]=\"border\"\n      [class.el-table--hidden]=\"false\">\n      <div class=\"hidden-columns\"><ng-content></ng-content></div>\n      <div class=\"el-table__header-wrapper el-table__header-scroll\" [hidden]=\"!showHeader\"\n        [ngStyle]=\"{'overflow-x': (scrollX ? 'auto' : 'hidden')}\" #headerRef>\n        <el-table-header [model]=\"columnsWithLevel\" [layout]=\"layout\" [columns-width]=\"columnsWidth\"\n          [border]=\"border\" [height]=\"height\" [center]=\"center === 'header' || center === 'all'\">\n        </el-table-header>\n      </div>\n      <div class=\"el-table__body-wrapper\" [ngStyle]=\"{ height: layout.bodyHeight | cssValue }\"\n        (scroll)=\"bodyScroll($event)\">\n        <el-table-body [model]=\"columnsData\" [stripe]=\"stripe\"\n          [layout]=\"layout\" [row-class-name]=\"rowClassName\"\n          [center]=\"center === 'all'\"\n          [ngStyle]=\"{ width: layout.bodyWidth + 'px' }\">\n        </el-table-body>\n        <div [ngStyle]=\"{width: layout.bodyWidth + 'px'}\" class=\"el-table__empty-block\" *ngIf=\"!model || model.length === 0\">\n          <span class=\"el-table__empty-text\">{{placeholder}}</span>\n        </div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTable.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: DocumentWrapper, },
        { type: WindowWrapper, },
        { type: KeyValueDiffers, },
    ]; };
    ElTable.propDecorators = {
        'headerRef': [{ type: ViewChild, args: ['headerRef',] },],
    };
    return ElTable;
}(ElTableProps));
export { ElTable };
function ElTable_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTable.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTable.ctorParameters;
    /** @type {?} */
    ElTable.propDecorators;
    /** @type {?} */
    ElTable.prototype.headerRef;
    /** @type {?} */
    ElTable.prototype.columnsData;
    /** @type {?} */
    ElTable.prototype.columnsWithLevel;
    /** @type {?} */
    ElTable.prototype.layout;
    /** @type {?} */
    ElTable.prototype.columnsWidth;
    /** @type {?} */
    ElTable.prototype.columns;
    /** @type {?} */
    ElTable.prototype.globalListenFunc;
    /** @type {?} */
    ElTable.prototype.orderMap;
    /** @type {?} */
    ElTable.prototype.modelStorge;
    /** @type {?} */
    ElTable.prototype.differ;
    /** @type {?} */
    ElTable.prototype.widthCount;
    /** @type {?} */
    ElTable.prototype.el;
    /** @type {?} */
    ElTable.prototype.renderer;
    /** @type {?} */
    ElTable.prototype.document;
    /** @type {?} */
    ElTable.prototype.window;
    /** @type {?} */
    ElTable.prototype.differs;
}
//# sourceMappingURL=table.js.map