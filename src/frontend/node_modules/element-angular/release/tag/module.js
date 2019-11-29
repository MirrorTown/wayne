import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElTag } from './tag';
var ElTagsModule = /** @class */ (function () {
    function ElTagsModule() {
    }
    /**
     * @return {?}
     */
    ElTagsModule.forRoot = function () {
        return { ngModule: ElTagsModule, providers: [] };
    };
    ElTagsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElTag],
                    exports: [ElTag],
                    imports: [CommonModule],
                    entryComponents: [ElTag],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElTagsModule.ctorParameters = function () { return []; };
    return ElTagsModule;
}());
export { ElTagsModule };
function ElTagsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTagsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElTagsModule.ctorParameters;
}
//# sourceMappingURL=module.js.map