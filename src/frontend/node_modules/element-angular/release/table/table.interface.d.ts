import { TemplateRef } from '@angular/core';
export interface TableSelectEvent {
    selection: any;
    row?: number;
}
export interface TableColumn {
    modelKey: string;
    label: string;
    width: string | number;
    slotClick?: Function;
    deep: number;
    level: number;
    childCount: number;
    index?: number;
    slot?: TemplateRef<any>;
    _renderHTML?: boolean;
}
export declare type TableColumnDataItem = {
    value: string | number;
    index: number;
};
export declare type ElTableSlotEvent = Element & {
    index: number;
    rowData: any;
    destroy: () => void;
    event?: Event;
};
export declare type OrderMap = {
    [key: string]: any;
};
export declare type ModelWithIndexDataItem = OrderMap & {
    value: string | number;
    index: number;
};
export declare type WidthItem = {
    auto: boolean;
    width: number;
};
