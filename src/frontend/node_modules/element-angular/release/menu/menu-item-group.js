import { Component, ContentChild, Host, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElMenu } from './menu';
var ElMenuItemGroup = /** @class */ (function () {
    /**
     * @param {?} rootMenu
     * @param {?} sanitizer
     */
    function ElMenuItemGroup(rootMenu, sanitizer) {
        this.rootMenu = rootMenu;
        this.sanitizer = sanitizer;
        this.title = '';
    }
    /**
     * @return {?}
     */
    ElMenuItemGroup.prototype.paddingStyle = function () {
        return this.sanitizer.bypassSecurityTrustStyle('padding-left: 20px');
    };
    /**
     * @return {?}
     */
    ElMenuItemGroup.prototype.ngOnInit = function () {
        if (!this.title) {
            console.warn('el-menu-item-group required props: [title: string]');
        }
    };
    ElMenuItemGroup.decorators = [
        { type: Component, args: [{
                    selector: 'el-menu-item-group',
                    template: "\n    <li class=\"el-menu-item-group\">\n      <div class=\"el-menu-item-group__title\" [style]=\"paddingStyle()\" #groupTitle\n        (mouseenter)=\"groupTitle.style.backgroundColor = rootMenu.hoverBackgroundColor() \"\n        (mouseleave)=\"groupTitle.style.backgroundColor = ''\">\n        <ng-container *ngIf=\"!titleTmp\">\n          {{title}}\n        </ng-container>\n        <ng-container *ngIf=\"titleTmp\">\n          <ng-template [ngTemplateOutlet]=\"titleTmp\"></ng-template>\n        </ng-container>\n      </div>\n      <ul><ng-content></ng-content></ul>\n    </li>\n  "
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMenuItemGroup.ctorParameters = function () { return [
        { type: ElMenu, decorators: [{ type: Host },] },
        { type: DomSanitizer, },
    ]; };
    ElMenuItemGroup.propDecorators = {
        'titleTmp': [{ type: ContentChild, args: ['title',] },],
        'title': [{ type: Input },],
    };
    return ElMenuItemGroup;
}());
export { ElMenuItemGroup };
function ElMenuItemGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMenuItemGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMenuItemGroup.ctorParameters;
    /** @type {?} */
    ElMenuItemGroup.propDecorators;
    /** @type {?} */
    ElMenuItemGroup.prototype.titleTmp;
    /** @type {?} */
    ElMenuItemGroup.prototype.title;
    /** @type {?} */
    ElMenuItemGroup.prototype.rootMenu;
    /** @type {?} */
    ElMenuItemGroup.prototype.sanitizer;
}
//# sourceMappingURL=menu-item-group.js.map