import { Component, Input, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ElCard = /** @class */ (function () {
    /**
     * @param {?} sanitizer
     */
    function ElCard(sanitizer) {
        this.sanitizer = sanitizer;
        this.bodyStyle = '';
    }
    /**
     * @return {?}
     */
    ElCard.prototype.makeSafebodyStyle = function () {
        return this.sanitizer.bypassSecurityTrustStyle(this.bodyStyle);
    };
    ElCard.decorators = [
        { type: Component, args: [{
                    selector: 'el-card',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"el-card\">\n      <div class=\"el-card__header\" *ngIf=\"header || headerStr\">\n        <ng-container *ngIf=\"header\">\n          <ng-template [ngTemplateOutlet]=\"header\">\n          </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"!header\">\n          {{headerStr}}\n        </ng-container>\n      </div>\n      <div class=\"el-card__body\" [style]=\"makeSafebodyStyle()\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCard.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    ElCard.propDecorators = {
        'header': [{ type: ContentChild, args: ['header',] },],
        'headerStr': [{ type: Input, args: ['header',] },],
        'bodyStyle': [{ type: Input, args: ['body-style',] },],
    };
    return ElCard;
}());
export { ElCard };
function ElCard_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCard.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCard.ctorParameters;
    /** @type {?} */
    ElCard.propDecorators;
    /** @type {?} */
    ElCard.prototype.header;
    /** @type {?} */
    ElCard.prototype.headerStr;
    /** @type {?} */
    ElCard.prototype.bodyStyle;
    /** @type {?} */
    ElCard.prototype.sanitizer;
}
//# sourceMappingURL=card.js.map