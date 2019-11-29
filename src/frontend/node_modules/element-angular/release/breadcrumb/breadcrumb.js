import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
var ElBreadcrumb = /** @class */ (function () {
    function ElBreadcrumb() {
        this.separator = '/';
        this.prevent = false;
        this.next = new EventEmitter();
    }
    /**
     * @param {?} path
     * @return {?}
     */
    ElBreadcrumb.prototype.itemHandle = function (path) {
        this.next.emit(path);
    };
    ElBreadcrumb.decorators = [
        { type: Component, args: [{
                    selector: 'el-breadcrumb',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"el-breadcrumb\" aria-label=\"Breadcrumb\" role=\"navigation\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElBreadcrumb.ctorParameters = function () { return []; };
    ElBreadcrumb.propDecorators = {
        'separator': [{ type: Input },],
        'separatorClass': [{ type: Input, args: ['separator-class',] },],
        'prevent': [{ type: Input },],
        'next': [{ type: Output, args: ['next',] },],
    };
    return ElBreadcrumb;
}());
export { ElBreadcrumb };
function ElBreadcrumb_tsickle_Closure_declarations() {
    /** @type {?} */
    ElBreadcrumb.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElBreadcrumb.ctorParameters;
    /** @type {?} */
    ElBreadcrumb.propDecorators;
    /** @type {?} */
    ElBreadcrumb.prototype.separator;
    /** @type {?} */
    ElBreadcrumb.prototype.separatorClass;
    /** @type {?} */
    ElBreadcrumb.prototype.prevent;
    /** @type {?} */
    ElBreadcrumb.prototype.next;
}
//# sourceMappingURL=breadcrumb.js.map