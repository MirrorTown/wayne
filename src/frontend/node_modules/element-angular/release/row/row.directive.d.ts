import { ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
export declare class ElRowDirective {
    private sanitizer;
    private el;
    type: string;
    gutter: number;
    justify: string;
    align: string;
    nativeClass: string;
    constructor(sanitizer: DomSanitizer, el: ElementRef);
    justifyClass(): string;
    alignClass(): string;
    gutterStyle(): SafeStyle;
}
