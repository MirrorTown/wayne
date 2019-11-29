import { EventEmitter } from '@angular/core';
export declare class ElUploadDragger {
    elDisabled: boolean;
    change: EventEmitter<any>;
    dragger: boolean;
    dragoverHandle(event: Event): void;
    dragLeaveHandle(event: Event): void;
    dropHandle(event: DragEvent): void;
}
