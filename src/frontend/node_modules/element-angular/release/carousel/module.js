import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElCarousel } from './carousel';
import { ElCarouselItem } from './carousel-item';
var ElCarouselModule = /** @class */ (function () {
    function ElCarouselModule() {
    }
    /**
     * @return {?}
     */
    ElCarouselModule.forRoot = function () {
        return { ngModule: ElCarouselModule, providers: [] };
    };
    ElCarouselModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElCarousel, ElCarouselItem],
                    exports: [ElCarousel, ElCarouselItem],
                    imports: [CommonModule],
                    entryComponents: [ElCarousel],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCarouselModule.ctorParameters = function () { return []; };
    return ElCarouselModule;
}());
export { ElCarouselModule };
function ElCarouselModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCarouselModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCarouselModule.ctorParameters;
}
//# sourceMappingURL=module.js.map