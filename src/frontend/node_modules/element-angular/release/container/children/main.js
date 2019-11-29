import { Component, ElementRef, Input } from '@angular/core';
import { removeNgTag } from '../../shared/utils/host';
var ElMain = /** @class */ (function () {
    /**
     * @param {?} el
     */
    function ElMain(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ElMain.prototype.ngOnInit = function () {
        console.log('Element Angular: Container Component is discarded, use [Container directive] replace it.');
        removeNgTag(this.el.nativeElement);
    };
    ElMain.decorators = [
        { type: Component, args: [{
                    selector: 'el-main',
                    template: "\n    <main [class]=\"'el-main ' + class\">\n      <ng-content></ng-content>\n    </main>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElMain.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ElMain.propDecorators = {
        'class': [{ type: Input },],
    };
    return ElMain;
}());
export { ElMain };
function ElMain_tsickle_Closure_declarations() {
    /** @type {?} */
    ElMain.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElMain.ctorParameters;
    /** @type {?} */
    ElMain.propDecorators;
    /** @type {?} */
    ElMain.prototype.class;
    /** @type {?} */
    ElMain.prototype.el;
}
//# sourceMappingURL=main.js.map