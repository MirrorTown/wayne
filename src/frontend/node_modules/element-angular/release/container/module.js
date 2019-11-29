import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElContainer } from './container';
import { ElContainerDirective } from './container.directive';
import { ElHeader, ElAside, ElMain, ElFooter } from './children/index';
import { ElAsideDirective, ElFooterDirective, ElHeaderDirective, ElMainDirective } from './directives/index';
var ElContainerModule = /** @class */ (function () {
    function ElContainerModule() {
    }
    /**
     * @return {?}
     */
    ElContainerModule.forRoot = function () {
        return { ngModule: ElContainerModule, providers: [] };
    };
    ElContainerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ElContainer,
                        ElHeader,
                        ElAside,
                        ElMain,
                        ElFooter,
                        ElContainerDirective,
                        ElHeaderDirective,
                        ElMainDirective,
                        ElFooterDirective,
                        ElAsideDirective,
                    ],
                    exports: [
                        ElContainer,
                        ElHeader,
                        ElAside,
                        ElMain,
                        ElFooter,
                        ElContainerDirective,
                        ElHeaderDirective,
                        ElMainDirective,
                        ElFooterDirective,
                        ElAsideDirective,
                    ],
                    imports: [CommonModule],
                    entryComponents: [ElContainer],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElContainerModule.ctorParameters = function () { return []; };
    return ElContainerModule;
}());
export { ElContainerModule };
function ElContainerModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElContainerModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElContainerModule.ctorParameters;
}
//# sourceMappingURL=module.js.map