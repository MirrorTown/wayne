import { Component, EventEmitter, Input, Output } from '@angular/core';
var ElCollapse = /** @class */ (function () {
    function ElCollapse() {
        this.modelValue = [];
        this.subscriber = [];
        this.accordion = false;
        this.modelChange = new EventEmitter();
    }
    Object.defineProperty(ElCollapse.prototype, "model", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this.modelValue = val;
            this.updateSubscriber();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    ElCollapse.prototype.updateModel = function (value) {
        var /** @type {?} */ index = this.modelValue.findIndex(function (val) { return val === value; });
        if (index < 0) {
            this.accordion && (this.model = []);
            this.modelValue.push(value);
            this.updateSubscriber();
            return this.modelChange.emit(this.modelValue);
        }
        if (this.accordion) {
            this.model = [];
        }
        else {
            this.modelValue.splice(index, 1);
        }
        this.updateSubscriber();
        this.modelChange.emit(this.modelValue);
    };
    /**
     * @return {?}
     */
    ElCollapse.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ timer = window.setTimeout(function () {
            _this.updateSubscriber();
            window.clearTimeout(timer);
        }, 0);
    };
    /**
     * @return {?}
     */
    ElCollapse.prototype.updateSubscriber = function () {
        this.subscriber.forEach(function (handle) { return handle(); });
    };
    ElCollapse.decorators = [
        { type: Component, args: [{
                    selector: 'el-collapse',
                    styles: [".el-collapse-fix-border { border-bottom: 0; }"],
                    template: "\n    <div class=\"el-collapse el-collapse-fix-border\" role=\"tablist\" aria-multiselectable=\"true\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCollapse.ctorParameters = function () { return []; };
    ElCollapse.propDecorators = {
        'accordion': [{ type: Input },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElCollapse;
}());
export { ElCollapse };
function ElCollapse_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCollapse.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCollapse.ctorParameters;
    /** @type {?} */
    ElCollapse.propDecorators;
    /** @type {?} */
    ElCollapse.prototype.modelValue;
    /** @type {?} */
    ElCollapse.prototype.subscriber;
    /** @type {?} */
    ElCollapse.prototype.accordion;
    /** @type {?} */
    ElCollapse.prototype.modelChange;
}
//# sourceMappingURL=collapse.js.map