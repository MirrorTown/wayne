import { OnChanges, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
export declare class ElAsideDirective implements OnChanges, OnInit {
    private ngStyle;
    width: string;
    private hostStyles;
    constructor(ngStyle: NgStyle);
    ngOnChanges(): void;
    ngOnInit(): void;
    private colletClasses();
}
