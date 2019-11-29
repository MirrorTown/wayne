import { OnChanges, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
export declare class ElContainerDirective implements OnChanges, OnInit {
    private ngClass;
    direction: string;
    private hostClasses;
    constructor(ngClass: NgClass);
    ngOnChanges(): void;
    ngOnInit(): void;
    private colletClasses();
}
