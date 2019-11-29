import { Component, Input, Optional, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { removeNgTag } from '../shared/utils/index';
import { ElSteps } from './steps';
var ElStep = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} el
     * @param {?} sanitizer
     */
    function ElStep(root, el, sanitizer) {
        this.root = root;
        this.el = el;
        this.sanitizer = sanitizer;
        this.index = 1;
        this.mainOffset = '0px';
    }
    /**
     * @return {?}
     */
    ElStep.prototype.currentStatus = function () {
        if (this.root.active > this.index) {
            return this.root.finishStatus;
        }
        if (this.root.active === this.index) {
            return this.root.processStatus;
        }
        return 'wait';
    };
    /**
     * @return {?}
     */
    ElStep.prototype.makeStepStyles = function () {
        var /** @type {?} */ space = this.root.space;
        var /** @type {?} */ width = typeof space === 'number' ? space + "px" : space
            ? String(space) : 100 / (this.root.stepsLength - 1) + "%";
        var /** @type {?} */ lastStyles = this.isLast()
            ? "max-width: " + 100 / this.root.stepsLength + "%;"
            : "margin-right: " + this.root.offset + "px;";
        var /** @type {?} */ styles = "flex-basis: " + width + "; " + lastStyles;
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElStep.prototype.makeLineStyles = function () {
        var /** @type {?} */ step = this.index === this.root.active - 1
            ? (this.currentStatus() !== 'error' ? 50 : 0)
            : this.currentStatus() === 'wait' ? 0 : 100;
        var /** @type {?} */ delay = (this.root.processStatus === 'wait' ? -1 : 1) * 150 * this.index + 'ms';
        var /** @type {?} */ key = this.root.direction === 'vertical' ? 'height' : 'width';
        var /** @type {?} */ styles = "border-width: " + (step ? '1px' : 0) + "; " + key + ": " + step + "%; transition-delay: " + delay + ";";
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    ElStep.prototype.isLast = function () {
        return this.root.stepsLength - 1 === this.index;
    };
    /**
     * @return {?}
     */
    ElStep.prototype.isVertical = function () {
        return this.root.direction === 'vertical';
    };
    /**
     * @return {?}
     */
    ElStep.prototype.ngOnInit = function () {
        this.index = +this.el.nativeElement.getAttribute('el-index');
        if (this.root.direction === 'horizontal' && this.root.alignCenter) {
            var /** @type {?} */ width = this.titleRef.nativeElement.getBoundingClientRect().width;
            this.mainOffset = width / 2 + 16 + 'px';
        }
        removeNgTag(this.el.nativeElement);
    };
    ElStep.decorators = [
        { type: Component, args: [{
                    selector: 'el-step',
                    template: "\n    <div [class]=\"'el-step ' + (!root.simple ? 'is-' + root.direction : '')\"\n      [class.is-simple]=\"root.simple\"\n      [class.is-center]=\"root.alignCenter && !root.simple && !isVertical()\"\n      [class.is-flex]=\"isLast() && !root.alignCenter && !root.simple\"\n      [style]=\"makeStepStyles()\">\n      <div [class]=\"'el-step__head is-' + currentStatus()\">\n        <div class=\"el-step__line\" [ngStyle]=\"{\n          'margin-right': isLast() ? '' : root.offset + 'px',\n          'display': isLast() ? 'none' : 'block'}\">\n          <i class=\"el-step__line-inner\" [style]=\"makeLineStyles()\"></i>\n        </div>\n\n        <span [class]=\"'el-step__icon ' + (icon ? 'is-icon' : 'is-text')\">\n          <ng-container *ngIf=\"currentStatus() !== 'success' && currentStatus() !== 'error'\">\n            <i *ngIf=\"icon\" [class]=\"'el-step__icon-inner el-icon-' + icon\"></i>\n            <div *ngIf=\"!icon && !root.simple\" class=\"el-step__icon-inner\" >{{ index + 1 }}</div>\n          </ng-container>\n          <i *ngIf=\"currentStatus() === 'success' || currentStatus() === 'error'\"\n            [class]=\"'el-icon-' + (currentStatus() === 'success' ? 'check' : 'close') + ' el-step__icon-inner is-status'\">\n          </i>\n        </span>\n      </div>\n      <div class=\"el-step__main\">\n        <div [class]=\"'el-step__title ' + 'is-' + currentStatus()\" #titleRef>\n          <ng-container>{{ title }}</ng-container>\n        </div>\n        <div *ngIf=\"root.simple\" class=\"el-step__arrow\"></div>\n        <div [class]=\"'el-step__description ' + 'is-' + currentStatus()\">\n          <ng-container>{{ description }}</ng-container>\n        </div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElStep.ctorParameters = function () { return [
        { type: ElSteps, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: DomSanitizer, },
    ]; };
    ElStep.propDecorators = {
        'titleRef': [{ type: ViewChild, args: ['titleRef',] },],
        'title': [{ type: Input },],
        'description': [{ type: Input },],
        'icon': [{ type: Input },],
        'status': [{ type: Input },],
    };
    return ElStep;
}());
export { ElStep };
function ElStep_tsickle_Closure_declarations() {
    /** @type {?} */
    ElStep.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElStep.ctorParameters;
    /** @type {?} */
    ElStep.propDecorators;
    /** @type {?} */
    ElStep.prototype.titleRef;
    /** @type {?} */
    ElStep.prototype.title;
    /** @type {?} */
    ElStep.prototype.description;
    /** @type {?} */
    ElStep.prototype.icon;
    /** @type {?} */
    ElStep.prototype.status;
    /** @type {?} */
    ElStep.prototype.index;
    /** @type {?} */
    ElStep.prototype.mainOffset;
    /** @type {?} */
    ElStep.prototype.root;
    /** @type {?} */
    ElStep.prototype.el;
    /** @type {?} */
    ElStep.prototype.sanitizer;
}
//# sourceMappingURL=step.js.map