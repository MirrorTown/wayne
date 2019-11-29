import { ElementRef, OnInit } from '@angular/core';
export declare const typeMap: any;
export declare class ElNotificationContainer implements OnInit {
    private el;
    id: string;
    height: number;
    offset: number;
    type: string;
    duration: number;
    iconClass: string;
    customClass: string;
    zIndex: number;
    position: string;
    title: string;
    message: string;
    showBox: boolean;
    timer: any;
    horizontalDirection: string;
    onClose: Function;
    onDestroy: Function;
    constructor(el: ElementRef);
    makeClass(): string;
    setContent(message: string, title?: string): void;
    show(): void;
    close(): void;
    startTimer(): void;
    clearTimer(): void;
    ngOnInit(): void;
}
