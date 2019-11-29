import { EventEmitter } from '@angular/core';
export declare type Value = {
    label: string;
    value: string | number;
    elDisabled?: boolean;
    divided?: boolean;
};
export declare class ElDropdownItem {
    model: Value;
    selected: EventEmitter<any>;
    handleClick(event: Event): void;
}
