import { EventEmitter } from '@angular/core';
export declare class ElMenu {
    mode: string;
    theme: string;
    model: string;
    nativeClass: string;
    defaultOpeneds: string[];
    uniqueOpened: boolean;
    menuTrigger: string;
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
    modelChange: EventEmitter<any>;
    openedMenus: string[];
    showBorderIndex: string;
    openMenu(index: string): void;
    closeMenu(index: string): void;
    selectHandle(index: string, path?: string): void;
    hoverBackgroundColor(): string;
    private hexToRGB();
}
