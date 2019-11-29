import { EventEmitter } from '@angular/core';
export declare class ElSliderProps {
    disabled: boolean;
    elDisabled: boolean;
    min: number;
    max: number;
    showTooltip: boolean;
    formatTooltip: Function;
    vertical: boolean;
    height: number;
    model: number;
    modelChange: EventEmitter<any>;
}
