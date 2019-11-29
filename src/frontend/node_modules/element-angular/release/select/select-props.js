import { EventEmitter, Input, Output } from '@angular/core';
var ElSelectPoprs = /** @class */ (function () {
    function ElSelectPoprs() {
        this.elDisabled = false;
        this.clearable = false;
        this.placeholder = '请选择';
        this.multiple = false;
        this.modelChange = new EventEmitter();
    }
    Object.defineProperty(ElSelectPoprs.prototype, "disabled", {
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
    ElSelectPoprs.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'clearable': [{ type: Input },],
        'name': [{ type: Input },],
        'size': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'multiple': [{ type: Input },],
        'popperClass': [{ type: Input, args: ['popper-class',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElSelectPoprs;
}());
export { ElSelectPoprs };
function ElSelectPoprs_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSelectPoprs.propDecorators;
    /** @type {?} */
    ElSelectPoprs.prototype.elDisabled;
    /** @type {?} */
    ElSelectPoprs.prototype.clearable;
    /** @type {?} */
    ElSelectPoprs.prototype.name;
    /** @type {?} */
    ElSelectPoprs.prototype.size;
    /** @type {?} */
    ElSelectPoprs.prototype.placeholder;
    /** @type {?} */
    ElSelectPoprs.prototype.multiple;
    /** @type {?} */
    ElSelectPoprs.prototype.popperClass;
    /** @type {?} */
    ElSelectPoprs.prototype.model;
    /** @type {?} */
    ElSelectPoprs.prototype.modelChange;
}
//# sourceMappingURL=select-props.js.map