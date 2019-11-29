import { EventEmitter, Input, Output } from '@angular/core';
var ElDialogProps = /** @class */ (function () {
    function ElDialogProps() {
        this.center = false;
        this.top = '15%'; // css value
        this.closeOnClickModal = true;
        this.closeOnPressEscape = true;
        this.lockScroll = true; // lock body overflow
        this.showClose = true;
        this.beforeClose = (function (d) { return d(); });
        this.dialogZindex = 2000;
        this.modalZindex = 1999;
        this.visible = false;
        this.visibleChange = new EventEmitter();
    }
    ElDialogProps.propDecorators = {
        'title': [{ type: Input },],
        'width': [{ type: Input },],
        'center': [{ type: Input },],
        'top': [{ type: Input },],
        'closeOnClickModal': [{ type: Input, args: ['close-on-click-modal',] },],
        'closeOnPressEscape': [{ type: Input, args: ['close-on-press-escape',] },],
        'lockScroll': [{ type: Input, args: ['lock-scroll',] },],
        'customClass': [{ type: Input, args: ['custom-class',] },],
        'showClose': [{ type: Input, args: ['show-close',] },],
        'beforeClose': [{ type: Input, args: ['before-close',] },],
        'dialogZindex': [{ type: Input, args: ['dialog-zindex',] },],
        'modalZindex': [{ type: Input, args: ['modal-zindex',] },],
        'visible': [{ type: Input },],
        'visibleChange': [{ type: Output },],
    };
    return ElDialogProps;
}());
export { ElDialogProps };
function ElDialogProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDialogProps.propDecorators;
    /** @type {?} */
    ElDialogProps.prototype.title;
    /** @type {?} */
    ElDialogProps.prototype.width;
    /** @type {?} */
    ElDialogProps.prototype.center;
    /** @type {?} */
    ElDialogProps.prototype.top;
    /** @type {?} */
    ElDialogProps.prototype.closeOnClickModal;
    /** @type {?} */
    ElDialogProps.prototype.closeOnPressEscape;
    /** @type {?} */
    ElDialogProps.prototype.lockScroll;
    /** @type {?} */
    ElDialogProps.prototype.customClass;
    /** @type {?} */
    ElDialogProps.prototype.showClose;
    /** @type {?} */
    ElDialogProps.prototype.beforeClose;
    /** @type {?} */
    ElDialogProps.prototype.dialogZindex;
    /** @type {?} */
    ElDialogProps.prototype.modalZindex;
    /** @type {?} */
    ElDialogProps.prototype.visible;
    /** @type {?} */
    ElDialogProps.prototype.visibleChange;
}
//# sourceMappingURL=dialog.props.js.map