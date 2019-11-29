import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElMessageContainer } from './message';
import { ElMessageService } from './message.service';
var ElMessagesModule = /** @class */ (function () {
    function ElMessagesModule() {
    }
    /**
     * @return {?}
     */
    ElMessagesModule.forRoot = function () {
        return { ngModule: ElMessagesModule, providers: [
                ElMessageService,
            ] };
    };
    ElMessagesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElMessageContainer],
                    exports: [ElMessageContainer],
                    imports: [CommonModule],
                    entryComponents: [ElMessageContainer],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMessagesModule.ctorParameters = function () { return []; };
    return ElMessagesModule;
}());
export { ElMessagesModule };
function ElMessagesModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMessagesModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMessagesModule.ctorParameters;
}
//# sourceMappingURL=module.js.map