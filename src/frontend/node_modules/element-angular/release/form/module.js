import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElSharedModule } from '../shared/module';
import { ElButtonsModule } from '../button/module';
import { ElForm } from './form';
import { ElFormItem } from './form-item';
var ElFormModule = /** @class */ (function () {
    function ElFormModule() {
    }
    /**
     * @return {?}
     */
    ElFormModule.forRoot = function () {
        return { ngModule: ElFormModule, providers: [] };
    };
    ElFormModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElForm, ElFormItem],
                    exports: [ElForm, ElFormItem],
                    imports: [CommonModule, ElButtonsModule, ElSharedModule],
                    entryComponents: [ElForm],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElFormModule.ctorParameters = function () { return []; };
    return ElFormModule;
}());
export { ElFormModule };
function ElFormModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElFormModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElFormModule.ctorParameters;
}
//# sourceMappingURL=module.js.map