import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElButton } from './button';
import { ElButtonGroup } from './button-group';
var ElButtonsModule = /** @class */ (function () {
    function ElButtonsModule() {
    }
    /**
     * @return {?}
     */
    ElButtonsModule.forRoot = function () {
        return { ngModule: ElButtonsModule, providers: [] };
    };
    ElButtonsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElButton, ElButtonGroup],
                    exports: [ElButton, ElButtonGroup],
                    imports: [CommonModule],
                    entryComponents: [ElButton, ElButtonGroup],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElButtonsModule.ctorParameters = function () { return []; };
    return ElButtonsModule;
}());
export { ElButtonsModule };
function ElButtonsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElButtonsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElButtonsModule.ctorParameters;
}
//# sourceMappingURL=module.js.map