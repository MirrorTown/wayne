import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare type DateRowItem = {
    day: number;
    monthOffset: number;
};
export declare type DateRow = DateRowItem[];
export declare class ElDateTable implements OnInit, OnChanges {
    model: number;
    disabledDate: any;
    modelChange: EventEmitter<any>;
    weeks: string[];
    tableRows: DateRow[];
    targetDay: number;
    targetMonthOffset: number;
    date: Date;
    today: number;
    currentMonthOffset: number;
    static BuildMonthStartRow(first: number, lastCount: number): DateRowItem[];
    isToday(item: DateRowItem): boolean;
    isTargetDay(item: DateRowItem): boolean;
    clickHandle(item: DateRowItem): void;
    getRows(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
