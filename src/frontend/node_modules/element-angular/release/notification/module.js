import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElNotificationContainer } from './notification';
import { ElNotificationService } from './notification.service';
var ElNotificationModule = /** @class */ (function () {
    function ElNotificationModule() {
    }
    /**
     * @return {?}
     */
    ElNotificationModule.forRoot = function () {
        return { ngModule: ElNotificationModule, providers: [
                ElNotificationService,
            ] };
    };
    ElNotificationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElNotificationContainer],
                    exports: [ElNotificationContainer],
                    imports: [CommonModule],
                    entryComponents: [ElNotificationContainer],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElNotificationModule.ctorParameters = function () { return []; };
    return ElNotificationModule;
}());
export { ElNotificationModule };
function ElNotificationModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElNotificationModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElNotificationModule.ctorParameters;
}
//# sourceMappingURL=module.js.map