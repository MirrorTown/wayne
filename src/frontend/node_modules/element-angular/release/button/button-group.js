import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
var ElButtonGroup = /** @class */ (function () {
    function ElButtonGroup() {
        this.nativeClass = '';
    }
    ElButtonGroup.decorators = [
        { type: Component, args: [{
                    selector: 'el-button-group',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div [class]=\"'el-button-group ' + nativeClass\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElButtonGroup.ctorParameters = function () { return []; };
    ElButtonGroup.propDecorators = {
        'nativeClass': [{ type: Input, args: ['class',] },],
    };
    return ElButtonGroup;
}());
export { ElButtonGroup };
function ElButtonGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    ElButtonGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElButtonGroup.ctorParameters;
    /** @type {?} */
    ElButtonGroup.propDecorators;
    /** @type {?} */
    ElButtonGroup.prototype.nativeClass;
}
//# sourceMappingURL=button-group.js.map