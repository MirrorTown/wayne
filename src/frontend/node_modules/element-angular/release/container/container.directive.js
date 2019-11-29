import { Directive, Input, Self } from '@angular/core';
import { NgClass } from '@angular/common';
var ElContainerDirective = /** @class */ (function () {
    /**
     * @param {?} ngClass
     */
    function ElContainerDirective(ngClass) {
        this.ngClass = ngClass;
        this.direction = '';
    }
    /**
     * @return {?}
     */
    ElContainerDirective.prototype.ngOnChanges = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElContainerDirective.prototype.ngOnInit = function () {
        this.colletClasses();
    };
    /**
     * @return {?}
     */
    ElContainerDirective.prototype.colletClasses = function () {
        this.hostClasses = {
            'el-container': true,
            'is-vertical': this.direction === 'vertical',
        };
        this.ngClass.ngClass = this.hostClasses;
        this.ngClass.ngDoCheck();
    };
    ElContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[el-container]',
                    providers: [NgClass],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElContainerDirective.ctorParameters = function () { return [
        { type: NgClass, decorators: [{ type: Self },] },
    ]; };
    ElContainerDirective.propDecorators = {
        'direction': [{ type: Input },],
    };
    return ElContainerDirective;
}());
export { ElContainerDirective };
function ElContainerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ElContainerDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElContainerDirective.ctorParameters;
    /** @type {?} */
    ElContainerDirective.propDecorators;
    /** @type {?} */
    ElContainerDirective.prototype.direction;
    /** @type {?} */
    ElContainerDirective.prototype.hostClasses;
    /** @type {?} */
    ElContainerDirective.prototype.ngClass;
}
//# sourceMappingURL=container.directive.js.map