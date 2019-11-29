import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElRadioGroup implements ControlValueAccessor {
    disabled: boolean;
    elDisabled: boolean;
    buttonSize: string;
    fillColor: string;
    textColor: string;
    model: any;
    modelChange: EventEmitter<any>;
    subscriber: Function[];
    changeHandle(nextValue: string | number): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
