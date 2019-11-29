import { EventEmitter, TemplateRef } from '@angular/core';
export declare const ICON_CLASS_MAP: {
    [key: string]: string;
};
export declare class ElAlert {
    descriptionTmp: TemplateRef<any>;
    type: string;
    center: boolean;
    description: string;
    closable: boolean;
    closeText: string;
    showIcon: boolean;
    close: EventEmitter<Event>;
    visible: boolean;
    makeIconClass(): string;
    makeTitleClass(): string;
    clickHandle(event: Event): void;
}
