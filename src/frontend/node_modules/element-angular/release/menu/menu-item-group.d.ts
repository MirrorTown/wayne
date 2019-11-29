import { OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ElMenu } from './menu';
export declare class ElMenuItemGroup implements OnInit {
    rootMenu: ElMenu;
    private sanitizer;
    titleTmp: TemplateRef<any>;
    title: string;
    constructor(rootMenu: ElMenu, sanitizer: DomSanitizer);
    paddingStyle(): SafeStyle;
    ngOnInit(): void;
}
