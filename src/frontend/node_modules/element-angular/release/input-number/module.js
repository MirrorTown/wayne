import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElInputNumber } from './input-number';
var ElInputNumberModule = /** @class */ (function () {
    function ElInputNumberModule() {
    }
    /**
     * @return {?}
     */
    ElInputNumberModule.forRoot = function () {
        return { ngModule: ElInputNumberModule, providers: [] };
    };
    ElInputNumberModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElInputNumber],
                    exports: [ElInputNumber],
                    imports: [CommonModule, FormsModule],
                    entryComponents: [ElInputNumber],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElInputNumberModule.ctorParameters = function () { return []; };
    return ElInputNumberModule;
}());
export { ElInputNumberModule };
function ElInputNumberModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInputNumberModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElInputNumberModule.ctorParameters;
}
//# sourceMappingURL=module.js.map