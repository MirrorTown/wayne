import { EventEmitter } from '@angular/core';
export declare class ElPaginationJump {
    model: number;
    max: number;
    next: EventEmitter<number>;
    static nextPageNumber(page: number, max: number): number;
    changeHandle(nextValue: number): void;
}
