import { AfterContentInit, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { WindowWrapper } from '../shared/services';
export declare type Shape = {
    width: number;
    height: number;
};
export declare class ElTooltip implements AfterContentInit {
    private renderer;
    private el;
    private window;
    disabled: boolean;
    elDisabled: boolean;
    watch: boolean;
    placement: string;
    popperClass: string;
    effect: string;
    visibleArrow: boolean;
    popperContent: ElementRef;
    tip: TemplateRef<any>;
    xPlacement: string;
    showPopper: boolean;
    cache: any;
    tipElementShape: Shape;
    constructor(renderer: Renderer2, el: ElementRef, window: WindowWrapper);
    getPosition(hostRect: any, selfRect: any): void;
    setPopoerPositionAndShow(): void;
    bindEvent(host: HTMLElement): void;
    update(): void;
    ngAfterContentInit(): void;
}
