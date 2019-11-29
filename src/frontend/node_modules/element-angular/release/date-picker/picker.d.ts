import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ElDatePickerProps } from './picker-props';
import { DateFormat } from './utils/format';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElDataPicker extends ElDatePickerProps implements OnInit, OnDestroy, ControlValueAccessor {
    private dateFormat;
    private renderer;
    showPanelPicker: boolean;
    value: number;
    globalClickListener: Function;
    globalKeydownListener: Function;
    iconShowClose: boolean;
    constructor(dateFormat: DateFormat, renderer: Renderer2);
    iconMouseActionHandle(t: boolean): void;
    iconClickHandle(e: Event): void;
    propagationHandle(event: Event): void;
    changeHandle(input: string): void;
    tryUpdateText(): void;
    dateChangeHandle(time: number): void;
    focusHandle(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
