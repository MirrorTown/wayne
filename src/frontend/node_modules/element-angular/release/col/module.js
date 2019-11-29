import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElColDirective } from './col.directive';
var ElColModule = /** @class */ (function () {
    function ElColModule() {
    }
    /**
     * @return {?}
     */
    ElColModule.forRoot = function () {
        return { ngModule: ElColModule, providers: [] };
    };
    ElColModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElColDirective],
                    exports: [ElColDirective],
                    imports: [CommonModule],
                    entryComponents: [],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElColModule.ctorParameters = function () { return []; };
    return ElColModule;
}());
export { ElColModule };
function ElColModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElColModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElColModule.ctorParameters;
}
//# sourceMappingURL=module.js.map