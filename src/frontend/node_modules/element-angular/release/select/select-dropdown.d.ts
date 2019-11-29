import { OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ElSelect } from './select';
export declare class ElSelectDropdown implements OnInit {
    private rootSelect;
    private sanitizer;
    isActived: boolean;
    multiple: boolean;
    popperClass: string;
    dropdownStyles: SafeStyle;
    constructor(rootSelect: ElSelect, sanitizer: DomSanitizer);
    ngOnInit(): void;
}
