import { OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
export declare class Elprogress implements OnInit {
    private sanitizer;
    percentage: number;
    type: string;
    status: string;
    strokeWidth: number;
    textInside: boolean;
    showText: boolean;
    width: number;
    activeColor: string;
    relativeStrokeWidth: string;
    constructor(sanitizer: DomSanitizer);
    progressTextSize(): number;
    makeIconClass(): string;
    makeStroke(): string;
    makeTrackPath(): string;
    svgStyles(): SafeStyle;
    colorStryles(): SafeStyle;
    ngOnInit(): void;
}
