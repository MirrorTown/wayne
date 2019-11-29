import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElInputsModule } from '../input/module';
import { ElDataPicker } from './picker';
import { ElDatePickerPanel } from './picker-panel';
import { ElDateTable } from './children/date-table';
import { ElYearTable } from './children/year-table';
import { EMonthTable } from './children/month-table';
var ElDateModule = /** @class */ (function () {
    function ElDateModule() {
    }
    /**
     * @return {?}
     */
    ElDateModule.forRoot = function () {
        return { ngModule: ElDateModule, providers: [] };
    };
    ElDateModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElDataPicker, ElDatePickerPanel, ElDateTable, ElYearTable, EMonthTable],
                    exports: [ElDataPicker, ElDatePickerPanel, ElDateTable, ElYearTable, EMonthTable],
                    imports: [CommonModule, FormsModule, ElInputsModule],
                    entryComponents: [ElDataPicker],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDateModule.ctorParameters = function () { return []; };
    return ElDateModule;
}());
export { ElDateModule };
function ElDateModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDateModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDateModule.ctorParameters;
}
//# sourceMappingURL=module.js.map