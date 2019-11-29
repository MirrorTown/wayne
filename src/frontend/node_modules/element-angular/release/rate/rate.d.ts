import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ElRateProps } from './rate.props';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor } from '@angular/forms';
export declare type RateMapItem = {
    color: string;
    class: string;
};
export declare type RateMap = {
    low: RateMapItem;
    high: RateMapItem;
    medium: RateMapItem;
    void: RateMapItem;
    elDisabled: RateMapItem;
};
export declare class ElRate extends ElRateProps implements OnInit, ControlValueAccessor {
    private sanitizer;
    private renderer;
    rateIcon: ElementRef;
    scores: boolean[];
    rateMap: RateMap;
    backupModel: number;
    constructor(sanitizer: DomSanitizer, renderer: Renderer2);
    hoverToggle({srcElement}: Event, index?: number, reset?: boolean): void;
    selectValue(index: number): void;
    makeIconClasses(index: number): string;
    makeIconStyles(index: number): SafeStyle;
    findCurrentType(index: number, rateMap: RateMap): RateMapItem;
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
