import { EventEmitter } from '@angular/core';
export declare class ElCarouselProps {
    height: string;
    trigger: string;
    indicatorTrigger: string;
    autoplay: boolean;
    interval: number;
    initialIndex: number;
    indicatorPosition: string;
    arrow: string;
    type: string;
    model: number;
    modelChange: EventEmitter<any>;
}
