import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var ElIcon = /** @class */ (function () {
    function ElIcon() {
    }
    ElIcon.decorators = [
        { type: Component, args: [{
                    selector: 'el-icon',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <i [class]=\"iconName ? 'el-icon-' + iconName : ''\"></i>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElIcon.ctorParameters = function () { return []; };
    ElIcon.propDecorators = {
        'iconName': [{ type: Input, args: ['name',] },],
    };
    return ElIcon;
}());
export { ElIcon };
function ElIcon_tsickle_Closure_declarations() {
    /** @type {?} */
    ElIcon.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElIcon.ctorParameters;
    /** @type {?} */
    ElIcon.propDecorators;
    /** @type {?} */
    ElIcon.prototype.iconName;
}
//# sourceMappingURL=icon.js.map