import { ElementRef, OnInit } from '@angular/core';
export declare class ElContainer implements OnInit {
    private el;
    direction: string;
    class: string;
    isVertical: boolean;
    constructor(el: ElementRef);
    setVertical(isVertical?: boolean): void;
    ngOnInit(): void;
}
