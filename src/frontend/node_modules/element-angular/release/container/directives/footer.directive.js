import { Directive, Input, Self } from '@angular/core';
import { NgStyle } from '@angular/common';
var ElFooterDirective = /** @class */ (function () {
    /**
     * @param {?} ngStyle
     */
    function ElFooterDirective(ngStyle) {
        this.ngStyle = ngStyle;
        this.height = '60px';
    }
    /**
     * @return {?}
     */
    ElFooterDirective.prototype.ngOnChanges = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElFooterDirective.prototype.ngOnInit = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElFooterDirective.prototype.colletClasses = function () {
        this.hostStyles = {
            height: this.height,
        };
        this.ngStyle.ngStyle = this.hostStyles;
        this.ngStyle.ngDoCheck();
    };
    ElFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-footer]',
                    providers: [NgStyle],
                    host: { class: 'el-footer' },
                },] },
    ];
    /**
     * @nocollapse
     */
    ElFooterDirective.ctorParameters = function () { return [
        { type: NgStyle, decorators: [{ type: Self },] },
    ]; };
    ElFooterDirective.propDecorators = {
        'height': [{ type: Input },],
    };
    return ElFooterDirective;
}());
export { ElFooterDirective };
function ElFooterDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElFooterDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElFooterDirective.ctorParameters;
    /** @type {?} */
    ElFooterDirective.propDecorators;
    /** @type {?} */
    ElFooterDirective.prototype.height;
    /** @type {?} */
    ElFooterDirective.prototype.hostStyles;
    /** @type {?} */
    ElFooterDirective.prototype.ngStyle;
}
//# sourceMappingURL=footer.directive.js.map