import { EventEmitter, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ElCheckboxGroup } from './checkbox-group';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
export declare class ElCheckboxButton implements OnInit, AfterViewInit {
    private hostGroup;
    private el;
    private domSanitizer;
    content: any;
    disabled: boolean;
    elDisabled: boolean;
    label: string;
    model: any;
    indeterminate: boolean;
    checked: boolean;
    name: string;
    trueLabel: string | number;
    modelChange: EventEmitter<any>;
    labels: any[];
    parentIsGroup: boolean;
    isFocus: boolean;
    showLabel: boolean;
    size: string;
    constructor(hostGroup: ElCheckboxGroup, el: ElementRef, domSanitizer: DomSanitizer);
    activeStyle(): SafeStyle;
    isChecked(): boolean;
    changeHandle(t: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
