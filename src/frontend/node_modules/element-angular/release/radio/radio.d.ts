import { EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ElRadioGroup } from './radio-group';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElRadio implements OnInit, ControlValueAccessor {
    private rootGroup;
    private el;
    disabled: boolean;
    elDisabled: boolean;
    label: string | number;
    nativeName: string;
    model: any;
    modelChange: EventEmitter<any>;
    isFocus: boolean;
    parentIsGroup: boolean;
    constructor(rootGroup: ElRadioGroup, el: ElementRef);
    changeHandle(): void;
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
