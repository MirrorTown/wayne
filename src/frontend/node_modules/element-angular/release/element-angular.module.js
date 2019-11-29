import { NgModule } from '@angular/core';
import { ElMessageService } from './message/message.service';
import { ElNotificationService } from './notification/notification.service';
import { ElSharedModule } from './shared/module';
import { ElButtonsModule } from './button/module';
import { ElCheckboxsModule } from './checkbox/module';
import { ElIconsModule } from './icon/module';
import { ElRadiosModule } from './radio/module';
import { ElMenusModule } from './menu/module';
import { ElTooltipModule } from './tooltip/module';
import { ElRowModule } from './row/module';
import { ElColModule } from './col/module';
import { ElInputsModule } from './input/module';
import { ElInputNumberModule } from './input-number/module';
import { ElTagsModule } from './tag/module';
import { ElSelectModule } from './select/module';
import { ElSwitchModule } from './switch/module';
import { ElRateModule } from './rate/module';
import { ElProgressModule } from './progress/module';
import { ElStepsModule } from './steps/module';
import { ElLoadingModule } from './loading/module';
import { ElMessagesModule } from './message/module';
import { ElNotificationModule } from './notification/module';
import { ElCascaderModule } from './cascader/module';
import { ElBadgesModule } from './badge/module';
import { ElCardsModule } from './card/module';
import { ElDropdownModule } from './dropdown/module';
import { ElBreadcrumbsModule } from './breadcrumb/module';
import { ElDateModule } from './date-picker/module';
import { ElSliderModule } from './slider/module';
import { ElDialogModule } from './dialog/module';
import { ElCarouselModule } from './carousel/module';
import { ElCollapseModule } from './collapse/module';
import { ElAlertModule } from './alert/module';
import { ElPaginationModule } from './pagination/module';
import { ElUploadModule } from './upload/module';
import { ElTableModule } from './table/module';
import { ElContainerModule } from './container/module';
import { ElFormModule } from './form/module';
import { ElTreeModule } from './tree/module';
export var /** @type {?} */ ElChildModules = {
    ElButtonsModule: ElButtonsModule, ElIconsModule: ElIconsModule, ElRadiosModule: ElRadiosModule, ElMenusModule: ElMenusModule, ElTooltipModule: ElTooltipModule, ElRowModule: ElRowModule,
    ElColModule: ElColModule, ElCheckboxsModule: ElCheckboxsModule, ElInputsModule: ElInputsModule, ElInputNumberModule: ElInputNumberModule, ElTagsModule: ElTagsModule, ElSelectModule: ElSelectModule,
    ElSwitchModule: ElSwitchModule, ElRateModule: ElRateModule, ElProgressModule: ElProgressModule, ElStepsModule: ElStepsModule, ElLoadingModule: ElLoadingModule, ElMessagesModule: ElMessagesModule,
    ElSharedModule: ElSharedModule, ElNotificationModule: ElNotificationModule, ElCascaderModule: ElCascaderModule, ElBadgesModule: ElBadgesModule, ElCardsModule: ElCardsModule, ElDropdownModule: ElDropdownModule,
    ElBreadcrumbsModule: ElBreadcrumbsModule, ElDateModule: ElDateModule, ElSliderModule: ElSliderModule, ElDialogModule: ElDialogModule, ElCarouselModule: ElCarouselModule, ElCollapseModule: ElCollapseModule,
    ElAlertModule: ElAlertModule, ElPaginationModule: ElPaginationModule, ElUploadModule: ElUploadModule, ElTableModule: ElTableModule, ElContainerModule: ElContainerModule, ElFormModule: ElFormModule,
    ElTreeModule: ElTreeModule,
};
export var /** @type {?} */ ELMODULES_GROUP = [
    ElButtonsModule, ElIconsModule, ElRadiosModule, ElMenusModule, ElTooltipModule, ElRowModule,
    ElColModule, ElCheckboxsModule, ElInputsModule, ElInputNumberModule, ElTagsModule, ElSelectModule,
    ElSwitchModule, ElRateModule, ElProgressModule, ElStepsModule, ElLoadingModule, ElMessagesModule,
    ElSharedModule, ElNotificationModule, ElCascaderModule, ElBadgesModule, ElCardsModule, ElDropdownModule,
    ElBreadcrumbsModule, ElDateModule, ElSliderModule, ElDialogModule, ElCarouselModule, ElCollapseModule,
    ElAlertModule, ElPaginationModule, ElUploadModule, ElTableModule, ElContainerModule, ElFormModule,
    ElTreeModule,
];
var ElModule = /** @class */ (function () {
    function ElModule() {
    }
    /**
     * @return {?}
     */
    ElModule.forRoot = function () {
        return {
            ngModule: ElModule,
            providers: [],
        };
    };
    ElModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ElButtonsModule.forRoot(), ElIconsModule.forRoot(), ElRadiosModule.forRoot(), ElMenusModule.forRoot(),
                        ElTooltipModule.forRoot(), ElRowModule.forRoot(), ElColModule.forRoot(), ElCheckboxsModule.forRoot(),
                        ElInputsModule.forRoot(), ElInputNumberModule.forRoot(), ElTagsModule.forRoot(), ElSelectModule.forRoot(),
                        ElSwitchModule.forRoot(), ElRateModule.forRoot(), ElProgressModule.forRoot(), ElStepsModule.forRoot(),
                        ElLoadingModule.forRoot(), ElMessagesModule.forRoot(), ElSharedModule.forRoot(), ElNotificationModule.forRoot(),
                        ElCascaderModule.forRoot(), ElBadgesModule.forRoot(), ElCardsModule.forRoot(), ElDropdownModule.forRoot(),
                        ElBreadcrumbsModule.forRoot(), ElDateModule.forRoot(), ElSliderModule.forRoot(), ElDialogModule.forRoot(),
                        ElCarouselModule.forRoot(), ElCollapseModule.forRoot(), ElAlertModule.forRoot(), ElPaginationModule.forRoot(),
                        ElUploadModule.forRoot(), ElTableModule.forRoot(), ElContainerModule.forRoot(), ElFormModule.forRoot(),
                        ElTreeModule.forRoot(),
                    ],
                    exports: ELMODULES_GROUP,
                },] },
    ];
    /**
     * @nocollapse
     */
    ElModule.ctorParameters = function () { return []; };
    return ElModule;
}());
function ElModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElModule.ctorParameters;
}
export { ElModule, ElMessageService, ElNotificationService, };
//# sourceMappingURL=element-angular.module.js.map