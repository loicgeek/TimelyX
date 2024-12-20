import { DateTime } from 'ts-luxon';
import { TyxEvent } from './types/tyx_event';
import { TyxHeaderOption } from './types/tyx_header_option';
import { TyxWeekOption } from './types/tyx_week_option';
import "../assets/css/output.css";
import { TyxView } from './types/tyx_view';
import { Resizer } from './plugins/resizer';
interface CalendarSettings {
    smallView?: boolean;
    handleEvents?: boolean;
}
export declare class TimelyX {
    protected resizer: Resizer;
    protected instance?: HTMLElement;
    timezone: string;
    private selectedDate?;
    private startDate;
    private endDate;
    private language;
    private disableDefaultEventClick;
    private daysOfWeek;
    private events;
    private eventInstances;
    private view;
    private tHeaderOption;
    private tyxWeekOption;
    private settings?;
    isMobile: boolean;
    onDayClicked?: (date: DateTime, events: TyxEvent[]) => void;
    onTEventClicked?: (event: TyxEvent) => void;
    onTEventUpdated?: (event: TyxEvent) => void;
    onBordersChanged?: (start: DateTime, end: DateTime) => void;
    constructor({ timezone, selectedDate, language, view, // Default view,
    tHeaderOption, tyxWeekOption, disableDefaultEventClick, settings, }?: {
        timezone?: string | undefined;
        selectedDate?: string | undefined;
        language?: string | undefined;
        view?: string | undefined;
        tHeaderOption?: TyxHeaderOption | undefined;
        tyxWeekOption?: TyxWeekOption | undefined;
        disableDefaultEventClick?: boolean | undefined;
        settings?: CalendarSettings | undefined;
    });
    private adjustGridClass;
    mount(selectorString: string): void;
    changeViewType(view: TyxView): void;
    previous(): void;
    next(): void;
    protected _changeMonth(delta: number): void;
    gotoDate(date: DateTime, delta?: number): void;
    private _render;
    private _createHeader;
    private _renderMonthView;
    private _renderEventLists;
    private _removeViewClass;
    private _renderWeekView;
    private _renderDayHeaders;
    private _renderDayView;
    private _createDateCell;
    private _getDayHeaders;
    private _getDatesForMonth;
    private _getDatesForWeek;
    private _handleDateClick;
    private _handleTEventClick;
    private _populateEventDetails;
    private _updateEventInstances;
    addEvent(event: TyxEvent): void;
    private addEventInstance;
    addAllEvents(events: TyxEvent[]): void;
    showEventModal(event: TyxEvent, target: HTMLElement): void;
    closeModal(): void;
}
export {};
