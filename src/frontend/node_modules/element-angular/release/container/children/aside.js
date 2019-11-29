import { Component, ElementRef, Input } from '@angular/core';
import { removeNgTag } from '../../shared/utils/index';
var ElAside = /** @class */ (function () {
    /**
     * @param {?} el
     */
    function ElAside(el) {
        this.el = el;
        this.width = '300px';
    }
    /**
     * @return {?}
     */
    ElAside.prototype.ngOnInit = function () {
        console.log('Element Angular: Container Component is discarded, use [Container directive] replace it.');
        removeNgTag(this.el.nativeElement);
    };
    ElAside.decorators = [
        { type: Component, args: [{
                    selector: 'el-aside',
                    template: "\n    <aside [class]=\"'el-aside ' + class\" [ngStyle]=\"{width: width}\">\n      <ng-content></ng-content>\n    </aside>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElAside.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ElAside.propDecorators = {
        'width': [{ type: Input },],
        'class': [{ type: Input },],
    };
    return ElAside;
}());
export { ElAside };
function ElAside_tsickle_Closure_declarations() {
    /** @type {?} */
    ElAside.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElAside.ctorParameters;
    /** @type {?} */
    ElAside.propDecorators;
    /** @type {?} */
    ElAside.prototype.width;
    /** @type {?} */
    ElAside.prototype.class;
    /** @type {?} */
    ElAside.prototype.el;
}
//# sourceMappingURL=aside.js.map