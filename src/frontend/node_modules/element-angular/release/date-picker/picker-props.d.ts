import { EventEmitter } from '@angular/core';
export declare class ElDatePickerProps {
    readonly: boolean;
    editable: boolean;
    clearable: boolean;
    changeOnBlur: boolean;
    size: string;
    align: string;
    type: string;
    placeholder: string;
    format: string;
    hiddenDay: boolean;
    panelAbsolute: boolean;
    panelIndex: number;
    panelWidth: number;
    model: string;
    modelChange: EventEmitter<string>;
    clearClick: EventEmitter<Event>;
    iconClick: EventEmitter<Event>;
    disabled: boolean;
    elDisabled: boolean;
}
