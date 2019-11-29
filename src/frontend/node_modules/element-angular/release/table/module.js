import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElTableHeader, ElTableColumn, ElTableBody } from './children/index';
import { ElTable } from './table';
import { ElTableFormat } from './utils/format';
import { ElSharedModule } from '../shared/module';
var ElTableModule = /** @class */ (function () {
    function ElTableModule() {
    }
    /**
     * @return {?}
     */
    ElTableModule.forRoot = function () {
        return { ngModule: ElTableModule, providers: [ElTableFormat] };
    };
    ElTableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ElTable,
                        ElTableHeader,
                        ElTableColumn,
                        ElTableBody,
                    ],
                    exports: [
                        ElTable,
                        ElTableColumn,
                    ],
                    imports: [CommonModule, ElSharedModule],
                    entryComponents: [ElTable],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTableModule.ctorParameters = function () { return []; };
    return ElTableModule;
}());
export { ElTableModule };
function ElTableModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTableModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTableModule.ctorParameters;
}
//# sourceMappingURL=module.js.map