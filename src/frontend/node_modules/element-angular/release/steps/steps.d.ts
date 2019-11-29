import { ElementRef, Renderer2, OnInit } from '@angular/core';
export declare class ElSteps implements OnInit {
    private el;
    private renderer;
    space: string | number;
    direction: string;
    active: number;
    simple: boolean;
    processStatus: string;
    finishStatus: string;
    alignCenter: boolean;
    offset: number;
    stepsLength: number;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
