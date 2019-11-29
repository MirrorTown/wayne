import { EventEmitter } from '@angular/core';
export declare class ElDialogProps {
    title: string;
    width: string;
    center: boolean;
    top: string;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    lockScroll: boolean;
    customClass: string;
    showClose: boolean;
    beforeClose: ((done: Function) => {});
    dialogZindex: number;
    modalZindex: number;
    visible: boolean;
    visibleChange: EventEmitter<boolean>;
}
