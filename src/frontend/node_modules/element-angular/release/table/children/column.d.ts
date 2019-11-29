import { ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ElTable } from '../table';
export declare class ElTableColumn implements OnInit {
    private root;
    private el;
    slot: TemplateRef<any>;
    modelKey: string;
    renderHTML: boolean;
    label: string;
    width: string | number;
    private maxDeep;
    constructor(root: ElTable, el: ElementRef);
    findChild(self: Element): number;
    findLevel(self: Element): number;
    findDeep(self: Element): number;
    isLastElement(deep: number, self: Element): boolean;
    ngOnInit(): void;
}
