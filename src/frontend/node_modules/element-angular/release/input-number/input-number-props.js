import { EventEmitter, Input, Output } from '@angular/core';
var ElInputNumberPoprs = /** @class */ (function () {
    function ElInputNumberPoprs() {
        this.elDisabled = false;
        this.min = 0;
        this.max = Number.MAX_SAFE_INTEGER;
        this.step = 1;
        this.controls = true;
        this.debounce = 300;
        // bind value
        this.model = '';
        this.modelChange = new EventEmitter();
    }
    Object.defineProperty(ElInputNumberPoprs.prototype, "disabled", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            console.warn('Element Angular: (disabled) is discarded, use [elDisabled] replace it.');
        },
        enumerable: true,
        configurable: true
    });
    ElInputNumberPoprs.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'step': [{ type: Input },],
        'size': [{ type: Input },],
        'controls': [{ type: Input },],
        'debounce': [{ type: Input },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElInputNumberPoprs;
}());
export { ElInputNumberPoprs };
function ElInputNumberPoprs_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInputNumberPoprs.propDecorators;
    /** @type {?} */
    ElInputNumberPoprs.prototype.elDisabled;
    /** @type {?} */
    ElInputNumberPoprs.prototype.min;
    /** @type {?} */
    ElInputNumberPoprs.prototype.max;
    /** @type {?} */
    ElInputNumberPoprs.prototype.step;
    /** @type {?} */
    ElInputNumberPoprs.prototype.size;
    /** @type {?} */
    ElInputNumberPoprs.prototype.controls;
    /** @type {?} */
    ElInputNumberPoprs.prototype.debounce;
    /** @type {?} */
    ElInputNumberPoprs.prototype.model;
    /** @type {?} */
    ElInputNumberPoprs.prototype.modelChange;
}
//# sourceMappingURL=input-number-props.js.map