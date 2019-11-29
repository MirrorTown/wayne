import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class EMonthTable implements OnInit, OnChanges {
    showWeekNumber: boolean;
    model: number;
    disabledDate: any;
    modelChange: EventEmitter<number>;
    currentMonth: number;
    date: Date;
    monthRows: any[];
    clickHandle(i: number, k: number): void;
    isCurrentMonth(i: number, k: number): boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
