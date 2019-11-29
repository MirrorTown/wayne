import { Component, ContentChild, Host, Input } from '@angular/core';
import { dropAnimation } from '../shared/animation/index';
import { ElMenu } from './menu';
var ElSubmenu = /** @class */ (function () {
    /**
     * @param {?} rootMenu
     */
    function ElSubmenu(rootMenu) {
        this.rootMenu = rootMenu;
        this.opened = false;
        this.active = false;
        this.subActive = false;
        this.dontUserHover = false;
    }
    /**
     * @return {?}
     */
    ElSubmenu.prototype.mouseenterHandle = function () {
        var _this = this;
        this.active = true;
        if (this.dontUserHover)
            return;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.rootMenu.openMenu(_this.index);
            _this.updateOpened();
            clearTimeout(_this.timer);
        }, 300);
    };
    /**
     * @return {?}
     */
    ElSubmenu.prototype.mouseleaveHandle = function () {
        var _this = this;
        this.active = false;
        if (this.dontUserHover)
            return;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.rootMenu.closeMenu(_this.index);
            _this.updateOpened();
            clearTimeout(_this.timer);
        }, 300);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    ElSubmenu.prototype.selectHandle = function (path) {
        this.rootMenu.selectHandle(this.index, path);
        // selected and close list
        if (this.rootMenu.mode !== 'vertical') {
            this.rootMenu.closeMenu(this.index);
        }
        this.updateOpened();
    };
    /**
     * @return {?}
     */
    ElSubmenu.prototype.updateOpened = function () {
        this.opened = this.rootMenu.openedMenus.indexOf(this.index) > -1;
    };
    /**
     * @return {?}
     */
    ElSubmenu.prototype.clickHandle = function () {
        if (!this.dontUserHover)
            return;
        if (this.opened) {
            this.rootMenu.closeMenu(this.index);
        }
        else {
            this.rootMenu.openMenu(this.index);
        }
        this.updateOpened();
    };
    /**
     * @return {?}
     */
    ElSubmenu.prototype.borderColor = function () {
        return this.rootMenu.showBorderIndex === this.index ?
            (this.rootMenu.activeTextColor ? this.rootMenu.activeTextColor : '#409eff')
            : 'transparent';
    };
    /**
     * @return {?}
     */
    ElSubmenu.prototype.ngOnInit = function () {
        this.updateOpened();
        this.active = this.index === this.rootMenu.model;
        this.dontUserHover = this.rootMenu.mode === 'vertical' || this.rootMenu.menuTrigger !== 'hover';
    };
    ElSubmenu.decorators = [
        { type: Component, args: [{
                    selector: 'el-submenu',
                    animations: [dropAnimation],
                    template: "\n    <li [class.el-submenu]=\"true\"\n      [class.is-active]=\"active\"\n      [class.is-opened]=\"opened\"\n      (mouseenter)=\"mouseenterHandle()\"\n      (mouseleave)=\"mouseleaveHandle()\">\n      <div class=\"el-submenu__title\" (click)=\"clickHandle()\"\n        [ngStyle]=\"{ paddingLeft: '20px;', color: rootMenu.textColor || '', borderBottomColor: borderColor() }\"\n        #subTitle\n        (mouseenter)=\"subTitle.style.backgroundColor = rootMenu.hoverBackgroundColor()\"\n        (mouseleave)=\"subTitle.style.backgroundColor = ''\">\n        <ng-container *ngIf=\"!titleTmp\">\n          {{title}}\n        </ng-container>\n        <ng-container *ngIf=\"titleTmp\">\n          <ng-template [ngTemplateOutlet]=\"titleTmp\"></ng-template>\n        </ng-container>\n        <i class=\"el-submenu__icon-arrow\"\n          [class.el-icon-caret-bottom]=\"rootMenu.mode === 'horizontal'\"\n          [class.el-icon-arrow-down]=\"rootMenu.mode === 'vertical'\"></i>\n      </div>\n      <ul class=\"el-menu\" [@dropAnimation]=\"opened\"\n        [ngStyle]=\"{ backgroundColor: rootMenu.backgroundColor || '' }\">\n        <ng-content></ng-content>\n      </ul>\n    </li>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSubmenu.ctorParameters = function () { return [
        { type: ElMenu, decorators: [{ type: Host },] },
    ]; };
    ElSubmenu.propDecorators = {
        'titleTmp': [{ type: ContentChild, args: ['title',] },],
        'index': [{ type: Input },],
        'title': [{ type: Input },],
    };
    return ElSubmenu;
}());
export { ElSubmenu };
function ElSubmenu_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSubmenu.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSubmenu.ctorParameters;
    /** @type {?} */
    ElSubmenu.propDecorators;
    /** @type {?} */
    ElSubmenu.prototype.titleTmp;
    /** @type {?} */
    ElSubmenu.prototype.index;
    /** @type {?} */
    ElSubmenu.prototype.title;
    /** @type {?} */
    ElSubmenu.prototype.timer;
    /** @type {?} */
    ElSubmenu.prototype.opened;
    /** @type {?} */
    ElSubmenu.prototype.active;
    /** @type {?} */
    ElSubmenu.prototype.subActive;
    /** @type {?} */
    ElSubmenu.prototype.dontUserHover;
    /** @type {?} */
    ElSubmenu.prototype.rootMenu;
}
//# sourceMappingURL=submenu.js.map