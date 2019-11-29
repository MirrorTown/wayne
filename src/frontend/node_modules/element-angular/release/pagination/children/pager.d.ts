import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class ElPaginationPager implements OnInit, OnChanges {
    current: number;
    count: number;
    next: EventEmitter<number>;
    pagers: number[];
    showPrevMore: boolean;
    showNextMore: boolean;
    quicknextIconClass: string;
    quickprevIconClass: string;
    static pagerGenerator(minValue: number): number[];
    /**
     * Always show 5 numbers, excluding head and foot
     * like: 1 ... < 5, 6, 7, 8, 9 > ... 100
     *
     * jump page button is [showPrevMore] and [showNextMore]
     *
     * @return number[], like: [2, 3, 4, 5, 6]
     *
     */
    makePagers(current: number, count: number): number[];
    setMoreBtn(prev: boolean, next: boolean): void;
    clickHandle(to: number): void;
    jumpHandle(step: number): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
