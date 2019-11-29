import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
var ElMenu = /** @class */ (function () {
    function ElMenu() {
        this.mode = 'vertical';
        this.theme = 'light';
        this.uniqueOpened = false;
        this.menuTrigger = 'hover';
        this.modelChange = new EventEmitter();
        this.openedMenus = this.defaultOpeneds ? this.defaultOpeneds.slice(0) : [];
    }
    /**
     * @param {?} index
     * @return {?}
     */
    ElMenu.prototype.openMenu = function (index) {
        var /** @type {?} */ openedMenus = this.openedMenus;
        if (openedMenus.indexOf(index) !== -1)
            return;
        this.openedMenus.push(index);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ElMenu.prototype.closeMenu = function (index) {
        this.openedMenus.splice(this.openedMenus.indexOf(index), 1);
    };
    /**
     * @param {?} index
     * @param {?=} path
     * @return {?}
     */
    ElMenu.prototype.selectHandle = function (index, path) {
        var /** @type {?} */ main = path || index;
        this.model = main;
        this.modelChange.emit(main);
    };
    /**
     * @return {?}
     */
    ElMenu.prototype.hoverBackgroundColor = function () {
        return this.backgroundColor ? this.hexToRGB() : '';
    };
    /**
     * @return {?}
     */
    ElMenu.prototype.hexToRGB = function () {
        var /** @type {?} */ hex = +this.backgroundColor.replace('#', '0x');
        var /** @type {?} */ rgb = [(hex & 0xff0000) >> 16, (hex & 0x00ff00) >> 8, hex & 0x0000ff];
        return "rgb(" + rgb.map(function (v) { return ~~(0.8 * v); }).join(',') + ")";
    };
    ElMenu.decorators = [
        { type: Component, args: [{
                    selector: 'el-menu',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ul [class]=\"'el-menu ' + nativeClass\"\n      [class.el-menu--horizontal]=\"mode === 'horizontal'\"\n      [ngStyle]=\"{ backgroundColor: backgroundColor || '' }\">\n      <ng-content></ng-content>\n    </ul>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMenu.ctorParameters = function () { return []; };
    ElMenu.propDecorators = {
        'mode': [{ type: Input },],
        'theme': [{ type: Input },],
        'model': [{ type: Input },],
        'nativeClass': [{ type: Input, args: ['class',] },],
        'defaultOpeneds': [{ type: Input, args: ['default-openeds',] },],
        'uniqueOpened': [{ type: Input, args: ['unique-opened',] },],
        'menuTrigger': [{ type: Input, args: ['menu-trigger',] },],
        'backgroundColor': [{ type: Input, args: ['background-color',] },],
        'textColor': [{ type: Input, args: ['text-color',] },],
        'activeTextColor': [{ type: Input, args: ['active-text-color',] },],
        'modelChange': [{ type: Output },],
    };
    return ElMenu;
}());
export { ElMenu };
function ElMenu_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMenu.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMenu.ctorParameters;
    /** @type {?} */
    ElMenu.propDecorators;
    /** @type {?} */
    ElMenu.prototype.mode;
    /** @type {?} */
    ElMenu.prototype.theme;
    /** @type {?} */
    ElMenu.prototype.model;
    /** @type {?} */
    ElMenu.prototype.nativeClass;
    /** @type {?} */
    ElMenu.prototype.defaultOpeneds;
    /** @type {?} */
    ElMenu.prototype.uniqueOpened;
    /** @type {?} */
    ElMenu.prototype.menuTrigger;
    /** @type {?} */
    ElMenu.prototype.backgroundColor;
    /** @type {?} */
    ElMenu.prototype.textColor;
    /** @type {?} */
    ElMenu.prototype.activeTextColor;
    /** @type {?} */
    ElMenu.prototype.modelChange;
    /** @type {?} */
    ElMenu.prototype.openedMenus;
    /** @type {?} */
    ElMenu.prototype.showBorderIndex;
}
//# sourceMappingURL=menu.js.map