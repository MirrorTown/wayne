import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElRate } from './rate';
var ElRateModule = /** @class */ (function () {
    function ElRateModule() {
    }
    /**
     * @return {?}
     */
    ElRateModule.forRoot = function () {
        return { ngModule: ElRateModule, providers: [] };
    };
    ElRateModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElRate],
                    exports: [ElRate],
                    imports: [CommonModule],
                    entryComponents: [ElRate],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRateModule.ctorParameters = function () { return []; };
    return ElRateModule;
}());
export { ElRateModule };
function ElRateModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRateModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRateModule.ctorParameters;
}
//# sourceMappingURL=module.js.map