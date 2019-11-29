import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElClassDirective } from './directives/index';
import { ExDynamicService, DocumentWrapper, WindowWrapper } from '../shared/services/index';
import { ElCSSValuePipe } from './pipe/index';
/**
 * @return {?}
 */
export function getDocument() { return document; }
/**
 * @return {?}
 */
export function getWindow() { return window; }
var ElSharedModule = /** @class */ (function () {
    function ElSharedModule() {
    }
    /**
     * @return {?}
     */
    ElSharedModule.forRoot = function () {
        return { ngModule: ElSharedModule, providers: [
                ExDynamicService,
                ElCSSValuePipe,
                { provide: DocumentWrapper, useFactory: getDocument },
                { provide: WindowWrapper, useFactory: getWindow },
            ] };
    };
    ElSharedModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ElCSSValuePipe,
                        ElClassDirective,
                    ],
                    exports: [
                        ElCSSValuePipe,
                        ElClassDirective,
                    ],
                    imports: [CommonModule],
                    entryComponents: [],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSharedModule.ctorParameters = function () { return []; };
    return ElSharedModule;
}());
export { ElSharedModule };
function ElSharedModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSharedModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSharedModule.ctorParameters;
}
//# sourceMappingURL=module.js.map