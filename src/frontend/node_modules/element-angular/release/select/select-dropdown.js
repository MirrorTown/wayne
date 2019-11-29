import { Component, Input, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ElSelect } from './select';
var ElSelectDropdown = /** @class */ (function () {
    /**
     * @param {?} rootSelect
     * @param {?} sanitizer
     */
    function ElSelectDropdown(rootSelect, sanitizer) {
        this.rootSelect = rootSelect;
        this.sanitizer = sanitizer;
        this.isActived = false;
        this.multiple = false;
    }
    /**
     * @return {?}
     */
    ElSelectDropdown.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ firstStyle = 'display: none; opacity: 0; height: 0;';
        this.dropdownStyles = this.sanitizer.bypassSecurityTrustStyle(firstStyle);
        setTimeout(function () {
            var /** @type {?} */ styles = "min-width: " + _this.rootSelect.selfWidth + "px; " + (firstStyle || '');
            _this.dropdownStyles = _this.sanitizer.bypassSecurityTrustStyle(styles);
            _this.popperClass = _this.rootSelect.popperClass;
            firstStyle = '';
        }, 0);
    };
    ElSelectDropdown.decorators = [
        { type: Component, args: [{
                    selector: 'el-select-dropdown',
                    template: "\n    <div [class]=\"'el-select-dropdown ' + popperClass\"\n      [style]=\"dropdownStyles\"\n      [@state]=\"isActived\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    animations: [
                        trigger('state', [
                            state('true', style({
                                opacity: 1,
                                height: '*',
                                display: 'block',
                            })),
                            state('false', style({
                                opacity: 0,
                                height: 0,
                                display: 'none',
                            })),
                            transition('* => *', animate("250ms ease-in-out")),
                        ])
                    ],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElSelectDropdown.ctorParameters = function () { return [
        { type: ElSelect, decorators: [{ type: Optional },] },
        { type: DomSanitizer, },
    ]; };
    ElSelectDropdown.propDecorators = {
        'isActived': [{ type: Input },],
    };
    return ElSelectDropdown;
}());
export { ElSelectDropdown };
function ElSelectDropdown_tsickle_Closure_declarations() {
    /** @type {?} */
    ElSelectDropdown.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElSelectDropdown.ctorParameters;
    /** @type {?} */
    ElSelectDropdown.propDecorators;
    /** @type {?} */
    ElSelectDropdown.prototype.isActived;
    /** @type {?} */
    ElSelectDropdown.prototype.multiple;
    /** @type {?} */
    ElSelectDropdown.prototype.popperClass;
    /** @type {?} */
    ElSelectDropdown.prototype.dropdownStyles;
    /** @type {?} */
    ElSelectDropdown.prototype.rootSelect;
    /** @type {?} */
    ElSelectDropdown.prototype.sanitizer;
}
//# sourceMappingURL=select-dropdown.js.map