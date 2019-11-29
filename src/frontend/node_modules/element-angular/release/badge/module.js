import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElBadge } from './badge';
var ElBadgesModule = /** @class */ (function () {
    function ElBadgesModule() {
    }
    /**
     * @return {?}
     */
    ElBadgesModule.forRoot = function () {
        return { ngModule: ElBadgesModule, providers: [] };
    };
    ElBadgesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElBadge],
                    exports: [ElBadge],
                    imports: [CommonModule],
                    entryComponents: [ElBadge],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElBadgesModule.ctorParameters = function () { return []; };
    return ElBadgesModule;
}());
export { ElBadgesModule };
function ElBadgesModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElBadgesModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElBadgesModule.ctorParameters;
}
//# sourceMappingURL=module.js.map