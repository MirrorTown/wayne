import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElTooltipModule } from '../tooltip/module';
import { ElSliderButton } from './slider-button';
import { ElSlider } from './slider';
var ElSliderModule = /** @class */ (function () {
    function ElSliderModule() {
    }
    /**
     * @return {?}
     */
    ElSliderModule.forRoot = function () {
        return { ngModule: ElSliderModule, providers: [] };
    };
    ElSliderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElSlider, ElSliderButton],
                    exports: [ElSlider, ElSliderButton],
                    imports: [CommonModule, ElTooltipModule],
                    entryComponents: [ElSlider],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSliderModule.ctorParameters = function () { return []; };
    return ElSliderModule;
}());
export { ElSliderModule };
function ElSliderModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSliderModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSliderModule.ctorParameters;
}
//# sourceMappingURL=module.js.map