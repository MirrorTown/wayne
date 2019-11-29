import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
export declare class ElColDirective implements OnInit {
    private sanitizer;
    private el;
    span: number;
    offset: number;
    push: number;
    pull: number;
    xs: any;
    sm: any;
    md: any;
    lg: any;
    xl: any;
    parentIsRow: any;
    gutterFromParent: number;
    nativeClass: string;
    constructor(sanitizer: DomSanitizer, el: ElementRef);
    classList(): string;
    sizeClassList(): string;
    gutterStyle(): SafeStyle;
    ngOnInit(): void;
}
