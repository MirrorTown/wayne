import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Value } from './dropdown.item';
import { ElDropdownProps } from './dropdown.props';
import { DocumentWrapper } from '../shared/services';
export declare class ElDropdown extends ElDropdownProps implements OnDestroy, AfterViewInit {
    private renderer;
    private sanitizer;
    private document;
    private el;
    list: any;
    showMenu: boolean;
    timer: any;
    slideToBottom: boolean;
    listHeight: number;
    globalListenFunc: Function;
    globalScrollFunc: Function;
    mouseleave: () => void;
    mouseenter: () => void;
    constructor(renderer: Renderer2, sanitizer: DomSanitizer, document: DocumentWrapper, el: ElementRef);
    openMenu(event?: Event): void;
    closeMenu(): void;
    selectHandle(model: Value): void;
    makeListStyles(): SafeStyle;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
