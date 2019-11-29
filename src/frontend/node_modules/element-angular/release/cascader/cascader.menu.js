import { Component, Optional } from '@angular/core';
import { ElCascader } from './cascader';
import { dropAnimation } from '../shared/animation/index';
var ElCascaderMenu = /** @class */ (function () {
    /**
     * @param {?} root
     */
    function ElCascaderMenu(root) {
        this.root = root;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ElCascaderMenu.prototype.clickHandle = function (event) {
        event.stopPropagation();
    };
    ElCascaderMenu.decorators = [
        { type: Component, args: [{
                    selector: 'el-cascader-menu',
                    template: "\n    <div class=\"el-cascader-menus\"\n      style=\"z-index: 2007; position: absolute; top: 100%; left: 0;\"\n      [@dropAnimation]=\"root.menuVisible\"\n      (click)=\"clickHandle($event)\">\n      <ul class=\"el-cascader-menu\" *ngFor=\"let menuItem of root.steps; let step = index\">\n        <li *ngFor=\"let listItem of menuItem; let i = index\"\n          class=\"el-cascader-menu__item\"\n          [class.el-cascader-menu__item--extensible]=\"listItem.children\"\n          [class.is-active]=\"listItem.active\"\n          [class.is-disabled]=\"listItem.elDisabled\"\n          (click)=\"root.selectHandle($event, step, i)\">\n          {{listItem.label}}\n        </li>\n      </ul>\n    </div>\n  ",
                    animations: [dropAnimation],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCascaderMenu.ctorParameters = function () { return [
        { type: ElCascader, decorators: [{ type: Optional },] },
    ]; };
    return ElCascaderMenu;
}());
export { ElCascaderMenu };
function ElCascaderMenu_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCascaderMenu.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCascaderMenu.ctorParameters;
    /** @type {?} */
    ElCascaderMenu.prototype.root;
}
//# sourceMappingURL=cascader.menu.js.map