import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElStep } from './step';
import { ElSteps } from './steps';
var ElStepsModule = /** @class */ (function () {
    function ElStepsModule() {
    }
    /**
     * @return {?}
     */
    ElStepsModule.forRoot = function () {
        return { ngModule: ElStepsModule, providers: [] };
    };
    ElStepsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElStep, ElSteps],
                    exports: [ElStep, ElSteps],
                    imports: [CommonModule],
                    entryComponents: [ElStep, ElSteps],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElStepsModule.ctorParameters = function () { return []; };
    return ElStepsModule;
}());
export { ElStepsModule };
function ElStepsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElStepsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElStepsModule.ctorParameters;
}
//# sourceMappingURL=module.js.map