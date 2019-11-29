import { EventEmitter } from '@angular/core';
export declare class ElPaginationButton {
    dir: string;
    disabled: boolean;
    next: EventEmitter<number>;
    clickHandle(step: number): void;
}
