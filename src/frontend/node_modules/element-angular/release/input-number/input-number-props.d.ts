import { EventEmitter } from '@angular/core';
export declare class ElInputNumberPoprs {
    disabled: boolean;
    elDisabled: boolean;
    min: number;
    max: number;
    step: number;
    size: string;
    controls: boolean;
    debounce: number;
    model: any;
    modelChange: EventEmitter<number>;
}
