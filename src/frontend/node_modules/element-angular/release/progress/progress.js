import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var Elprogress = /** @class */ (function () {
    /**
     * @param {?} sanitizer
     */
    function Elprogress(sanitizer) {
        this.sanitizer = sanitizer;
        this.percentage = 0;
        this.type = 'line';
        this.strokeWidth = 6;
        this.textInside = false;
        this.showText = true;
        // only in type=circle
        this.width = 126;
    }
    /**
     * @return {?}
     */
    Elprogress.prototype.progressTextSize = function () {
        return this.type === 'line' ? 12 + this.strokeWidth * 0.4
            : this.width * 0.111111 + 2;
    };
    /**
     * @return {?}
     */
    Elprogress.prototype.makeIconClass = function () {
        if (this.type === 'line') {
            return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross';
        }
        return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
    };
    /**
     * @return {?}
     */
    Elprogress.prototype.makeStroke = function () {
        if (this.status === 'success')
            return '#13ce66';
        if (this.status === 'exception')
            return '#ff4949';
        return '#20a0ff';
    };
    /**
     * @return {?}
     */
    Elprogress.prototype.makeTrackPath = function () {
        var /** @type {?} */ radius = ~~(50 - Number.parseFloat(this.relativeStrokeWidth) / 2);
        return "M 50 50 m 0 -" + radius + " a " + radius + " " + radius + " 0 1 1 0 " + radius * 2 + " a " + radius + " " + radius + " 0 1 1 0 -" + radius * 2;
    };
    /**
     * @return {?}
     */
    Elprogress.prototype.svgStyles = function () {
        var /** @type {?} */ perimeter = (50 - parseFloat(this.relativeStrokeWidth) / 2) * 2 * Math.PI;
        var /** @type {?} */ styles = "stroke-dasharray: " + perimeter + "px, " + perimeter + "px;";
        styles += "stroke-dashoffset: " + (1 - this.percentage / 100) * perimeter + "px;";
        styles += 'transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease';
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    Elprogress.prototype.colorStryles = function () {
        var /** @type {?} */ styles = "width: " + this.percentage + "%;" +
            (this.activeColor ? "background-color: " + this.activeColor + ";" : '');
        return this.sanitizer.bypassSecurityTrustStyle(styles);
    };
    /**
     * @return {?}
     */
    Elprogress.prototype.ngOnInit = function () {
        this.percentage > 100 && (this.percentage = 100);
        this.relativeStrokeWidth = (this.strokeWidth / this.width * 100).toFixed(1);
    };
    Elprogress.decorators = [
        { type: Component, args: [{
                    selector: 'el-progress',
                    template: "\n    <div [class]=\"'el-progress el-progress--' + type + (status ? ' is-' + status : '')\"\n      [class.el-progress--without-text]=\"!showText\"\n      [class.el-progress--text-inside]=\"textInside\">\n      <div class=\"el-progress-bar\" *ngIf=\"type === 'line'\">\n        <div class=\"el-progress-bar__outer\" [ngStyle]=\"{height: strokeWidth + 'px'}\">\n          <div class=\"el-progress-bar__inner\" [style]=\"colorStryles()\">\n            <div class=\"el-progress-bar__innerText\" *ngIf=\"showText && textInside\">{{percentage}}%</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"el-progress-circle\" *ngIf=\"type === 'circle'\" [ngStyle]=\"{height: width + 'px', width: width + 'px'}\">\n        <svg viewBox=\"0 0 100 100\">\n          <path class=\"el-progress-circle__track\" [attr.d]=\"makeTrackPath()\" stroke=\"#e5e9f2\"\n            [attr.stroke-width]=\"relativeStrokeWidth\" fill=\"none\"></path>\n          <path class=\"el-progress-circle__path\" [attr.d]=\"makeTrackPath()\" stroke-linecap=\"round\" [attr.stroke]=\"makeStroke()\"\n            [attr.stroke-width]=\"relativeStrokeWidth\" fill=\"none\" [style]=\"svgStyles()\"></path>\n        </svg>\n      </div>\n      <div class=\"el-progress__text\" *ngIf=\"showText && !textInside\"\n           [ngStyle]=\"{fontSize: progressTextSize + 'px'}\">\n        <ng-container *ngIf=\"!status\">{{percentage}}%</ng-container>\n        <i *ngIf=\"status\" [class]=\"makeIconClass()\"></i>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    Elprogress.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    Elprogress.propDecorators = {
        'percentage': [{ type: Input },],
        'type': [{ type: Input },],
        'status': [{ type: Input },],
        'strokeWidth': [{ type: Input, args: ['stroke-width',] },],
        'textInside': [{ type: Input, args: ['text-inside',] },],
        'showText': [{ type: Input, args: ['show-text',] },],
        'width': [{ type: Input },],
        'activeColor': [{ type: Input, args: ['active-color',] },],
    };
    return Elprogress;
}());
export { Elprogress };
function Elprogress_tsickle_Closure_declarations() {
    /** @type {?} */
    Elprogress.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Elprogress.ctorParameters;
    /** @type {?} */
    Elprogress.propDecorators;
    /** @type {?} */
    Elprogress.prototype.percentage;
    /** @type {?} */
    Elprogress.prototype.type;
    /** @type {?} */
    Elprogress.prototype.status;
    /** @type {?} */
    Elprogress.prototype.strokeWidth;
    /** @type {?} */
    Elprogress.prototype.textInside;
    /** @type {?} */
    Elprogress.prototype.showText;
    /** @type {?} */
    Elprogress.prototype.width;
    /** @type {?} */
    Elprogress.prototype.activeColor;
    /** @type {?} */
    Elprogress.prototype.relativeStrokeWidth;
    /** @type {?} */
    Elprogress.prototype.sanitizer;
}
//# sourceMappingURL=progress.js.map