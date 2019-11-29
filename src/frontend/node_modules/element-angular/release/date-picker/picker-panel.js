import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { ElDataPicker } from './picker';
import { dropAnimation } from '../shared/animation/index';
var ElDatePickerPanel = /** @class */ (function () {
    /**
     * @param {?} root
     */
    function ElDatePickerPanel(root) {
        this.root = root;
        this.show = false;
        this.hiddenDay = false;
        this.panelAbsolute = true;
        this.panelIndex = 200;
        this.modelChange = new EventEmitter();
        this.shortcuts = false;
        this.showTime = false;
        this.currentView = 'date';
    }
    /**
     * @param {?} pickPath
     * @return {?}
     */
    ElDatePickerPanel.prototype.showPicker = function (pickPath) {
        this.currentView = pickPath;
    };
    /**
     * @return {?}
     */
    ElDatePickerPanel.prototype.updateDate = function () {
        var /** @type {?} */ date = new Date(this.model);
        var /** @type {?} */ startYear = ~~(date.getFullYear() / 10) * 10;
        this.dateShowModels = {
            month: date.getMonth(),
            year: date.getFullYear(),
            yearRange: [startYear, startYear + 10],
        };
    };
    /**
     * @param {?} time
     * @return {?}
     */
    ElDatePickerPanel.prototype.datePickChangeHandle = function (time) {
        this.model = time;
        this.modelChange.emit(time);
        this.updateDate();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    ElDatePickerPanel.prototype.monthPickChangeHandle = function (time) {
        this.model = time;
        // hidden day, only show month
        if (this.hiddenDay) {
            this.modelChange.emit(time);
        }
        else {
            this.currentView = 'date';
        }
        this.updateDate();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    ElDatePickerPanel.prototype.yearPickChangeHandle = function (time) {
        this.model = time;
        this.currentView = 'month';
        this.updateDate();
    };
    /**
     * @param {?} step
     * @return {?}
     */
    ElDatePickerPanel.prototype.nextYear = function (step) {
        // year table component opened, edit year range
        if (this.currentView === 'year') {
            step = step * 10;
        }
        var /** @type {?} */ date = new Date(this.model);
        date.setFullYear(this.dateShowModels.year + step);
        this.model = date.getTime();
        this.updateDate();
    };
    /**
     * @param {?} step
     * @return {?}
     */
    ElDatePickerPanel.prototype.nextMonth = function (step) {
        var /** @type {?} */ date = new Date(this.model);
        date.setMonth(this.dateShowModels.month + step);
        this.model = date.getTime();
        this.updateDate();
    };
    /**
     * @return {?}
     */
    ElDatePickerPanel.prototype.ngOnInit = function () {
        // hidden day
        this.currentView = this.hiddenDay ? 'month' : 'date';
        this.model = this.model || Date.now();
        this.updateDate();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ElDatePickerPanel.prototype.ngOnChanges = function (changes) {
        // not include model
        if (!changes || !changes.model)
            return;
        // first change
        if (changes.model.isFirstChange())
            return;
        this.model = changes.model.currentValue;
        this.model = this.model || Date.now();
        this.updateDate();
    };
    ElDatePickerPanel.decorators = [
        { type: Component, args: [{
                    selector: 'el-data-picker-panel',
                    animations: [dropAnimation],
                    styles: [' .el-picker-panel-absolute { position: absolute; } '],
                    template: "\n    <div [@dropAnimation]=\"show\"\n      [ngStyle]=\"{ width: width ? width + 'px' : 'auto', 'z-index': panelIndex}\"\n      [class]=\"'el-picker-panel el-date-picker '\"\n      [class.has-time]=\"showTime\"\n      [class.el-picker-panel-absolute]=\"panelAbsolute\">\n      <div class=\"el-picker-panel__body-wrapper\">\n        <!--<div class=\"el-picker-panel__sidebar\" *ngIf=\"shortcuts\">-->\n          <!--<button type=\"button\" class=\"el-picker-panel__shortcut\"-->\n            <!--*ngFor=\"shortcut in shortcuts\"-->\n            <!--(click)=\"handleShortcutClick(shortcut)\">-->\n            <!--{{ shortcut.text }}-->\n          <!--</button>-->\n        <!--</div>-->\n        <div class=\"el-picker-panel__body\">\n          <div class=\"el-date-picker__header\">\n            <button class=\"el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left\"\n              type=\"button\" (click)=\"nextYear(-1)\">\n            </button>\n            <button class=\"el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left\"\n              type=\"button\" (click)=\"nextMonth(-1)\"\n              *ngIf=\"currentView === 'date'\">\n            </button>\n            \n            <!--year label-->\n            <span class=\"el-date-picker__header-label\" *ngIf=\"currentView !== 'year'\"\n              (click)=\"showPicker('year')\">{{dateShowModels.year}} \u5E74</span>\n            <!--year range label-->\n            <span class=\"el-date-picker__header-label\" *ngIf=\"currentView === 'year'\">\n              {{dateShowModels.yearRange[0]}} \u5E74 - {{dateShowModels.yearRange[1]}} \u5E74\n            </span>\n            \n            <span class=\"el-date-picker__header-label\"\n              [class.active]=\"currentView === 'month'\"\n              (click)=\"showPicker('month')\"\n              *ngIf=\"currentView === 'date'\">{{dateShowModels.month + 1}} \u6708</span>\n            <button class=\"el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right\"\n              type=\"button\" (click)=\"nextYear(1)\">\n            </button>\n            <button class=\"el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right\"\n              type=\"button\" (click)=\"nextMonth(1)\"\n              *ngIf=\"currentView === 'date'\">\n            </button>\n          </div>\n\n          <div class=\"el-picker-panel__content\">\n            <el-date-table *ngIf=\"currentView === 'date' && !hiddenDay\"\n              (modelChange)=\"datePickChangeHandle($event)\"\n              [model]=\"model\">\n            </el-date-table>\n            <el-year-table *ngIf=\"currentView === 'year'\"\n              [model]=\"model\"\n              (modelChange)=\"yearPickChangeHandle($event)\"\n              [disabled-date]=\"disabledDate\">\n            </el-year-table>\n            <el-month-table *ngIf=\"currentView === 'month'\"\n              [model]=\"model\"\n              (modelChange)=\"monthPickChangeHandle($event)\"\n              [disabled-date]=\"disabledDate\">\n            </el-month-table>\n          </div>\n        </div>\n      </div>\n\n      <!--<div class=\"el-picker-panel__footer\" *ngIf=\"footerVisible && currentView === 'date'\">-->\n        <!--<a href=\"JavaScript:\" class=\"el-picker-panel__link-btn\" (click)=\"changeToNow()\">556</a>-->\n        <!--<button class=\"el-picker-panel__btn\" type=\"button\"-->\n          <!--(click)=\"confirm()\">667</button>-->\n      <!--</div>-->\n    </div>\n  "
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDatePickerPanel.ctorParameters = function () { return [
        { type: ElDataPicker, decorators: [{ type: Optional },] },
    ]; };
    ElDatePickerPanel.propDecorators = {
        'show': [{ type: Input },],
        'width': [{ type: Input },],
        'model': [{ type: Input },],
        'hiddenDay': [{ type: Input, args: ['hidden-day',] },],
        'panelAbsolute': [{ type: Input, args: ['panel-absolute',] },],
        'panelIndex': [{ type: Input, args: ['panel-index',] },],
        'modelChange': [{ type: Output },],
    };
    return ElDatePickerPanel;
}());
export { ElDatePickerPanel };
function ElDatePickerPanel_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDatePickerPanel.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDatePickerPanel.ctorParameters;
    /** @type {?} */
    ElDatePickerPanel.propDecorators;
    /** @type {?} */
    ElDatePickerPanel.prototype.show;
    /** @type {?} */
    ElDatePickerPanel.prototype.width;
    /** @type {?} */
    ElDatePickerPanel.prototype.model;
    /** @type {?} */
    ElDatePickerPanel.prototype.hiddenDay;
    /** @type {?} */
    ElDatePickerPanel.prototype.panelAbsolute;
    /** @type {?} */
    ElDatePickerPanel.prototype.panelIndex;
    /** @type {?} */
    ElDatePickerPanel.prototype.modelChange;
    /** @type {?} */
    ElDatePickerPanel.prototype.shortcuts;
    /** @type {?} */
    ElDatePickerPanel.prototype.showTime;
    /** @type {?} */
    ElDatePickerPanel.prototype.currentView;
    /** @type {?} */
    ElDatePickerPanel.prototype.dateShowModels;
    /** @type {?} */
    ElDatePickerPanel.prototype.root;
}
//# sourceMappingURL=picker-panel.js.map