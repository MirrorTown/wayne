import { TemplateRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
export declare class ElCard {
    private sanitizer;
    header: TemplateRef<any>;
    headerStr: string;
    bodyStyle: string;
    constructor(sanitizer: DomSanitizer);
    makeSafebodyStyle(): SafeStyle;
}
