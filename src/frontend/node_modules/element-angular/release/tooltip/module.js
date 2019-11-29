import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElTooltip } from './tooltip';
import { ElSharedModule } from '../shared/module';
/**
 * @return {?}
 */
export function getWindow() { return window; }
var ElTooltipModule = /** @class */ (function () {
    function ElTooltipModule() {
    }
    /**
     * @return {?}
     */
    ElTooltipModule.forRoot = function () {
        return { ngModule: ElTooltipModule, providers: [] };
    };
    ElTooltipModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElTooltip],
                    exports: [ElTooltip],
                    imports: [CommonModule, ElSharedModule],
                    entryComponents: [ElTooltip],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTooltipModule.ctorParameters = function () { return []; };
    return ElTooltipModule;
}());
export { ElTooltipModule };
function ElTooltipModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTooltipModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTooltipModule.ctorParameters;
}
//# sourceMappingURL=module.js.map