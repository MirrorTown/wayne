import { ElementRef, OnInit, Renderer2 } from '@angular/core';
export declare class ElClassDirective implements OnInit {
    private el;
    private renderer;
    classNames: string;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
