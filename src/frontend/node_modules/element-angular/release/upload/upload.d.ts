import { ElementRef, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElUploadProps } from './upload.props';
import { ElUploadRequest } from './upload.request';
import { CommonFile } from './upload.interface';
export declare class ElUpload extends ElUploadProps implements OnInit {
    private request;
    private sanitizer;
    trigger: TemplateRef<any>;
    dragger: TemplateRef<any>;
    tip: TemplateRef<any>;
    input: ElementRef;
    files: CommonFile[];
    static generateID(): string;
    static updatePercentage(response: any): number;
    constructor(request: ElUploadRequest, sanitizer: DomSanitizer);
    clickHandle(): void;
    changeHandle(event: Event): void;
    upload(file: CommonFile): void;
    removeHandle(file: CommonFile): void;
    updateFile(file: CommonFile): void;
    ngOnInit(): void;
}
