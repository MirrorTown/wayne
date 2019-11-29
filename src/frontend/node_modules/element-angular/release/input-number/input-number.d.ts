import { ElInputNumberPoprs } from './input-number-props';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElInputNumber extends ElInputNumberPoprs implements ControlValueAccessor {
    minDisabled: boolean;
    maxDisabled: boolean;
    constructor();
    changeHandle(value: number): void;
    dispatchModel(limit: number): void;
    decreaseHandle(calcType?: boolean): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
