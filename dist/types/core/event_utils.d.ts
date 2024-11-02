import { DateTime, Duration } from "ts-luxon";
import { TyxEvent } from "./types/tyx_event.js";
export declare class EventUtils {
    static getId(event: TyxEvent): string;
    static getEventMetadata(event: TyxEvent, startDateOfDay: DateTime, tyxCalendarWeekGridHeight: number, timeSlotInterval: Duration, slotHeight: number, timezone: string, language: string): {
        eventStartPercentage: number;
        eventHeightPercentage: number;
        eventEndPercentage: number;
        start: DateTime;
        end: DateTime;
        start_date: string;
        end_date: string;
    };
    static getEventTimeFromPercentage(startPercentage: number, startDateOfDay: DateTime, tyxCalendarWeekGridHeight: number, timeSlotInterval: Duration, slotHeight: number): DateTime;
    protected static getRandomInt: (min: any, max: any) => any;
    static fakeEvents: () => {
        id: string;
        title: string;
        start_date: string;
        end_date: string;
        location: string;
        description: string;
        allDay: boolean;
        color: string;
        attendees: string[];
    }[];
}
