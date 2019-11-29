import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElCheckbox } from './checkbox';
import { ElCheckboxButton } from './checkbox-button';
import { ElCheckboxGroup } from './checkbox-group';
var ElCheckboxsModule = /** @class */ (function () {
    function ElCheckboxsModule() {
    }
    /**
     * @return {?}
     */
    ElCheckboxsModule.forRoot = function () {
        return { ngModule: ElCheckboxsModule, providers: [] };
    };
    ElCheckboxsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElCheckbox, ElCheckboxButton, ElCheckboxGroup],
                    exports: [ElCheckbox, ElCheckboxButton, ElCheckboxGroup],
                    imports: [CommonModule, FormsModule],
                    entryComponents: [ElCheckbox, ElCheckboxButton, ElCheckboxGroup],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCheckboxsModule.ctorParameters = function () { return []; };
    return ElCheckboxsModule;
}());
export { ElCheckboxsModule };
function ElCheckboxsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCheckboxsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCheckboxsModule.ctorParameters;
}
//# sourceMappingURL=module.js.map