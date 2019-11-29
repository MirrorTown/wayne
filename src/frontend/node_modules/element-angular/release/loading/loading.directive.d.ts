import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DocumentWrapper, WindowWrapper } from '../shared/services';
export declare class ElLoadingDirective implements OnInit {
    private el;
    private renderer;
    private document;
    private window;
    text: string;
    lock: boolean;
    customClass: string;
    fullScreen: boolean;
    elLoadingTop: string;
    showLoading: boolean;
    cacheElement: HTMLElement;
    cacheOverflow: string;
    private visible;
    constructor(el: ElementRef, renderer: Renderer2, document: DocumentWrapper, window: WindowWrapper);
    toggleLock(status?: boolean): void;
    makeHtml(): string;
    ngOnInit(): void;
}
