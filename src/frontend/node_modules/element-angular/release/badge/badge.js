import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var ElBadge = /** @class */ (function () {
    function ElBadge() {
        this.hidden = false;
        this.isDot = false;
    }
    /**
     * @return {?}
     */
    ElBadge.prototype.makeContent = function () {
        if (this.isDot)
            return '';
        if (typeof this.model === 'number') {
            return this.max < this.model ? this.max + "+" : this.model;
        }
        return this.model;
    };
    ElBadge.decorators = [
        { type: Component, args: [{
                    selector: 'el-badge',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"el-badge\">\n      <ng-content></ng-content>\n      <sup *ngIf=\"!hidden && (!!makeContent() || isDot)\"\n        class=\"el-badge__content\"\n        style=\"z-index: 1;\"\n        [class.is-fixed]=\"true\" [class.is-dot]=\"isDot\">\n        {{makeContent()}}\n      </sup>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElBadge.ctorParameters = function () { return []; };
    ElBadge.propDecorators = {
        'model': [{ type: Input },],
        'max': [{ type: Input },],
        'hidden': [{ type: Input },],
        'isDot': [{ type: Input, args: ['is-dot',] },],
    };
    return ElBadge;
}());
export { ElBadge };
function ElBadge_tsickle_Closure_declarations() {
    /** @type {?} */
    ElBadge.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElBadge.ctorParameters;
    /** @type {?} */
    ElBadge.propDecorators;
    /** @type {?} */
    ElBadge.prototype.model;
    /** @type {?} */
    ElBadge.prototype.max;
    /** @type {?} */
    ElBadge.prototype.hidden;
    /** @type {?} */
    ElBadge.prototype.isDot;
}
//# sourceMappingURL=badge.js.map