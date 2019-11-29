import { EventEmitter, OnInit, ElementRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
export declare class ElButton implements OnInit {
    private el;
    private sanitizer;
    disabled: boolean;
    elDisabled: boolean;
    themeType: string;
    nativeType: string;
    size: string;
    icon: string;
    loading: boolean;
    plain: boolean;
    round: boolean;
    autofocus: boolean;
    style: string;
    nativeClass: string;
    click: EventEmitter<any>;
    constructor(el: ElementRef, sanitizer: DomSanitizer);
    clickHandle($event: Event): void;
    extendStyles(): SafeStyle;
    ngOnInit(): void;
}
