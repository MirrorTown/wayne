var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { ElFormProps } from './form.props';
var ElForm = /** @class */ (function (_super) {
    __extends(ElForm, _super);
    function ElForm() {
        return _super.call(this) || this;
    }
    ElForm.decorators = [
        { type: Component, args: [{
                    selector: 'el-form',
                    template: "\n    <form [class]=\"'el-form ' + (labelPosition ? 'el-form--label-' + labelPosition : '')\n      + (inline ? ' el-form--inline' : '')\">\n     <ng-content></ng-content>\n    </form>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElForm.ctorParameters = function () { return []; };
    return ElForm;
}(ElFormProps));
export { ElForm };
function ElForm_tsickle_Closure_declarations() {
    /** @type {?} */
    ElForm.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElForm.ctorParameters;
}
//# sourceMappingURL=form.js.map