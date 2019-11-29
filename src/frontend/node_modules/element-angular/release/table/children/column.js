import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { ElTable } from '../table';
var ElTableColumn = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} el
     */
    function ElTableColumn(root, el) {
        this.root = root;
        this.el = el;
        this.renderHTML = false;
        this.width = 'auto';
        this.maxDeep = 10;
    }
    /**
     * @param {?} self
     * @return {?}
     */
    ElTableColumn.prototype.findChild = function (self) {
        var /** @type {?} */ children = self.children;
        if (!children || !children.length)
            return 0;
        return Array.from(children)
            .map(function (child) {
            return child.tagName.toUpperCase() === 'EL-TABLE-COLUMN';
        })
            .filter(function (r) { return r; })
            .length;
    };
    /**
     * @param {?} self
     * @return {?}
     */
    ElTableColumn.prototype.findLevel = function (self) {
        var _this = this;
        var /** @type {?} */ brothers = self.parentElement.children;
        var /** @type {?} */ brothersDeeps = Array.from(brothers).map(function (el) { return _this.findDeep(el); });
        var /** @type {?} */ maxDeep = brothersDeeps.sort(function (pre, next) { return next - pre; })[0];
        return maxDeep;
    };
    /**
     * @param {?} self
     * @return {?}
     */
    ElTableColumn.prototype.findDeep = function (self) {
        var /** @type {?} */ deep = 0;
        Array.from(new Array(this.maxDeep)).every(function () {
            var /** @type {?} */ children = self.children;
            if (!children || !children.length)
                return false;
            if (children[0].tagName.toUpperCase() !== 'EL-TABLE-COLUMN') {
                return false;
            }
            self = children[0];
            deep++;
        });
        return deep;
    };
    /**
     * @param {?} deep
     * @param {?} self
     * @return {?}
     */
    ElTableColumn.prototype.isLastElement = function (deep, self) {
        if (deep !== 0)
            return false;
        var /** @type {?} */ isLast = true;
        Array.from(new Array(this.maxDeep)).every(function () {
            var /** @type {?} */ parent = self.parentElement;
            if (!parent)
                return false;
            if (self !== parent.children[parent.children.length - 1]) {
                isLast = false;
                return false;
            }
            if (parent.tagName.toUpperCase() !== 'EL-TABLE-COLUMN') {
                return false;
            }
            self = parent;
            return true;
        });
        return isLast;
    };
    /**
     * @return {?}
     */
    ElTableColumn.prototype.ngOnInit = function () {
        var /** @type {?} */ self = this.el.nativeElement;
        var /** @type {?} */ brothers = self.parentElement.children;
        var /** @type {?} */ deep = this.findDeep(self);
        var /** @type {?} */ level = deep === 0 && brothers.length > 1 ? this.findLevel(self) : deep;
        var /** @type {?} */ childCount = this.findChild(self);
        var /** @type {?} */ tableColumn = {
            modelKey: this.modelKey,
            label: this.label ? this.label : this.modelKey,
            width: this.width,
            slot: this.slot,
            _renderHTML: this.renderHTML,
            deep: deep, level: level, childCount: childCount,
        };
        this.root.updateColumns(tableColumn);
        if (deep === 0) {
            this.root.updateColumnsWidth({ auto: false, width: +this.width });
        }
        // last element
        if (this.isLastElement(deep, self)) {
            this.root.transformColumnsData();
        }
    };
    ElTableColumn.decorators = [
        { type: Component, args: [{
                    selector: 'el-table-column',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTableColumn.ctorParameters = function () { return [
        { type: ElTable, },
        { type: ElementRef, },
    ]; };
    ElTableColumn.propDecorators = {
        'slot': [{ type: ContentChild, args: ['slot',] },],
        'modelKey': [{ type: Input, args: ['model-key',] },],
        'renderHTML': [{ type: Input, args: ['render-html',] },],
        'label': [{ type: Input },],
        'width': [{ type: Input },],
    };
    return ElTableColumn;
}());
export { ElTableColumn };
function ElTableColumn_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTableColumn.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTableColumn.ctorParameters;
    /** @type {?} */
    ElTableColumn.propDecorators;
    /** @type {?} */
    ElTableColumn.prototype.slot;
    /** @type {?} */
    ElTableColumn.prototype.modelKey;
    /** @type {?} */
    ElTableColumn.prototype.renderHTML;
    /** @type {?} */
    ElTableColumn.prototype.label;
    /** @type {?} */
    ElTableColumn.prototype.width;
    /** @type {?} */
    ElTableColumn.prototype.maxDeep;
    /** @type {?} */
    ElTableColumn.prototype.root;
    /** @type {?} */
    ElTableColumn.prototype.el;
}
//# sourceMappingURL=column.js.map