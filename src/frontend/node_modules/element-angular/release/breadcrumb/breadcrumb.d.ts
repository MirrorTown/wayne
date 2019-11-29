import { EventEmitter } from '@angular/core';
export declare class ElBreadcrumb {
    separator: string;
    separatorClass: string;
    prevent: boolean;
    next: EventEmitter<string>;
    itemHandle(path: string): void;
}
