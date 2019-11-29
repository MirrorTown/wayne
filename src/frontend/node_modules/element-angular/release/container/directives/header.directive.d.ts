import { OnChanges, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
export declare class ElHeaderDirective implements OnChanges, OnInit {
    private ngStyle;
    height: string;
    private hostStyles;
    constructor(ngStyle: NgStyle);
    ngOnChanges(): void;
    ngOnInit(): void;
    private colletClasses();
}
