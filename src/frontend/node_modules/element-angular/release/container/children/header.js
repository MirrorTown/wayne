import { Component, ElementRef, Input } from '@angular/core';
import { ElContainer } from '../container';
import { removeNgTag } from '../../shared/utils/host';
var ElHeader = /** @class */ (function () {
    /**
     * @param {?} root
     * @param {?} el
     */
    function ElHeader(root, el) {
        this.root = root;
        this.el = el;
        this.height = '60px';
    }
    /**
     * @return {?}
     */
    ElHeader.prototype.ngOnInit = function () {
        console.log('Element Angular: Container Component is discarded, use [Container directive] replace it.');
        this.root.setVertical(true);
        removeNgTag(this.el.nativeElement);
    };
    ElHeader.decorators = [
        { type: Component, args: [{
                    selector: 'el-header',
                    template: "\n    <header [class]=\"'el-header ' + class\" [ngStyle]=\"{height: height}\">\n      <ng-content></ng-content>\n    </header>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElHeader.ctorParameters = function () { return [
        { type: ElContainer, },
        { type: ElementRef, },
    ]; };
    ElHeader.propDecorators = {
        'height': [{ type: Input },],
        'class': [{ type: Input },],
    };
    return ElHeader;
}());
export { ElHeader };
function ElHeader_tsickle_Closure_declarations() {
    /** @type {?} */
    ElHeader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElHeader.ctorParameters;
    /** @type {?} */
    ElHeader.propDecorators;
    /** @type {?} */
    ElHeader.prototype.height;
    /** @type {?} */
    ElHeader.prototype.class;
    /** @type {?} */
    ElHeader.prototype.root;
    /** @type {?} */
    ElHeader.prototype.el;
}
//# sourceMappingURL=header.js.map