import { ElementRef, OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ElCarousel } from './carousel';
export declare class ElCarouselItem implements OnInit {
    root: ElCarousel;
    private sanitizer;
    private el;
    index: number;
    label: string;
    width: number;
    preTranslate: number;
    isAnimating: boolean;
    isActive: boolean;
    styles: SafeStyle;
    constructor(root: ElCarousel, sanitizer: DomSanitizer, el: ElementRef);
    updateActive(): void;
    updateStyles(): void;
    update(): void;
    ngOnInit(): void;
}
