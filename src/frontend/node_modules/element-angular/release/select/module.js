import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElTagsModule } from '../tag/module';
import { ElInputsModule } from '../input/module';
import { ElSelectDropdown } from './select-dropdown';
import { ElOption } from './option';
import { ElSelect } from './select';
var ElSelectModule = /** @class */ (function () {
    function ElSelectModule() {
    }
    /**
     * @return {?}
     */
    ElSelectModule.forRoot = function () {
        return { ngModule: ElSelectModule, providers: [] };
    };
    ElSelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElSelectDropdown, ElOption, ElSelect],
                    exports: [ElSelectDropdown, ElOption, ElSelect],
                    imports: [CommonModule, FormsModule, ElTagsModule, ElInputsModule],
                    entryComponents: [ElSelectDropdown, ElOption, ElSelect],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSelectModule.ctorParameters = function () { return []; };
    return ElSelectModule;
}());
export { ElSelectModule };
function ElSelectModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSelectModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSelectModule.ctorParameters;
}
//# sourceMappingURL=module.js.map