import { OnInit } from '@angular/core';
import { ElSelect } from './select';
export declare class ElOption implements OnInit {
    private rootSelect;
    disabled: boolean;
    elDisabled: boolean;
    value: any;
    label: string | number;
    rootDisabled: boolean;
    itemSelected: boolean;
    constructor(rootSelect: ElSelect);
    clickHandle(event: Event): void;
    ngOnInit(): void;
}
