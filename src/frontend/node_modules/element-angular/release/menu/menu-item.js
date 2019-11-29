import { Component, Input, ElementRef, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElMenu } from './menu';
import { ElSubmenu } from './submenu';
import { isParentTag, removeNgTag } from '../shared/utils/index';
import { Router } from '@angular/router';
var ElMenuItem = /** @class */ (function () {
    /**
     * @param {?} rootMenu
     * @param {?} subMenu
     * @param {?} sanitizer
     * @param {?} el
     * @param {?} router
     */
    function ElMenuItem(rootMenu, subMenu, sanitizer, el, router) {
        this.rootMenu = rootMenu;
        this.subMenu = subMenu;
        this.sanitizer = sanitizer;
        this.el = el;
        this.router = router;
        this.elDisabled = false;
        this.title = '';
        this.extras = {};
        this.inSubmenu = false;
    }
    Object.defineProperty(ElMenuItem.prototype, "disabled", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            console.warn('Element Angular: (disabled) is discarded, use [elDisabled] replace it.');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ElMenuItem.prototype.clickHandle = function () {
        var /** @type {?} */ comRef = this.subMenu || this.rootMenu;
        comRef.selectHandle(this.index);
        var /** @type {?} */ nextBorderIndex = (this.inSubmenu && this.subMenu) ? this.subMenu.index : this.index;
        this.rootMenu.showBorderIndex = nextBorderIndex;
        this.to && this.router.navigateByUrl(this.to, this.extras);
    };
    /**
     * @return {?}
     */
    ElMenuItem.prototype.borderColor = function () {
        // not show border in group
        var /** @type {?} */ dontShowBorder = this.inSubmenu && this.subMenu;
        if (dontShowBorder)
            return 'transparent';
        return this.rootMenu.showBorderIndex === this.index ?
            (this.rootMenu.activeTextColor ? this.rootMenu.activeTextColor : '')
            : 'transparent';
    };
    /**
     * @return {?}
     */
    ElMenuItem.prototype.color = function () {
        return this.rootMenu.model === this.index ?
            (this.rootMenu.activeTextColor ? this.rootMenu.activeTextColor : '#409eff')
            : this.rootMenu.textColor ? this.rootMenu.textColor : '#909399';
    };
    /**
     * @return {?}
     */
    ElMenuItem.prototype.ngOnInit = function () {
        this.inSubmenu = isParentTag(this.el.nativeElement, 'el-submenu');
        removeNgTag(this.el.nativeElement);
    };
    ElMenuItem.decorators = [
        { type: Component, args: [{
                    selector: 'el-menu-item',
                    template: "\n    <li class=\"el-menu-item\" (click)=\"clickHandle()\" #list\n      [ngStyle]=\"{ paddingLeft: '20px',\n      backgroundColor: rootMenu.backgroundColor || '',\n      borderBottomColor: borderColor(),\n      color: color() }\"\n      (mouseenter)=\"list.style.backgroundColor = rootMenu.hoverBackgroundColor()\"\n      (mouseleave)=\"list.style.backgroundColor = rootMenu.backgroundColor || ''\"\n      [class.is-active]=\"rootMenu.model === index\"\n      [class.is-disabled]=\"elDisabled\">\n      <ng-content></ng-content>\n    </li>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMenuItem.ctorParameters = function () { return [
        { type: ElMenu, decorators: [{ type: Optional },] },
        { type: ElSubmenu, decorators: [{ type: Optional },] },
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: Router, },
    ]; };
    ElMenuItem.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'index': [{ type: Input },],
        'title': [{ type: Input },],
        'to': [{ type: Input },],
        'extras': [{ type: Input },],
    };
    return ElMenuItem;
}());
export { ElMenuItem };
function ElMenuItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMenuItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMenuItem.ctorParameters;
    /** @type {?} */
    ElMenuItem.propDecorators;
    /** @type {?} */
    ElMenuItem.prototype.elDisabled;
    /** @type {?} */
    ElMenuItem.prototype.index;
    /** @type {?} */
    ElMenuItem.prototype.title;
    /** @type {?} */
    ElMenuItem.prototype.to;
    /** @type {?} */
    ElMenuItem.prototype.extras;
    /** @type {?} */
    ElMenuItem.prototype.inSubmenu;
    /** @type {?} */
    ElMenuItem.prototype.rootMenu;
    /** @type {?} */
    ElMenuItem.prototype.subMenu;
    /** @type {?} */
    ElMenuItem.prototype.sanitizer;
    /** @type {?} */
    ElMenuItem.prototype.el;
    /** @type {?} */
    ElMenuItem.prototype.router;
}
//# sourceMappingURL=menu-item.js.map