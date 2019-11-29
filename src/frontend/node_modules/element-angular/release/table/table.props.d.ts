import { EventEmitter } from '@angular/core';
import { TableSelectEvent, ElTableSlotEvent } from './table.interface';
export declare class ElTableProps {
    height: string | number;
    placeholder: string;
    stripe: boolean;
    border: boolean;
    scrollX: boolean;
    showHeader: boolean;
    center: string;
    rowClassName: (userRow: any, index: number) => string;
    model: any;
    modelChange: EventEmitter<any>;
    select: EventEmitter<TableSelectEvent>;
    selectAll: EventEmitter<TableSelectEvent>;
    selectionChange: EventEmitter<TableSelectEvent>;
    cellMouseEnter: EventEmitter<Event>;
    cellMouseLeave: EventEmitter<Event>;
    cellClick: EventEmitter<ElTableSlotEvent>;
    cellDblclick: EventEmitter<ElTableSlotEvent>;
}
