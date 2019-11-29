import { OnInit, ElementRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ElSteps } from './steps';
export declare class ElStep implements OnInit {
    root: ElSteps;
    private el;
    private sanitizer;
    titleRef: ElementRef;
    title: string;
    description: string;
    icon: string;
    status: string;
    index: number;
    mainOffset: string;
    constructor(root: ElSteps, el: ElementRef, sanitizer: DomSanitizer);
    currentStatus(): string;
    makeStepStyles(): SafeStyle;
    makeLineStyles(): SafeStyle;
    isLast(): boolean;
    isVertical(): boolean;
    ngOnInit(): void;
}
