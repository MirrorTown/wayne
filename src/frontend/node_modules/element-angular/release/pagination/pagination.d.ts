import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ElPaginationProps } from './pagination.props';
export declare class ElPagination extends ElPaginationProps implements OnInit, OnChanges {
    showPager: boolean;
    showPrev: boolean;
    showNext: boolean;
    showTotal: boolean;
    showSize: boolean;
    showJumper: boolean;
    static showLayout(ElName: string, layout: string[]): boolean;
    constructor();
    nextHandle(step: number): void;
    updatePageSize(nextPageSize: number): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    private updateLayout();
}
