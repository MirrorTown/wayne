import { EventEmitter } from '@angular/core';
export declare type AutoSize = {
    minRows: number;
    maxRows: number;
};
export declare class ElInputPoprs {
    type: string;
    value: string | number;
    maxlength: number;
    minlength: number;
    placeholder: string;
    size: string;
    rows: number;
    resize: string;
    icon: string;
    iconClass: string;
    autosize?: AutoSize;
    autoComplete: string;
    name: string;
    nativeType: string;
    readonly: boolean;
    autofocus: boolean;
    parentClass: string;
    model: any;
    modelChange: EventEmitter<any>;
    iconClick: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    iconMouseEnter: EventEmitter<any>;
    iconMouseLeave: EventEmitter<any>;
    iconMousedown: EventEmitter<any>;
    iconMouseup: EventEmitter<any>;
    disabled: boolean;
    elDisabled: boolean;
}
