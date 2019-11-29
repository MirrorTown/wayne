import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElSharedModule } from '../shared/module';
import { ElDialog } from './dialog';
/**
 * @return {?}
 */
export function getDocument() { return document; }
/**
 * @return {?}
 */
export function getWindow() { return window; }
var ElDialogModule = /** @class */ (function () {
    function ElDialogModule() {
    }
    /**
     * @return {?}
     */
    ElDialogModule.forRoot = function () {
        return { ngModule: ElDialogModule, providers: [] };
    };
    ElDialogModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElDialog],
                    exports: [ElDialog],
                    imports: [CommonModule, ElSharedModule],
                    entryComponents: [ElDialog],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDialogModule.ctorParameters = function () { return []; };
    return ElDialogModule;
}());
export { ElDialogModule };
function ElDialogModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDialogModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDialogModule.ctorParameters;
}
//# sourceMappingURL=module.js.map