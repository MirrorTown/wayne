import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
export declare class ElMessageContainer {
    private sanitizer;
    id: string;
    showClose: boolean;
    type: string;
    center: boolean;
    duration: number;
    iconClass: string;
    customClass: string;
    zIndex: number;
    message: string;
    showBox: boolean;
    timer: any;
    onClose: Function;
    onDestroy: Function;
    constructor(sanitizer: DomSanitizer);
    makeTypeClass(): string;
    makeLink(): SafeUrl;
    show(message: string): void;
    close(): void;
    startTimer(): void;
    clearTimer(): void;
}
