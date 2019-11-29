import { OnChanges, SimpleChanges } from '@angular/core';
import { ElForm } from './form';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
export declare class ElFormItem implements OnChanges {
    root: ElForm;
    private sanitizer;
    status: string;
    error: string;
    label: string;
    size: string;
    required: boolean;
    labelWidth: string;
    showMessage: boolean;
    inlineMessage: boolean;
    statusSubscriber: Array<(status: string) => void>;
    constructor(root: ElForm, sanitizer: DomSanitizer);
    showMessageEl(): boolean;
    isInlineMessage(): boolean;
    makeSize(): string;
    makeLabelStyle(): SafeStyle;
    makeContentStyle(): SafeStyle;
    ngOnChanges(changes: SimpleChanges): void;
}
