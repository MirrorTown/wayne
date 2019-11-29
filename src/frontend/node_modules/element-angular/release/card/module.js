import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElCard } from './card';
var ElCardsModule = /** @class */ (function () {
    function ElCardsModule() {
    }
    /**
     * @return {?}
     */
    ElCardsModule.forRoot = function () {
        return { ngModule: ElCardsModule, providers: [] };
    };
    ElCardsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElCard],
                    exports: [ElCard],
                    imports: [CommonModule],
                    entryComponents: [ElCard],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCardsModule.ctorParameters = function () { return []; };
    return ElCardsModule;
}());
export { ElCardsModule };
function ElCardsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCardsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCardsModule.ctorParameters;
}
//# sourceMappingURL=module.js.map