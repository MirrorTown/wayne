import { Directive } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
var ElMainDirective = /** @class */ (function () {
    function ElMainDirective() {
    }
    ElMainDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-main]',
                    providers: [NgClass, NgStyle],
                    host: { class: 'el-main' },
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMainDirective.ctorParameters = function () { return []; };
    return ElMainDirective;
}());
export { ElMainDirective };
function ElMainDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMainDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMainDirective.ctorParameters;
}
//# sourceMappingURL=main.directive.js.map