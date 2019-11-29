import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElCheckboxGroup implements OnChanges, ControlValueAccessor {
    model: any[];
    size: string;
    fill: string;
    textColor: string;
    min: number;
    max: number;
    modelChange: EventEmitter<any>;
    subscriber: Function[];
    changeModel(nextValue: any): void;
    updateModelFromChildren(t: boolean, label: string): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
