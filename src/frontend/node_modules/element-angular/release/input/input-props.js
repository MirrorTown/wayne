import { EventEmitter, Input, Output } from '@angular/core';
var ElInputPoprs = /** @class */ (function () {
    function ElInputPoprs() {
        this.type = 'text'; // input type. enum: text/textarea
        this.value = ''; // init value
        this.placeholder = '';
        this.rows = 2; // only type === 'textarea'
        // native attrs
        this.autoComplete = 'off'; // only type === 'text'
        this.nativeType = 'text';
        this.readonly = false;
        // @Input() step: any
        this.autofocus = false;
        // @Input() form: string
        // bind value
        this.model = '';
        this.modelChange = new EventEmitter();
        // hook
        this.iconClick = new EventEmitter(); // handle on the input icon
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.iconMouseEnter = new EventEmitter();
        this.iconMouseLeave = new EventEmitter();
        this.iconMousedown = new EventEmitter();
        this.iconMouseup = new EventEmitter();
        this.elDisabled = false;
    }
    Object.defineProperty(ElInputPoprs.prototype, "disabled", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            console.warn('Element Angular: (disabled) is discarded, use [elDisabled] replace it.');
        },
        enumerable: true,
        configurable: true
    });
    ElInputPoprs.propDecorators = {
        'type': [{ type: Input },],
        'value': [{ type: Input },],
        'maxlength': [{ type: Input },],
        'minlength': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'size': [{ type: Input },],
        'rows': [{ type: Input },],
        'resize': [{ type: Input },],
        'icon': [{ type: Input },],
        'iconClass': [{ type: Input },],
        'autosize': [{ type: Input },],
        'autoComplete': [{ type: Input, args: ['auto-complete',] },],
        'name': [{ type: Input },],
        'nativeType': [{ type: Input, args: ['native-type',] },],
        'readonly': [{ type: Input },],
        'autofocus': [{ type: Input },],
        'parentClass': [{ type: Input, args: ['class',] },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
        'iconClick': [{ type: Output, args: ['icon-click',] },],
        'focus': [{ type: Output },],
        'blur': [{ type: Output },],
        'iconMouseEnter': [{ type: Output, args: ['icon-mouseenter',] },],
        'iconMouseLeave': [{ type: Output, args: ['icon-mouseleave',] },],
        'iconMousedown': [{ type: Output, args: ['icon-mousedown',] },],
        'iconMouseup': [{ type: Output, args: ['icon-mouseup',] },],
        'disabled': [{ type: Input },],
        'elDisabled': [{ type: Input },],
    };
    return ElInputPoprs;
}());
export { ElInputPoprs };
function ElInputPoprs_tsickle_Closure_declarations() {
    /** @type {?} */
    ElInputPoprs.propDecorators;
    /** @type {?} */
    ElInputPoprs.prototype.type;
    /** @type {?} */
    ElInputPoprs.prototype.value;
    /** @type {?} */
    ElInputPoprs.prototype.maxlength;
    /** @type {?} */
    ElInputPoprs.prototype.minlength;
    /** @type {?} */
    ElInputPoprs.prototype.placeholder;
    /** @type {?} */
    ElInputPoprs.prototype.size;
    /** @type {?} */
    ElInputPoprs.prototype.rows;
    /** @type {?} */
    ElInputPoprs.prototype.resize;
    /** @type {?} */
    ElInputPoprs.prototype.icon;
    /** @type {?} */
    ElInputPoprs.prototype.iconClass;
    /** @type {?} */
    ElInputPoprs.prototype.autosize;
    /** @type {?} */
    ElInputPoprs.prototype.autoComplete;
    /** @type {?} */
    ElInputPoprs.prototype.name;
    /** @type {?} */
    ElInputPoprs.prototype.nativeType;
    /** @type {?} */
    ElInputPoprs.prototype.readonly;
    /** @type {?} */
    ElInputPoprs.prototype.autofocus;
    /** @type {?} */
    ElInputPoprs.prototype.parentClass;
    /** @type {?} */
    ElInputPoprs.prototype.model;
    /** @type {?} */
    ElInputPoprs.prototype.modelChange;
    /** @type {?} */
    ElInputPoprs.prototype.iconClick;
    /** @type {?} */
    ElInputPoprs.prototype.focus;
    /** @type {?} */
    ElInputPoprs.prototype.blur;
    /** @type {?} */
    ElInputPoprs.prototype.iconMouseEnter;
    /** @type {?} */
    ElInputPoprs.prototype.iconMouseLeave;
    /** @type {?} */
    ElInputPoprs.prototype.iconMousedown;
    /** @type {?} */
    ElInputPoprs.prototype.iconMouseup;
    /** @type {?} */
    ElInputPoprs.prototype.elDisabled;
}
//# sourceMappingURL=input-props.js.map