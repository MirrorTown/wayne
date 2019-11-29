import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElDropdownItem = /** @class */ (function () {
    function ElDropdownItem() {
        this.selected = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ElDropdownItem.prototype.handleClick = function (event) {
        if (this.model.elDisabled)
            return;
        event.stopPropagation();
        this.selected.emit(this.model);
    };
    ElDropdownItem.decorators = [
        { type: Component, args: [{
                    selector: 'el-dropdown-item',
                    template: "\n    <li class=\"el-dropdown-menu__item\"\n    [class.is-disabled]=\"model.elDisabled\"\n    [class.el-dropdown-menu__item--divided]=\"model.divided\"\n    (click)=\"handleClick($event)\">\n      {{model.label}}\n    </li>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDropdownItem.ctorParameters = function () { return []; };
    ElDropdownItem.propDecorators = {
        'model': [{ type: Input },],
        'selected': [{ type: Output },],
    };
    return ElDropdownItem;
}());
export { ElDropdownItem };
function ElDropdownItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDropdownItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDropdownItem.ctorParameters;
    /** @type {?} */
    ElDropdownItem.propDecorators;
    /** @type {?} */
    ElDropdownItem.prototype.model;
    /** @type {?} */
    ElDropdownItem.prototype.selected;
}
//# sourceMappingURL=dropdown.item.js.map