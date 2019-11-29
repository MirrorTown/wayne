import { EventEmitter, Input, Output } from '@angular/core';
var ElTreeProps = /** @class */ (function () {
    function ElTreeProps() {
        this.modelChange = new EventEmitter();
        this.emptyText = '';
        this.showCheckbox = false;
        this.defaultExpandAll = false;
        this.defaultExpandedKeys = [];
        this.defaultCheckedKeys = [];
        this.expandOnClickNode = true;
        this.indent = 16;
        this.accordion = false;
        this.elDisabled = false;
    }
    Object.defineProperty(ElTreeProps.prototype, "disabled", {
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
    ElTreeProps.propDecorators = {
        'modelChange': [{ type: Output },],
        'emptyText': [{ type: Input, args: ['empty-text',] },],
        'showCheckbox': [{ type: Input, args: ['show-checkbox',] },],
        'defaultExpandAll': [{ type: Input, args: ['default-expand-all',] },],
        'defaultExpandedKeys': [{ type: Input, args: ['default-expanded-keys',] },],
        'defaultCheckedKeys': [{ type: Input, args: ['default-checked-keys',] },],
        'expandOnClickNode': [{ type: Input, args: ['expand-on-click-node',] },],
        'indent': [{ type: Input },],
        'accordion': [{ type: Input },],
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
    };
    return ElTreeProps;
}());
export { ElTreeProps };
function ElTreeProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElTreeProps.propDecorators;
    /** @type {?} */
    ElTreeProps.prototype.identModel;
    /** @type {?} */
    ElTreeProps.prototype.modelChange;
    /** @type {?} */
    ElTreeProps.prototype.emptyText;
    /** @type {?} */
    ElTreeProps.prototype.showCheckbox;
    /** @type {?} */
    ElTreeProps.prototype.defaultExpandAll;
    /** @type {?} */
    ElTreeProps.prototype.defaultExpandedKeys;
    /** @type {?} */
    ElTreeProps.prototype.defaultCheckedKeys;
    /** @type {?} */
    ElTreeProps.prototype.expandOnClickNode;
    /** @type {?} */
    ElTreeProps.prototype.indent;
    /** @type {?} */
    ElTreeProps.prototype.accordion;
    /** @type {?} */
    ElTreeProps.prototype.elDisabled;
}
//# sourceMappingURL=tree-props.js.map