import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElRowDirective } from './row.directive';
var ElRowModule = /** @class */ (function () {
    function ElRowModule() {
    }
    /**
     * @return {?}
     */
    ElRowModule.forRoot = function () {
        return { ngModule: ElRowModule, providers: [] };
    };
    ElRowModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElRowDirective],
                    exports: [ElRowDirective],
                    imports: [CommonModule],
                    entryComponents: [],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRowModule.ctorParameters = function () { return []; };
    return ElRowModule;
}());
export { ElRowModule };
function ElRowModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRowModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRowModule.ctorParameters;
}
//# sourceMappingURL=module.js.map