import { EventEmitter, OnInit } from '@angular/core';
export declare type Option = {
    value: number;
    label: string;
};
export declare class ElPaginationSize implements OnInit {
    model: number;
    sizes: number[];
    modelChange: EventEmitter<number>;
    options: Option[];
    ngOnInit(): void;
}
