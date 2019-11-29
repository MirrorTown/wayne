import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElSharedModule } from '../shared/module';
import { ElLoadingDirective } from './loading.directive';
var ElLoadingModule = /** @class */ (function () {
    function ElLoadingModule() {
    }
    /**
     * @return {?}
     */
    ElLoadingModule.forRoot = function () {
        return { ngModule: ElLoadingModule, providers: [] };
    };
    ElLoadingModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElLoadingDirective],
                    exports: [ElLoadingDirective],
                    imports: [CommonModule, ElSharedModule],
                    entryComponents: [],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElLoadingModule.ctorParameters = function () { return []; };
    return ElLoadingModule;
}());
export { ElLoadingModule };
function ElLoadingModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElLoadingModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElLoadingModule.ctorParameters;
}
//# sourceMappingURL=module.js.map