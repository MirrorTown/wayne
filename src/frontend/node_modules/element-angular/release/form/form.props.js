import { Input } from '@angular/core';
var ElFormProps = /** @class */ (function () {
    function ElFormProps() {
        this.inline = false;
        this.showIcon = false;
        this.showMessage = false;
        this.inlineMessage = false;
        // right / left / top
        this.labelPosition = 'right';
    }
    ElFormProps.propDecorators = {
        'inline': [{ type: Input },],
        'showIcon': [{ type: Input, args: ['show-icon',] },],
        'showMessage': [{ type: Input, args: ['show-message',] },],
        'inlineMessage': [{ type: Input, args: ['inline-message',] },],
        'size': [{ type: Input, args: ['size',] },],
        'labelPosition': [{ type: Input, args: ['label-position',] },],
        'labelWidth': [{ type: Input, args: ['label-width',] },],
        'labelSuffix': [{ type: Input, args: ['label-suffix',] },],
    };
    return ElFormProps;
}());
export { ElFormProps };
function ElFormProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElFormProps.propDecorators;
    /** @type {?} */
    ElFormProps.prototype.inline;
    /** @type {?} */
    ElFormProps.prototype.showIcon;
    /** @type {?} */
    ElFormProps.prototype.showMessage;
    /** @type {?} */
    ElFormProps.prototype.inlineMessage;
    /** @type {?} */
    ElFormProps.prototype.size;
    /** @type {?} */
    ElFormProps.prototype.labelPosition;
    /** @type {?} */
    ElFormProps.prototype.labelWidth;
    /** @type {?} */
    ElFormProps.prototype.labelSuffix;
}
//# sourceMappingURL=form.props.js.map