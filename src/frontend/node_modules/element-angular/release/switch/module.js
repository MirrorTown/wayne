import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElSwitch } from './switch';
import { FormsModule } from '@angular/forms';
var ElSwitchModule = /** @class */ (function () {
    function ElSwitchModule() {
    }
    /**
     * @return {?}
     */
    ElSwitchModule.forRoot = function () {
        return { ngModule: ElSwitchModule, providers: [] };
    };
    ElSwitchModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElSwitch],
                    exports: [ElSwitch],
                    imports: [CommonModule, FormsModule],
                    entryComponents: [ElSwitch],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSwitchModule.ctorParameters = function () { return []; };
    return ElSwitchModule;
}());
export { ElSwitchModule };
function ElSwitchModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSwitchModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSwitchModule.ctorParameters;
}
//# sourceMappingURL=module.js.map