import { WidthItem } from '../table.interface';
export declare class ElTableHeader {
    model: any[];
    layout: any;
    border: boolean;
    height: string | number;
    center: boolean;
    columnsWidth: WidthItem[];
    makeClasses(th: any): string;
    getRowspan(td: any): number;
    getColspan(th: any): number;
}
