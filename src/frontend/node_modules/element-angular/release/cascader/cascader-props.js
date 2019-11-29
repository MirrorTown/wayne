import { EventEmitter, Input, Output } from '@angular/core';
var ElCascaderPoprs = /** @class */ (function () {
    function ElCascaderPoprs() {
        this.elDisabled = false;
        this.placeholder = '请选择';
        this.clearable = false;
        this.allLevels = true;
        this.changeOnSelect = false;
        this.modelChange = new EventEmitter();
    }
    Object.defineProperty(ElCascaderPoprs.prototype, "disabled", {
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
    ElCascaderPoprs.propDecorators = {
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
        'size': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'options': [{ type: Input },],
        'clearable': [{ type: Input },],
        'allLevels': [{ type: Input, args: ['all-levels',] },],
        'changeOnSelect': [{ type: Input, args: ['change-on-select',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElCascaderPoprs;
}());
export { ElCascaderPoprs };
function ElCascaderPoprs_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCascaderPoprs.propDecorators;
    /** @type {?} */
    ElCascaderPoprs.prototype.elDisabled;
    /** @type {?} */
    ElCascaderPoprs.prototype.size;
    /** @type {?} */
    ElCascaderPoprs.prototype.placeholder;
    /** @type {?} */
    ElCascaderPoprs.prototype.options;
    /** @type {?} */
    ElCascaderPoprs.prototype.clearable;
    /** @type {?} */
    ElCascaderPoprs.prototype.allLevels;
    /** @type {?} */
    ElCascaderPoprs.prototype.changeOnSelect;
    /** @type {?} */
    ElCascaderPoprs.prototype.model;
    /** @type {?} */
    ElCascaderPoprs.prototype.modelChange;
}
//# sourceMappingURL=cascader-props.js.map