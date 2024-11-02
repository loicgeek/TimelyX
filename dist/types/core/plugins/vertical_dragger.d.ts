export declare class VerticalDragger {
    isDragging: boolean;
    startY: number | null;
    initialTop: number | null;
    initialTopPercentage: number | null;
    constructor();
    listen(element: HTMLElement, tyxCalendarWeekGridHeight: number, onTranslated: (e: {}) => void): void;
}
