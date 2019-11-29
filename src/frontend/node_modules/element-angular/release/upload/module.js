import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ElProgressModule } from '../progress/module';
import { ElButtonsModule } from '../button/module';
import { ElUploadRequest } from './upload.request';
import { ElUpload } from './upload';
import { ElUploadList } from './upload.list';
import { ElUploadDragger } from './upload.dragger';
var ElUploadModule = /** @class */ (function () {
    function ElUploadModule() {
    }
    /**
     * @return {?}
     */
    ElUploadModule.forRoot = function () {
        return { ngModule: ElUploadModule, providers: [ElUploadRequest] };
    };
    ElUploadModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElUpload, ElUploadList, ElUploadDragger],
                    exports: [ElUpload],
                    imports: [
                        CommonModule,
                        FormsModule,
                        HttpClientModule,
                        ElButtonsModule,
                        ElProgressModule,
                    ],
                    entryComponents: [ElUpload],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElUploadModule.ctorParameters = function () { return []; };
    return ElUploadModule;
}());
export { ElUploadModule };
function ElUploadModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUploadModule.ctorParameters;
}
//# sourceMappingURL=module.js.map