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
import { Component, Input } from '@angular/core';
import { ModelStandard } from './utils';
import { ElTreeProps } from './tree-props';
var ElTree = /** @class */ (function (_super) {
    __extends(ElTree, _super);
    function ElTree() {
        var _this = _super.call(this) || this;
        _this.userSafeHooks = function () { return ({
            findAllChecked: _this.findAllChecked.bind(_this),
            updateItemChecked: _this.updateChecked.bind(_this),
            updateItemExpanded: _this.updateExpanded.bind(_this),
            removeAllChecked: _this.removeAllChecked.bind(_this),
        }); };
        return _this;
    }
    Object.defineProperty(ElTree.prototype, "model", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ standardTool = new ModelStandard({
                initDepth: 0,
                defaultExpandAll: this.defaultExpandAll,
                defaultExpandedKeys: this.defaultExpandedKeys,
                defaultCheckedKeys: this.defaultCheckedKeys,
            });
            this.identModel = standardTool.filterModel(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ElTree.prototype.findAllChecked = function () {
        if (!this.showCheckbox)
            return [];
        return ModelStandard.FindAllChecked(this.identModel);
    };
    /**
     * @return {?}
     */
    ElTree.prototype.removeAllChecked = function () {
        ModelStandard.LoopRemoveChecked(this.identModel);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ElTree.prototype.updateExpanded = function (id) {
        this.identModel = ModelStandard.DeepUpdateExpanded(id, this.identModel, this.accordion);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ElTree.prototype.updateChecked = function (id) {
        if (!this.showCheckbox)
            return;
        this.identModel = ModelStandard.DeepUpdateChecked(id, this.identModel);
    };
    /**
     * @param {?} next
     * @return {?}
     */
    ElTree.prototype.emitter = function (next) {
        this.modelChange.emit(next);
    };
    ElTree.decorators = [
        { type: Component, args: [{
                    selector: 'el-tree',
                    template: "\n    <div class=\"el-tree\" role=\"tree\">\n      <el-tree-item *ngFor=\"let item of identModel\"\n        [model]=\"item\" [indent]=\"indent\">\n      </el-tree-item>\n      <div class=\"el-tree__empty-block\" *ngIf=\"!identModel && !identModel.length\">\n        <span class=\"el-tree__empty-text\">{{ emptyText }}</span>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTree.ctorParameters = function () { return []; };
    ElTree.propDecorators = {
        'model': [{ type: Input },],
    };
    return ElTree;
}(ElTreeProps));
export { ElTree };
function ElTree_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTree.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTree.ctorParameters;
    /** @type {?} */
    ElTree.propDecorators;
    /** @type {?} */
    ElTree.prototype.userSafeHooks;
}
//# sourceMappingURL=tree.js.map