import { EventEmitter } from '@angular/core';
export declare class ElPaginationProps {
    small: boolean;
    total: number;
    layout: string[];
    pageSize: number;
    pageSizes: number[];
    pageCount: number;
    model: number;
    modelChange: EventEmitter<number>;
}
