import { ElementRef, OnInit } from '@angular/core';
import { ElContainer } from '../container';
export declare class ElHeader implements OnInit {
    private root;
    private el;
    height: string;
    class: string;
    constructor(root: ElContainer, el: ElementRef);
    ngOnInit(): void;
}
