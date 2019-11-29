export declare class DateFormat {
    static checkedDate(date: number | Date): Date;
    static getDayCountOfMonth(year: number, month: number): number;
    static getFirstDayOfMonth(date: number | Date): number;
    static getCurrentMonthOffset(targetDate: number | Date): number | null;
    static moment(input: any, format: string): string;
    constructor();
    getTime(input?: any): number;
}
