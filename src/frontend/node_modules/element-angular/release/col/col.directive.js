import { Input, Directive, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isParentAttr } from '../shared/utils/index';
var ElColDirective = /** @class */ (function () {
    /**
     * @param {?} sanitizer
     * @param {?} el
     */
    function ElColDirective(sanitizer, el) {
        this.sanitizer = sanitizer;
        this.el = el;
        this.span = 24;
        this.offset = 0;
        this.push = 0;
        this.pull = 0;
        this.parentIsRow = null;
        this.gutterFromParent = 0;
        this.nativeClass = ' ';
        this.nativeClass += this.el.nativeElement.classList.value;
    }
    /**
     * @return {?}
     */
    ElColDirective.prototype.classList = function () {
        var _this = this;
        var /** @type {?} */ makeClass = function (key) { return key !== 'span'
            ? " el-col-" + key + "-" + _this[key]
            : " el-col-" + _this[key]; };
        var /** @type {?} */ classStr = ['span', 'offset', 'pull', 'push'].reduce(function (pre, next) { return !_this[next]
            ? pre
            : pre + makeClass(next); }, 'el-col');
        return classStr + this.nativeClass;
    };
    /**
     * @return {?}
     */
    ElColDirective.prototype.sizeClassList = function () {
        var _this = this;
        var /** @type {?} */ makeClass = function (key) {
            var /** @type {?} */ props = _this[key] || {};
            return Object.keys(props).map(function (prop) { return prop !== 'span'
                ? "el-col-" + key + "-" + prop + "-" + props[prop]
                : "el-col-" + key + "-" + props[prop]; }).join(' ');
        };
        var /** @type {?} */ classStr = ['xs', 'sm', 'md', 'lg', 'xl'].reduce(function (pre, next) { return !_this[next] ?
            pre : typeof _this[next] === 'object'
            ? pre + " " + makeClass(next)
            : pre + " el-col-" + next + "-" + _this[next]; }, '');
        return classStr;
    };
    /**
     * @return {?}
     */
    ElColDirective.prototype.gutterStyle = function () {
        var /** @type {?} */ styleStr = '';
        if (this.gutterFromParent) {
            styleStr += "padding-left: " + this.gutterFromParent / 2 + "px;";
            styleStr += "padding-right: " + this.gutterFromParent / 2 + "px;";
        }
        return this.sanitizer.bypassSecurityTrustStyle(styleStr);
    };
    /**
     * @return {?}
     */
    ElColDirective.prototype.ngOnInit = function () {
        var /** @type {?} */ nativeElement = this.el.nativeElement;
        this.parentIsRow = isParentAttr(nativeElement, 'el-row');
        if (this.parentIsRow) {
            this.gutterFromParent = this.parentIsRow.getAttribute('gutter') || 0;
        }
    };
    ElColDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-col]',
                    host: {
                        '[style]': 'gutterStyle()',
                        '[class]': 'classList() + sizeClassList()',
                    },
                },] },
    ];
    /**
     * @nocollapse
     */
    ElColDirective.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
    ]; };
    ElColDirective.propDecorators = {
        'span': [{ type: Input },],
        'offset': [{ type: Input },],
        'push': [{ type: Input },],
        'pull': [{ type: Input },],
        'xs': [{ type: Input },],
        'sm': [{ type: Input },],
        'md': [{ type: Input },],
        'lg': [{ type: Input },],
        'xl': [{ type: Input },],
    };
    return ElColDirective;
}());
export { ElColDirective };
function ElColDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElColDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElColDirective.ctorParameters;
    /** @type {?} */
    ElColDirective.propDecorators;
    /** @type {?} */
    ElColDirective.prototype.span;
    /** @type {?} */
    ElColDirective.prototype.offset;
    /** @type {?} */
    ElColDirective.prototype.push;
    /** @type {?} */
    ElColDirective.prototype.pull;
    /** @type {?} */
    ElColDirective.prototype.xs;
    /** @type {?} */
    ElColDirective.prototype.sm;
    /** @type {?} */
    ElColDirective.prototype.md;
    /** @type {?} */
    ElColDirective.prototype.lg;
    /** @type {?} */
    ElColDirective.prototype.xl;
    /** @type {?} */
    ElColDirective.prototype.parentIsRow;
    /** @type {?} */
    ElColDirective.prototype.gutterFromParent;
    /** @type {?} */
    ElColDirective.prototype.nativeClass;
    /** @type {?} */
    ElColDirective.prototype.sanitizer;
    /** @type {?} */
    ElColDirective.prototype.el;
}
//# sourceMappingURL=col.directive.js.map