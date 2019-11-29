import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElAlert } from './alert';
var ElAlertModule = /** @class */ (function () {
    function ElAlertModule() {
    }
    /**
     * @return {?}
     */
    ElAlertModule.forRoot = function () {
        return { ngModule: ElAlertModule, providers: [] };
    };
    ElAlertModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElAlert],
                    exports: [ElAlert],
                    imports: [CommonModule],
                    entryComponents: [ElAlert],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElAlertModule.ctorParameters = function () { return []; };
    return ElAlertModule;
}());
export { ElAlertModule };
function ElAlertModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElAlertModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElAlertModule.ctorParameters;
}
//# sourceMappingURL=module.js.map