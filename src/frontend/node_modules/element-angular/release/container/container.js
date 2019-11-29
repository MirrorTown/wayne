import { Component, ElementRef, Input } from '@angular/core';
import { removeNgTag } from '../shared/utils/host';
var ElContainer = /** @class */ (function () {
    /**
     * @param {?} el
     */
    function ElContainer(el) {
        this.el = el;
        this.direction = '';
        this.isVertical = false;
    }
    /**
     * @param {?=} isVertical
     * @return {?}
     */
    ElContainer.prototype.setVertical = function (isVertical) {
        if (isVertical && this.direction !== 'horizontal') {
            this.isVertical = true;
        }
    };
    /**
     * @return {?}
     */
    ElContainer.prototype.ngOnInit = function () {
        console.log('Element Angular: Container Component is discarded, use [Container directive] replace it.');
        this.isVertical = this.direction === 'vertical';
        removeNgTag(this.el.nativeElement);
    };
    ElContainer.decorators = [
        { type: Component, args: [{
                    selector: 'el-container',
                    template: "\n    <section [class]=\"'el-container ' + class\" [class.is-vertical]=\"isVertical\">\n      <ng-content></ng-content>\n    </section>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElContainer.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ElContainer.propDecorators = {
        'direction': [{ type: Input },],
        'class': [{ type: Input },],
    };
    return ElContainer;
}());
export { ElContainer };
function ElContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    ElContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElContainer.ctorParameters;
    /** @type {?} */
    ElContainer.propDecorators;
    /** @type {?} */
    ElContainer.prototype.direction;
    /** @type {?} */
    ElContainer.prototype.class;
    /** @type {?} */
    ElContainer.prototype.isVertical;
    /** @type {?} */
    ElContainer.prototype.el;
}
//# sourceMappingURL=container.js.map