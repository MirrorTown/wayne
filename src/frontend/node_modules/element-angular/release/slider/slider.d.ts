import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ElSliderProps } from './slider.props';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElSlider extends ElSliderProps implements OnInit, AfterViewInit, ControlValueAccessor {
    private sanitizer;
    runwayElement: ElementRef;
    size: number;
    start: number;
    isDragging: boolean;
    constructor(sanitizer: DomSanitizer);
    makeRunwayStyle(): SafeStyle;
    makeBarStyle(): SafeStyle;
    resetSize(): void;
    onSliderClick(event: MouseEvent): void;
    moveChange(nextValue: number): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
