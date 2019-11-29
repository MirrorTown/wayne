import { TableColumnDataItem } from '../table.interface';
export declare class ElTableFormat {
    static getCSSValue(val: string | number): number;
    formatRowData(tableRows: TableColumnDataItem[][]): any;
}
