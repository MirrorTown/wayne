import { trigger, state, style, animate, transition } from '@angular/animations';
export var /** @type {?} */ fadeAnimation = trigger('fadeAnimation', [
    state('true', style({
        opacity: 0,
        display: 'none'
    })),
    state('false', style({
        opacity: 1,
        display: 'block'
    })),
    transition('* => *', animate("250ms ease-in-out")),
]);
//# sourceMappingURL=fade.animation.js.map