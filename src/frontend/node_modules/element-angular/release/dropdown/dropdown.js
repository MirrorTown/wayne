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
import { Component, ElementRef, HostListener, Renderer2, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElDropdownProps } from './dropdown.props';
import { dropAnimation } from './animation';
import { DocumentWrapper } from '../shared/services/index';
var ElDropdown = /** @class */ (function (_super) {
    __extends(ElDropdown, _super);
    /**
     * @param {?} renderer
     * @param {?} sanitizer
     * @param {?} document
     * @param {?} el
     */
    function ElDropdown(renderer, sanitizer, document, el) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.sanitizer = sanitizer;
        _this.document = document;
        _this.el = el;
        _this.showMenu = false;
        _this.slideToBottom = true;
        _this.mouseleave = function () {
            if (_this.trigger !== 'hover')
                return;
            _this.timer = setTimeout(function () {
                _this.closeMenu();
                clearTimeout(_this.timer);
            }, 400);
        };
        _this.mouseenter = function () {
            if (_this.trigger !== 'hover')
                return;
            _this.timer && clearTimeout(_this.timer);
            !_this.showMenu && _this.visibleChange.emit();
            _this.showMenu = true;
        };
        return _this;
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    ElDropdown.prototype.openMenu = function (event) {
        var _this = this;
        event && event.stopPropagation();
        this.showMenu = !this.showMenu;
        this.visibleChange.emit();
        this.globalListenFunc = this.renderer.listen('document', 'click', function () {
            _this.closeMenu();
        });
    };
    /**
     * @return {?}
     */
    ElDropdown.prototype.closeMenu = function () {
        this.showMenu = false;
        this.visibleChange.emit();
        this.globalListenFunc && this.globalListenFunc();
    };
    /**
     * @param {?} model
     * @return {?}
     */
    ElDropdown.prototype.selectHandle = function (model) {
        this.selected.emit(model);
        // select and hide menu (props)
        this.hideOnClick && this.closeMenu();
    };
    /**
     * @return {?}
     */
    ElDropdown.prototype.makeListStyles = function () {
        var /** @type {?} */ styles = "top: " + (this.slideToBottom ? '100%' : (0 - this.listHeight) + 'px') + ";" +
            ((this.menuAlign === 'end' ? 'right' : 'left') + ": 0; position: absolute; min-width: 100px;") +
            ("white-space: " + (this.menuNoWrap ? 'nowrap' : 'normal'));
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElDropdown.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.listHeight = this.list.nativeElement.offsetHeight + 12;
        this.globalScrollFunc = this.renderer.listen('window', 'scroll', function () {
            var /** @type {?} */ top = _this.el.nativeElement.getBoundingClientRect().top;
            var /** @type {?} */ nextValue = _this.document.documentElement.clientHeight - top > _this.listHeight;
            if (nextValue !== _this.slideToBottom) {
                _this.slideToBottom = nextValue;
            }
        });
    };
    /**
     * @return {?}
     */
    ElDropdown.prototype.ngOnDestroy = function () {
        this.globalListenFunc && this.globalListenFunc();
        this.globalScrollFunc && this.globalScrollFunc();
    };
    ElDropdown.decorators = [
        { type: Component, args: [{
                    selector: 'el-dropdown',
                    template: "\n    <ng-template #content>\n      <ng-content></ng-content>\n    </ng-template>\n    <div class=\"el-dropdown\">\n      <ng-container *ngIf=\"splitButton\">\n        <el-button [type]=\"type\" [size]=\"size\" (click)=\"openMenu($event)\">\n          <span>\n            <ng-template [ngTemplateOutlet]=\"content\"></ng-template>\n            <i class=\"el-icon-caret-bottom el-icon--right\"></i>\n          </span>\n        </el-button>\n      </ng-container>\n      <ng-container *ngIf=\"!splitButton\">\n        <span class=\"el-dropdown-link\" (click)=\"openMenu($event)\" style=\"cursor: pointer;\">\n          <ng-template [ngTemplateOutlet]=\"content\"></ng-template>\n          <i class=\"el-icon-caret-bottom el-icon--right\"></i>\n        </span>\n      </ng-container>\n      <div [style]=\"makeListStyles()\">\n        <ul class=\"el-dropdown-menu\" #list [@dropAnimation]=\"showMenu\">\n          <el-dropdown-item *ngFor=\"let item of model\" [model]=\"item\" (selected)=\"selectHandle(item)\">\n          </el-dropdown-item>\n        </ul>\n      </div>\n    </div>\n  ",
                    animations: [dropAnimation],
                    styles: ['.el-dropdown-menu { overflow: hidden; }'],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDropdown.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: DomSanitizer, },
        { type: DocumentWrapper, },
        { type: ElementRef, },
    ]; };
    ElDropdown.propDecorators = {
        'list': [{ type: ViewChild, args: ['list',] },],
        'mouseleave': [{ type: HostListener, args: ['mouseleave',] },],
        'mouseenter': [{ type: HostListener, args: ['mouseenter',] },],
    };
    return ElDropdown;
}(ElDropdownProps));
export { ElDropdown };
function ElDropdown_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDropdown.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDropdown.ctorParameters;
    /** @type {?} */
    ElDropdown.propDecorators;
    /** @type {?} */
    ElDropdown.prototype.list;
    /** @type {?} */
    ElDropdown.prototype.showMenu;
    /** @type {?} */
    ElDropdown.prototype.timer;
    /** @type {?} */
    ElDropdown.prototype.slideToBottom;
    /** @type {?} */
    ElDropdown.prototype.listHeight;
    /** @type {?} */
    ElDropdown.prototype.globalListenFunc;
    /** @type {?} */
    ElDropdown.prototype.globalScrollFunc;
    /** @type {?} */
    ElDropdown.prototype.mouseleave;
    /** @type {?} */
    ElDropdown.prototype.mouseenter;
    /** @type {?} */
    ElDropdown.prototype.renderer;
    /** @type {?} */
    ElDropdown.prototype.sanitizer;
    /** @type {?} */
    ElDropdown.prototype.document;
    /** @type {?} */
    ElDropdown.prototype.el;
}
//# sourceMappingURL=dropdown.js.map