import { Input, Directive, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ElRowDirective = /** @class */ (function () {
    /**
     * @param {?} sanitizer
     * @param {?} el
     */
    function ElRowDirective(sanitizer, el) {
        this.sanitizer = sanitizer;
        this.el = el;
        this.gutter = 0;
        this.justify = 'start';
        this.align = 'top';
        this.nativeClass = ' ';
        this.nativeClass += this.el.nativeElement.classList.value;
    }
    /**
     * @return {?}
     */
    ElRowDirective.prototype.justifyClass = function () {
        return this.justify !== 'start' ? " is-justify-" + this.justify : '';
    };
    /**
     * @return {?}
     */
    ElRowDirective.prototype.alignClass = function () {
        return this.align !== 'top' ? " is-align-" + this.align : '';
    };
    /**
     * @return {?}
     */
    ElRowDirective.prototype.gutterStyle = function () {
        var /** @type {?} */ styleStr = '';
        if (this.gutter) {
            styleStr += "margin-left: -" + this.gutter / 2 + "px;";
            styleStr += "margin-right: -" + this.gutter / 2 + "px;";
        }
        return this.sanitizer.bypassSecurityTrustStyle(styleStr);
    };
    ElRowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-row]',
                    host: {
                        '[class]': '"el-row" + justifyClass() + alignClass() + nativeClass',
                        '[class.el-row--flex]': 'type === "flex"',
                        '[style]': 'gutterStyle()',
                    },
                },] },
    ];
    /**
     * @nocollapse
     */
    ElRowDirective.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
    ]; };
    ElRowDirective.propDecorators = {
        'type': [{ type: Input },],
        'gutter': [{ type: Input },],
        'justify': [{ type: Input },],
        'align': [{ type: Input },],
    };
    return ElRowDirective;
}());
export { ElRowDirective };
function ElRowDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElRowDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElRowDirective.ctorParameters;
    /** @type {?} */
    ElRowDirective.propDecorators;
    /** @type {?} */
    ElRowDirective.prototype.type;
    /** @type {?} */
    ElRowDirective.prototype.gutter;
    /** @type {?} */
    ElRowDirective.prototype.justify;
    /** @type {?} */
    ElRowDirective.prototype.align;
    /** @type {?} */
    ElRowDirective.prototype.nativeClass;
    /** @type {?} */
    ElRowDirective.prototype.sanitizer;
    /** @type {?} */
    ElRowDirective.prototype.el;
}
//# sourceMappingURL=row.directive.js.map