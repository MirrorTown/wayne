import { OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { DocumentWrapper, WindowWrapper } from '../shared/services';
import { ElDialogProps } from './dialog.props';
export declare class ElDialog extends ElDialogProps implements OnInit, OnChanges, OnDestroy {
    private sanitizer;
    private renderer;
    private window;
    private document;
    titleTmp: TemplateRef<any>;
    footerTmp: TemplateRef<any>;
    model: string | number;
    cacheOverflow: string;
    cacheModalElement: Element;
    globalListenFunc: Function;
    constructor(sanitizer: DomSanitizer, renderer: Renderer2, window: WindowWrapper, document: DocumentWrapper);
    makeDialogStyles(): SafeStyle;
    closeHandler(): void;
    wrapperClickHandle(): void;
    updateWithVisibleChange(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
