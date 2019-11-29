import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ElSelectModule } from '../select/module';
import { ElPaginationButton, ElPaginationPager, ElPaginationSize, ElPaginationJump } from './children/index';
import { ElPagination } from './pagination';
var ElPaginationModule = /** @class */ (function () {
    function ElPaginationModule() {
    }
    /**
     * @return {?}
     */
    ElPaginationModule.forRoot = function () {
        return { ngModule: ElPaginationModule, providers: [] };
    };
    ElPaginationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ElPagination,
                        ElPaginationButton,
                        ElPaginationPager,
                        ElPaginationSize,
                        ElPaginationJump,
                    ],
                    exports: [ElPagination],
                    imports: [CommonModule, FormsModule, ElSelectModule],
                    entryComponents: [ElPagination],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElPaginationModule.ctorParameters = function () { return []; };
    return ElPaginationModule;
}());
export { ElPaginationModule };
function ElPaginationModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElPaginationModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElPaginationModule.ctorParameters;
}
//# sourceMappingURL=module.js.map