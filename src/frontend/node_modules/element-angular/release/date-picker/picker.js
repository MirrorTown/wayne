var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, forwardRef, Renderer2 } from '@angular/core';
import { ElDatePickerProps } from './picker-props';
import { DateFormat } from './utils/format';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var ElDataPicker = /** @class */ (function (_super) {
    __extends(ElDataPicker, _super);
    /**
     * @param {?} dateFormat
     * @param {?} renderer
     */
    function ElDataPicker(dateFormat, renderer) {
        var _this = _super.call(this) || this;
        _this.dateFormat = dateFormat;
        _this.renderer = renderer;
        _this.showPanelPicker = false;
        _this.iconShowClose = false;
        _this.controlChange = function () { };
        _this.controlTouch = function () { };
        return _this;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    ElDataPicker.prototype.iconMouseActionHandle = function (t) {
        if (!this.clearable)
            return;
        this.iconShowClose = this.model && t;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ElDataPicker.prototype.iconClickHandle = function (e) {
        this.iconClick.emit(e);
        if (this.elDisabled)
            return;
        // use close action
        if (this.iconShowClose) {
            this.clearClick.emit(e);
            this.model = null;
            this.value = Date.now();
            this.showPanelPicker = false;
            this.iconShowClose = false;
            return;
        }
        // toggle action
        this.showPanelPicker = !this.showPanelPicker;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ElDataPicker.prototype.propagationHandle = function (event) {
        event.stopPropagation();
    };
    /**
     * @param {?} input
     * @return {?}
     */
    ElDataPicker.prototype.changeHandle = function (input) {
        var /** @type {?} */ time = this.dateFormat.getTime(input);
        // if (!time) return
        this.value = time;
    };
    /**
     * @return {?}
     */
    ElDataPicker.prototype.tryUpdateText = function () {
        if (!this.value) {
            this.model = null;
            this.modelChange.emit(null);
            this.controlChange(null);
            this.showPanelPicker = false;
            return;
        }
        var /** @type {?} */ modelTime = new Date(this.model).getTime();
        var /** @type {?} */ time = this.dateFormat.getTime(this.value);
        this.dateChangeHandle(time ? this.value : modelTime);
    };
    /**
     * @param {?} time
     * @return {?}
     */
    ElDataPicker.prototype.dateChangeHandle = function (time) {
        this.model = DateFormat.moment(time, this.format);
        this.value = new Date(this.model).getTime();
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
        this.showPanelPicker = false;
    };
    /**
     * @return {?}
     */
    ElDataPicker.prototype.focusHandle = function () {
        var _this = this;
        this.showPanelPicker = true;
        this.globalKeydownListener && this.globalKeydownListener();
        this.globalKeydownListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event.keyCode === 9 || event.keyCode === 27) {
                _this.showPanelPicker = false;
                _this.globalKeydownListener && _this.globalKeydownListener();
            }
            if (event.keyCode === 13) {
                _this.tryUpdateText();
            }
        });
    };
    /**
     * @return {?}
     */
    ElDataPicker.prototype.ngOnInit = function () {
        var _this = this;
        this.globalClickListener = this.renderer.listen('document', 'click', function () {
            if (!_this.showPanelPicker)
                return;
            _this.showPanelPicker = false;
            _this.changeOnBlur && _this.tryUpdateText();
        });
        // init value
        var /** @type {?} */ time = this.dateFormat.getTime(this.model);
        if (!time)
            return;
        this.model = DateFormat.moment(time, this.format);
        this.value = time;
    };
    /**
     * @return {?}
     */
    ElDataPicker.prototype.ngOnDestroy = function () {
        this.globalClickListener && this.globalClickListener();
        this.globalKeydownListener && this.globalKeydownListener();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElDataPicker.prototype.writeValue = function (value) {
        this.model = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElDataPicker.prototype.registerOnChange = function (fn) {
        this.controlChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ElDataPicker.prototype.registerOnTouched = function (fn) {
        this.controlTouch = fn;
    };
    ElDataPicker.decorators = [
        { type: Component, args: [{
                    selector: 'el-date-picker',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElDataPicker; }),
                            multi: true
                        }, DateFormat],
                    template: "\n    <div (click)=\"propagationHandle($event)\">\n      <el-input [class]=\"'el-date-editor ' + 'el-date-editor--' + type\"\n        [readonly]=\"!editable || readonly\"\n        [elDisabled]=\"elDisabled\"\n        [size]=\"size\" [placeholder]=\"placeholder\"\n        [icon]=\"iconShowClose ? 'close' : 'date'\"\n        [model]=\"model\"\n        (icon-click)=\"iconClickHandle($event)\"\n        (modelChange)=\"changeHandle($event)\"\n        (icon-mouseenter)=\"iconMouseActionHandle(true)\"\n        (icon-mouseleave)=\"iconMouseActionHandle(false)\"\n        (focus)=\"focusHandle()\">\n      </el-input>\n      <el-data-picker-panel [show]=\"showPanelPicker\"  [hidden-day]=\"hiddenDay\"\n        [panel-absolute]=\"panelAbsolute\" [panel-index]=\"panelIndex\" [width]=\"panelWidth\"\n        [model]=\"value\" (modelChange)=\"dateChangeHandle($event)\">\n      </el-data-picker-panel>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDataPicker.ctorParameters = function () { return [
        { type: DateFormat, },
        { type: Renderer2, },
    ]; };
    return ElDataPicker;
}(ElDatePickerProps));
export { ElDataPicker };
function ElDataPicker_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDataPicker.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDataPicker.ctorParameters;
    /** @type {?} */
    ElDataPicker.prototype.showPanelPicker;
    /** @type {?} */
    ElDataPicker.prototype.value;
    /** @type {?} */
    ElDataPicker.prototype.globalClickListener;
    /** @type {?} */
    ElDataPicker.prototype.globalKeydownListener;
    /** @type {?} */
    ElDataPicker.prototype.iconShowClose;
    /** @type {?} */
    ElDataPicker.prototype.controlChange;
    /** @type {?} */
    ElDataPicker.prototype.controlTouch;
    /** @type {?} */
    ElDataPicker.prototype.dateFormat;
    /** @type {?} */
    ElDataPicker.prototype.renderer;
}
//# sourceMappingURL=picker.js.map