import { ElementRef } from '@angular/core';
import { ElContainer } from '../container';
export declare class ElFooter {
    private root;
    private el;
    height: string;
    class: string;
    constructor(root: ElContainer, el: ElementRef);
    ngOnInit(): void;
}
