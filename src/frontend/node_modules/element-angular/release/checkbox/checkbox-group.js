import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElCheckboxGroup = /** @class */ (function () {
    function ElCheckboxGroup() {
        this.model = [];
        this.fill = '#20a0ff';
        this.textColor = '#ffffff';
        this.min = 0;
        this.max = 1000;
        this.modelChange = new EventEmitter();
        // children update handle
        this.subscriber = [];
        this.controlChange = function () { };
        this.controlTouch = function () { };
    }
    /**
     * @param {?} nextValue
     * @return {?}
     */
    ElCheckboxGroup.prototype.changeModel = function (nextValue) {
        var _this = this;
        setTimeout(function () {
            _this.model = nextValue;
            _this.modelChange.emit(nextValue);
            _this.controlChange(nextValue);
            _this.subscriber.forEach(function (sub) { return sub(); });
        }, 0);
    };
    /**
     * @param {?} t
     * @param {?} label
     * @return {?}
     */
    ElCheckboxGroup.prototype.updateModelFromChildren = function (t, label) {
        // add label value
        if (t && this.model.indexOf(label) === -1) {
            if (this.model.length >= this.max)
                return;
            this.model.push(label);
        }
        // remove label value
        if (!t && this.model.indexOf(label) > -1) {
            if (this.model.length < this.min)
                return;
            this.model = this.model.map(function (v) { return v === label ? null : v; })
                .filter(function (v) { return v; });
        }
        // synchronize host
        this.changeModel(this.model);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElCheckboxGroup.prototype.ngOnChanges = function (changes) {
        if (!changes || !changes.model)
            return;
        if (changes.model.isFirstChange())
            return;
        this.changeModel(changes.model.currentValue);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElCheckboxGroup.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElCheckboxGroup.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElCheckboxGroup.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElCheckboxGroup.decorators = [
        { type: Component, args: [{
                    selector: 'el-checkbox-group',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElCheckboxGroup; }),
                            multi: true
                        }],
                    template: "\n    <div class=\"el-checkbox-group\" role=\"group\" aria-label=\"checkbox-group\">\n      <ng-content></ng-content>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElCheckboxGroup.ctorParameters = function () { return []; };
    ElCheckboxGroup.propDecorators = {
        'model': [{ type: Input },],
        'size': [{ type: Input },],
        'fill': [{ type: Input },],
        'textColor': [{ type: Input, args: ['text-color',] },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElCheckboxGroup;
}());
export { ElCheckboxGroup };
function ElCheckboxGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCheckboxGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElCheckboxGroup.ctorParameters;
    /** @type {?} */
    ElCheckboxGroup.propDecorators;
    /** @type {?} */
    ElCheckboxGroup.prototype.model;
    /** @type {?} */
    ElCheckboxGroup.prototype.size;
    /** @type {?} */
    ElCheckboxGroup.prototype.fill;
    /** @type {?} */
    ElCheckboxGroup.prototype.textColor;
    /** @type {?} */
    ElCheckboxGroup.prototype.min;
    /** @type {?} */
    ElCheckboxGroup.prototype.max;
    /** @type {?} */
    ElCheckboxGroup.prototype.modelChange;
    /** @type {?} */
    ElCheckboxGroup.prototype.subscriber;
    /** @type {?} */
    ElCheckboxGroup.prototype.controlChange;
    /** @type {?} */
    ElCheckboxGroup.prototype.controlTouch;
}
//# sourceMappingURL=checkbox-group.js.map