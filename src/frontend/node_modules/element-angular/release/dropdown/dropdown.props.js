import { EventEmitter, Input, Output } from '@angular/core';
var ElDropdownProps = /** @class */ (function () {
    function ElDropdownProps() {
        this.splitButton = false;
        // style
        this.menuAlign = 'end';
        this.menuNoWrap = false;
        // trigger type
        this.trigger = 'hover';
        this.hideOnClick = true;
        // event
        this.visibleChange = new EventEmitter();
        this.selected = new EventEmitter();
    }
    ElDropdownProps.propDecorators = {
        'model': [{ type: Input },],
        'splitButton': [{ type: Input, args: ['split-button',] },],
        'size': [{ type: Input },],
        'type': [{ type: Input },],
        'menuAlign': [{ type: Input, args: ['menu-align',] },],
        'menuNoWrap': [{ type: Input, args: ['menu-no-wrap',] },],
        'trigger': [{ type: Input },],
        'hideOnClick': [{ type: Input, args: ['hide-on-click',] },],
        'visibleChange': [{ type: Output, args: ['visible-change',] },],
        'selected': [{ type: Output },],
    };
    return ElDropdownProps;
}());
export { ElDropdownProps };
function ElDropdownProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDropdownProps.propDecorators;
    /** @type {?} */
    ElDropdownProps.prototype.model;
    /** @type {?} */
    ElDropdownProps.prototype.splitButton;
    /** @type {?} */
    ElDropdownProps.prototype.size;
    /** @type {?} */
    ElDropdownProps.prototype.type;
    /** @type {?} */
    ElDropdownProps.prototype.menuAlign;
    /** @type {?} */
    ElDropdownProps.prototype.menuNoWrap;
    /** @type {?} */
    ElDropdownProps.prototype.trigger;
    /** @type {?} */
    ElDropdownProps.prototype.hideOnClick;
    /** @type {?} */
    ElDropdownProps.prototype.visibleChange;
    /** @type {?} */
    ElDropdownProps.prototype.selected;
}
//# sourceMappingURL=dropdown.props.js.map