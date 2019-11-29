import { Component, Input, Optional, } from '@angular/core';
import { ElTree } from './tree';
import { dropAnimation } from '../shared/animation/index';
var ElTreeItem = /** @class */ (function () {
    /**
     * @param {?} root
     */
    function ElTreeItem(root) {
        this.root = root;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ElTreeItem.prototype.clickHandle = function (event) {
        event.stopPropagation();
        if (!this.root.expandOnClickNode)
            return this.itemEmitter('click');
        this.updateExpanded();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElTreeItem.prototype.iconClickHandle = function (event) {
        event.stopPropagation();
        this.updateExpanded();
    };
    /**
     * @return {?}
     */
    ElTreeItem.prototype.checkHandle = function () {
        if (this.root.elDisabled)
            return;
        this.root.updateChecked(this.model.id);
        this.root.emitter({
            label: this.model.label,
            treeNodeID: this.model.id,
            action: 'checkbox',
            checked: this.model.checked,
        });
    };
    /**
     * @return {?}
     */
    ElTreeItem.prototype.updateExpanded = function () {
        var /** @type {?} */ dontUpdateExpanded = this.isLeaf();
        var /** @type {?} */ nextAction = dontUpdateExpanded ? 'click' : (this.model.expanded ? 'close' : 'open');
        this.itemEmitter(nextAction);
        !dontUpdateExpanded && this.root.updateExpanded(this.model.id);
    };
    /**
     * @return {?}
     */
    ElTreeItem.prototype.isLeaf = function () {
        return !this.model.children || !this.model.children.length;
    };
    /**
     * @param {?} action
     * @return {?}
     */
    ElTreeItem.prototype.itemEmitter = function (action) {
        this.root.emitter({
            label: this.model.label,
            treeNodeID: this.model.id,
            action: action,
            checked: this.model.checked,
        });
    };
    ElTreeItem.decorators = [
        { type: Component, args: [{
                    selector: 'el-tree-item',
                    animations: [dropAnimation],
                    template: "\n    <div class=\"el-tree-node\" (click)=\"clickHandle($event)\"\n      [class.is-focusable]=\"!root.elDisabled\"\n      [class.is-checked]=\"!root.elDisabled && model.checked\"\n      role=\"treeitem\">\n      <div class=\"el-tree-node__content\"\n        [ngStyle]=\"{ 'padding-left': (model._level - 1) * indent + 'px' }\">\n        <span class=\"el-tree-node__expand-icon el-icon-caret-right\"\n          [class.expanded]=\"model.expanded\"\n          [class.is-leaf]=\"isLeaf()\"\n          (click)=\"iconClickHandle($event)\"></span>\n        <el-checkbox *ngIf=\"root.showCheckbox\" [model]=\"model.checked\" [indeterminate]=\"model._indeterminate\"\n          [elDisabled]=\"root.elDisabled\"\n          (modelChange)=\"checkHandle($event)\">\n        </el-checkbox>\n        <span class=\"el-tree-node__label\">{{ model.label }}</span>\n      </div>\n      <div class=\"el-tree-node__children\" *ngIf=\"!isLeaf()\" [@dropAnimation]=\"model.expanded\">\n        <el-tree-item *ngFor=\"let item of model.children\"\n          [model]=\"item\" [indent]=\"indent\">\n        </el-tree-item>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTreeItem.ctorParameters = function () { return [
        { type: ElTree, decorators: [{ type: Optional },] },
    ]; };
    ElTreeItem.propDecorators = {
        'indent': [{ type: Input },],
        'model': [{ type: Input },],
    };
    return ElTreeItem;
}());
export { ElTreeItem };
function ElTreeItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTreeItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTreeItem.ctorParameters;
    /** @type {?} */
    ElTreeItem.propDecorators;
    /** @type {?} */
    ElTreeItem.prototype.indent;
    /** @type {?} */
    ElTreeItem.prototype.model;
    /** @type {?} */
    ElTreeItem.prototype.root;
}
//# sourceMappingURL=tree-item.js.map