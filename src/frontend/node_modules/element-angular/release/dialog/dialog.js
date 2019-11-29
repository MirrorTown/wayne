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
import { Component, ContentChild, Input, Renderer2, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentWrapper, WindowWrapper } from '../shared/services/index';
import { ElDialogProps } from './dialog.props';
import { dialogFadeAnimation } from '../shared/animation/index';
var ElDialog = /** @class */ (function (_super) {
    __extends(ElDialog, _super);
    /**
     * @param {?} sanitizer
     * @param {?} renderer
     * @param {?} window
     * @param {?} document
     */
    function ElDialog(sanitizer, renderer, window, document) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.renderer = renderer;
        _this.window = window;
        _this.document = document;
        return _this;
    }
    /**
     * @return {?}
     */
    ElDialog.prototype.makeDialogStyles = function () {
        var /** @type {?} */ width = this.width ? "width: " + this.width + ";" : '';
        var /** @type {?} */ styles = "top: " + this.top + ";" + width;
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElDialog.prototype.closeHandler = function () {
        var _this = this;
        this.beforeClose(function () {
            _this.visible = false;
            _this.visibleChange.emit(_this.visible);
            _this.updateWithVisibleChange();
        });
    };
    /**
     * @return {?}
     */
    ElDialog.prototype.wrapperClickHandle = function () {
        // close dialog
        if (this.closeOnClickModal) {
            this.closeHandler();
        }
    };
    /**
     * @return {?}
     */
    ElDialog.prototype.updateWithVisibleChange = function () {
        // update modal
        if (this.cacheModalElement) {
            // this.cacheModalElement.innerHTML = this.makeModalTmp(this.visible)
            this.renderer.setStyle(this.cacheModalElement, 'display', this.visible ? 'block' : 'none');
        }
        // lock body scroll
        if (this.lockScroll) {
            var /** @type {?} */ nextValue = this.visible ? 'hidden' : this.cacheOverflow;
            this.renderer.setStyle(this.document.body, 'overflow', nextValue);
        }
    };
    /**
     * @return {?}
     */
    ElDialog.prototype.ngOnInit = function () {
        var _this = this;
        // save old overflow
        if (this.lockScroll) {
            this.cacheOverflow = this.window.getComputedStyle(this.document.body).overflow;
        }
        this.cacheModalElement = this.renderer.createElement('div');
        this.renderer.setAttribute(this.cacheModalElement, 'class', 'v-modal');
        this.renderer.setStyle(this.cacheModalElement, 'z-index', this.modalZindex);
        this.renderer.setStyle(this.cacheModalElement, 'display', this.visible ? 'block' : 'none');
        this.document.body.appendChild(this.cacheModalElement);
        // listen esc
        if (this.closeOnPressEscape) {
            this.globalListenFunc = this.renderer.listen('document', 'keydown', function (event) {
                _this.visible && event.keyCode === 27 && _this.closeHandler();
            });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElDialog.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.visible)
            return;
        this.visible = changes.visible.currentValue;
        this.updateWithVisibleChange();
    };
    /**
     * @return {?}
     */
    ElDialog.prototype.ngOnDestroy = function () {
        this.globalListenFunc && this.globalListenFunc();
        this.cacheModalElement.parentElement.removeChild(this.cacheModalElement);
        this.renderer.setStyle(this.document.body, 'overflow', this.cacheOverflow);
    };
    ElDialog.decorators = [
        { type: Component, args: [{
                    selector: 'el-dialog',
                    animations: [dialogFadeAnimation],
                    template: "\n    <div class=\"el-dialog__wrapper\" [@dialogFadeAnimation]=\"visible\"\n      [ngStyle]=\"{ 'z-index': dialogZindex }\"\n      (click)=\"wrapperClickHandle()\">\n      <div [class]=\"'el-dialog ' + customClass\"\n        [class.el-dialog--center]=\"center\"\n        [style]=\"makeDialogStyles()\"\n        (click)=\"$event.stopPropagation()\">\n        <div class=\"el-dialog__header\">\n          <ng-container *ngIf=\"titleTmp\">\n            <ng-template [ngTemplateOutlet]=\"titleTmp\"></ng-template>\n          </ng-container>\n          <span class=\"el-dialog__title\" *ngIf=\"!titleTmp\">{{title}}</span>\n          <button type=\"button\" class=\"el-dialog__headerbtn\"\n            aria-label=\"Close\"\n            *ngIf=\"showClose\"\n            (click)=\"closeHandler()\">\n            <i class=\"el-dialog__close el-icon el-icon-close\"></i>\n          </button>\n        </div>\n        <div class=\"el-dialog__body\">\n          <ng-content></ng-content>\n        </div>\n        <div class=\"el-dialog__footer\">\n          <ng-container *ngIf=\"footerTmp\">\n            <ng-template [ngTemplateOutlet]=\"footerTmp\"></ng-template>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDialog.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: Renderer2, },
        { type: WindowWrapper, },
        { type: DocumentWrapper, },
    ]; };
    ElDialog.propDecorators = {
        'titleTmp': [{ type: ContentChild, args: ['title',] },],
        'footerTmp': [{ type: ContentChild, args: ['footer',] },],
        'model': [{ type: Input },],
    };
    return ElDialog;
}(ElDialogProps));
export { ElDialog };
function ElDialog_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDialog.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDialog.ctorParameters;
    /** @type {?} */
    ElDialog.propDecorators;
    /** @type {?} */
    ElDialog.prototype.titleTmp;
    /** @type {?} */
    ElDialog.prototype.footerTmp;
    /** @type {?} */
    ElDialog.prototype.model;
    /** @type {?} */
    ElDialog.prototype.cacheOverflow;
    /** @type {?} */
    ElDialog.prototype.cacheModalElement;
    /** @type {?} */
    ElDialog.prototype.globalListenFunc;
    /** @type {?} */
    ElDialog.prototype.sanitizer;
    /** @type {?} */
    ElDialog.prototype.renderer;
    /** @type {?} */
    ElDialog.prototype.window;
    /** @type {?} */
    ElDialog.prototype.document;
}
//# sourceMappingURL=dialog.js.map