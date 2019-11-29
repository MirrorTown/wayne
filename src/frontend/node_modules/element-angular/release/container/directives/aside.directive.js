import { Directive, Input, Self } from '@angular/core';
import { NgStyle } from '@angular/common';
var ElAsideDirective = /** @class */ (function () {
    /**
     * @param {?} ngStyle
     */
    function ElAsideDirective(ngStyle) {
        this.ngStyle = ngStyle;
        this.width = '300px';
    }
    /**
     * @return {?}
     */
    ElAsideDirective.prototype.ngOnChanges = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElAsideDirective.prototype.ngOnInit = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElAsideDirective.prototype.colletClasses = function () {
        this.hostStyles = {
            width: this.width,
        };
        this.ngStyle.ngStyle = this.hostStyles;
        this.ngStyle.ngDoCheck();
    };
    ElAsideDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-aside]',
                    host: { class: 'el-aside' },
                    providers: [NgStyle],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElAsideDirective.ctorParameters = function () { return [
        { type: NgStyle, decorators: [{ type: Self },] },
    ]; };
    ElAsideDirective.propDecorators = {
        'width': [{ type: Input },],
    };
    return ElAsideDirective;
}());
export { ElAsideDirective };
function ElAsideDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElAsideDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElAsideDirective.ctorParameters;
    /** @type {?} */
    ElAsideDirective.propDecorators;
    /** @type {?} */
    ElAsideDirective.prototype.width;
    /** @type {?} */
    ElAsideDirective.prototype.hostStyles;
    /** @type {?} */
    ElAsideDirective.prototype.ngStyle;
}
//# sourceMappingURL=aside.directive.js.map