import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElMenu } from './menu';
import { ElSubmenu } from './submenu';
import { Router } from '@angular/router';
export declare class ElMenuItem implements OnInit {
    rootMenu: ElMenu;
    private subMenu;
    private sanitizer;
    private el;
    private router;
    disabled: boolean;
    elDisabled: boolean;
    index: string;
    title: string;
    to: string;
    extras?: any;
    private inSubmenu;
    constructor(rootMenu: ElMenu, subMenu: ElSubmenu, sanitizer: DomSanitizer, el: ElementRef, router: Router);
    clickHandle(): void;
    borderColor(): string;
    color(): string;
    ngOnInit(): void;
}
