import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class ElYearTable implements OnInit, OnChanges {
    showWeekNumber: boolean;
    model: number;
    disabledDate: any;
    modelChange: EventEmitter<number>;
    date: Date;
    yearRows: number[][];
    currentYear: number;
    clickHandle(year: number): void;
    updateYearRow(currentYear: number): number[][];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
