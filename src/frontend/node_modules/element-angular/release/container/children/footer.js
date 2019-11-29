import { Component, ElementRef, Input } from '@angular/core';
import { ElContainer } from '../container';
import { removeNgTag } from '../../shared/utils/host';
var ElFooter = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} el
     */
    function ElFooter(root, el) {
        this.root = root;
        this.el = el;
        this.height = '60px';
    }
    /**
     * @return {?}
     */
    ElFooter.prototype.ngOnInit = function () {
        console.log('Element Angular: Container Component is discarded, use [Container directive] replace it.');
        this.root.setVertical(true);
        removeNgTag(this.el.nativeElement);
    };
    ElFooter.decorators = [
        { type: Component, args: [{
                    selector: 'el-footer',
                    template: "\n    <footer [class]=\"'el-footer ' + class\" [ngStyle]=\"{height: height}\">\n      <ng-content></ng-content>\n    </footer>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElFooter.ctorParameters = function () { return [
        { type: ElContainer, },
        { type: ElementRef, },
    ]; };
    ElFooter.propDecorators = {
        'height': [{ type: Input },],
        'class': [{ type: Input },],
    };
    return ElFooter;
}());
export { ElFooter };
function ElFooter_tsickle_Closure_declarations() {
    /** @type {?} */
    ElFooter.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElFooter.ctorParameters;
    /** @type {?} */
    ElFooter.propDecorators;
    /** @type {?} */
    ElFooter.prototype.height;
    /** @type {?} */
    ElFooter.prototype.class;
    /** @type {?} */
    ElFooter.prototype.root;
    /** @type {?} */
    ElFooter.prototype.el;
}
//# sourceMappingURL=footer.js.map