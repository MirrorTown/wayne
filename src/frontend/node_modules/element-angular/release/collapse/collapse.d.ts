import { AfterViewInit, EventEmitter } from '@angular/core';
export declare type ModelValue = string | number;
export declare class ElCollapse implements AfterViewInit {
    modelValue: ModelValue[];
    subscriber: Function[];
    accordion: boolean;
    model: ModelValue[];
    modelChange: EventEmitter<ModelValue[]>;
    updateModel(value: ModelValue): void;
    ngAfterViewInit(): void;
    private updateSubscriber();
}
