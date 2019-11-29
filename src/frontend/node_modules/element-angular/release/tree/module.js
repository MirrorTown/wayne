import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElTree } from './tree';
import { ElTreeItem } from './tree-item';
import { ElCheckboxsModule } from '../checkbox/module';
var ElTreeModule = /** @class */ (function () {
    function ElTreeModule() {
    }
    /**
     * @return {?}
     */
    ElTreeModule.forRoot = function () {
        return { ngModule: ElTreeModule, providers: [] };
    };
    ElTreeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElTree, ElTreeItem],
                    exports: [ElTree, ElTreeItem],
                    imports: [CommonModule, ElCheckboxsModule],
                    entryComponents: [ElTree],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTreeModule.ctorParameters = function () { return []; };
    return ElTreeModule;
}());
export { ElTreeModule };
function ElTreeModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTreeModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTreeModule.ctorParameters;
}
//# sourceMappingURL=module.js.map