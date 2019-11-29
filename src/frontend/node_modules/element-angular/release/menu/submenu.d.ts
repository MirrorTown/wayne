import { OnInit, TemplateRef } from '@angular/core';
import { ElMenu } from './menu';
export declare class ElSubmenu implements OnInit {
    rootMenu: ElMenu;
    titleTmp: TemplateRef<any>;
    index: string;
    title: string;
    timer: any;
    opened: boolean;
    active: boolean;
    subActive: boolean;
    dontUserHover: boolean;
    constructor(rootMenu: ElMenu);
    mouseenterHandle(): void;
    mouseleaveHandle(): void;
    selectHandle(path: string): void;
    updateOpened(): void;
    clickHandle(): void;
    borderColor(): string;
    ngOnInit(): void;
}
