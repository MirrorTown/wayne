import { EventEmitter, ElementRef } from '@angular/core';
import { ElRadioGroup } from './radio-group';
export declare class ElRadioButton {
    private rootGroup;
    private el;
    disabled: boolean;
    elDisabled: boolean;
    label: string | number;
    nativeName: string;
    model: any;
    modelChange: EventEmitter<any>;
    size: string;
    showLabel: boolean;
    parentIsGroup: boolean;
    activeStyles: any;
    constructor(rootGroup: ElRadioGroup, el: ElementRef);
    changeHandle(): void;
    ngOnInit(): void;
}
