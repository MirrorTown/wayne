import { OnInit, EventEmitter } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
export declare class ElTag implements OnInit {
    private sanitizer;
    type: string;
    closable: boolean;
    hit: boolean;
    color: string;
    size: string;
    closeTransition: boolean;
    closeEmitter: EventEmitter<any>;
    tagStyles: SafeStyle;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
}
