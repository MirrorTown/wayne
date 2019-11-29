import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElSharedModule } from '../shared/module';
import { ElButtonsModule } from '../button/module';
import { ElDropdownItem } from './dropdown.item';
import { ElDropdown } from './dropdown';
var ElDropdownModule = /** @class */ (function () {
    function ElDropdownModule() {
    }
    /**
     * @return {?}
     */
    ElDropdownModule.forRoot = function () {
        return { ngModule: ElDropdownModule, providers: [] };
    };
    ElDropdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElDropdown, ElDropdownItem],
                    exports: [ElDropdown, ElDropdownItem],
                    imports: [CommonModule, ElButtonsModule, ElSharedModule],
                    entryComponents: [ElDropdown],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDropdownModule.ctorParameters = function () { return []; };
    return ElDropdownModule;
}());
export { ElDropdownModule };
function ElDropdownModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDropdownModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDropdownModule.ctorParameters;
}
//# sourceMappingURL=module.js.map