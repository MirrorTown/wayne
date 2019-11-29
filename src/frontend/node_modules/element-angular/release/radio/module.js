import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElRadioGroup } from './radio-group';
import { ElRadioButton } from './radio-button';
import { ElRadio } from './radio';
var ElRadiosModule = /** @class */ (function () {
    function ElRadiosModule() {
    }
    /**
     * @return {?}
     */
    ElRadiosModule.forRoot = function () {
        return { ngModule: ElRadiosModule, providers: [] };
    };
    ElRadiosModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElRadio, ElRadioGroup, ElRadioButton],
                    exports: [ElRadio, ElRadioGroup, ElRadioButton],
                    imports: [CommonModule, FormsModule],
                    entryComponents: [ElRadio, ElRadioGroup, ElRadioButton],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRadiosModule.ctorParameters = function () { return []; };
    return ElRadiosModule;
}());
export { ElRadiosModule };
function ElRadiosModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRadiosModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRadiosModule.ctorParameters;
}
//# sourceMappingURL=module.js.map