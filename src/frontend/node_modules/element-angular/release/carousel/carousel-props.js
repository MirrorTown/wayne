import { EventEmitter, Input, Output } from '@angular/core';
var ElCarouselProps = /** @class */ (function () {
    function ElCarouselProps() {
        this.height = '150px';
        this.trigger = 'click'; // click, hover
        this.indicatorTrigger = 'click'; // click, hover
        this.autoplay = true;
        this.interval = 3000;
        this.initialIndex = 0;
        this.arrow = 'hover'; // always, hover, never
        this.model = 0;
        this.modelChange = new EventEmitter();
    }
    ElCarouselProps.propDecorators = {
        'height': [{ type: Input },],
        'trigger': [{ type: Input },],
        'indicatorTrigger': [{ type: Input },],
        'autoplay': [{ type: Input },],
        'interval': [{ type: Input },],
        'initialIndex': [{ type: Input, args: ['initial-index',] },],
        'indicatorPosition': [{ type: Input, args: ['indicator-position',] },],
        'arrow': [{ type: Input },],
        'type': [{ type: Input },],
        'model': [{ type: Input },],
        'modelChange': [{ type: Output },],
    };
    return ElCarouselProps;
}());
export { ElCarouselProps };
function ElCarouselProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElCarouselProps.propDecorators;
    /** @type {?} */
    ElCarouselProps.prototype.height;
    /** @type {?} */
    ElCarouselProps.prototype.trigger;
    /** @type {?} */
    ElCarouselProps.prototype.indicatorTrigger;
    /** @type {?} */
    ElCarouselProps.prototype.autoplay;
    /** @type {?} */
    ElCarouselProps.prototype.interval;
    /** @type {?} */
    ElCarouselProps.prototype.initialIndex;
    /** @type {?} */
    ElCarouselProps.prototype.indicatorPosition;
    /** @type {?} */
    ElCarouselProps.prototype.arrow;
    /** @type {?} */
    ElCarouselProps.prototype.type;
    /** @type {?} */
    ElCarouselProps.prototype.model;
    /** @type {?} */
    ElCarouselProps.prototype.modelChange;
}
//# sourceMappingURL=carousel-props.js.map