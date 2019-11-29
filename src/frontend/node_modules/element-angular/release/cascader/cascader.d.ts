import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ElCascaderPoprs, Option } from './cascader-props';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElCascader extends ElCascaderPoprs implements OnInit, OnDestroy, ControlValueAccessor {
    private renderer;
    steps: any[];
    menuVisible: boolean;
    inputHover: boolean;
    currentLabels: Option[];
    globalListenFunc: Function;
    constructor(renderer: Renderer2);
    close(): void;
    clickHandle(event: MouseEvent): void;
    changeLabels(): void;
    clearValue(event?: Event): void;
    selectHandle(event: Event, step: number, index: number): any;
    showClearIcon(): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
