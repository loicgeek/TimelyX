export declare class Resizer {
    cornerThreshold: number;
    isResizing: boolean;
    currentCorner: string | null;
    constructor({ cornerThreshold }?: {
        cornerThreshold?: number | undefined;
    });
    listen(element: HTMLElement, onSizedChangePercentage: (e: {}) => void): void;
}
