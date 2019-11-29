import { Pipe } from '@angular/core';
var ElCSSValuePipe = /** @class */ (function () {
    function ElCSSValuePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ElCSSValuePipe.prototype.transform = function (value) {
        if (typeof value === 'number')
            return value + "px";
        if (Number.isNaN(+value))
            return String(value);
        return value + "px";
    };
    ElCSSValuePipe.decorators = [
        { type: Pipe, args: [{ name: 'cssValue' },] },
    ];
    /**
     * @nocollapse
     */
    ElCSSValuePipe.ctorParameters = function () { return []; };
    return ElCSSValuePipe;
}());
export { ElCSSValuePipe };
function ElCSSValuePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCSSValuePipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCSSValuePipe.ctorParameters;
}
//# sourceMappingURL=css-value.js.map