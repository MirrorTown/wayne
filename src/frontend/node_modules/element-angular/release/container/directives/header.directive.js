import { Directive, Input, Self } from '@angular/core';
import { NgStyle } from '@angular/common';
var ElHeaderDirective = /** @class */ (function () {
    /**
     * @param {?} ngStyle
     */
    function ElHeaderDirective(ngStyle) {
        this.ngStyle = ngStyle;
        this.height = '60px';
    }
    /**
     * @return {?}
     */
    ElHeaderDirective.prototype.ngOnChanges = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElHeaderDirective.prototype.ngOnInit = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElHeaderDirective.prototype.colletClasses = function () {
        this.hostStyles = {
            height: this.height,
        };
        this.ngStyle.ngStyle = this.hostStyles;
        this.ngStyle.ngDoCheck();
    };
    ElHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-header]',
                    host: { class: 'el-header' },
                    providers: [NgStyle],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElHeaderDirective.ctorParameters = function () { return [
        { type: NgStyle, decorators: [{ type: Self },] },
    ]; };
    ElHeaderDirective.propDecorators = {
        'height': [{ type: Input },],
    };
    return ElHeaderDirective;
}());
export { ElHeaderDirective };
function ElHeaderDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElHeaderDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElHeaderDirective.ctorParameters;
    /** @type {?} */
    ElHeaderDirective.propDecorators;
    /** @type {?} */
    ElHeaderDirective.prototype.height;
    /** @type {?} */
    ElHeaderDirective.prototype.hostStyles;
    /** @type {?} */
    ElHeaderDirective.prototype.ngStyle;
}
//# sourceMappingURL=header.directive.js.map