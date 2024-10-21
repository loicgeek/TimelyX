import { DateTime, Duration } from "ts-luxon";
import { TEvent } from "./types/t_event.js";
export declare class EventUtils {
    static getId(event: TEvent): string;
    static getEventMetadata(event: TEvent, date: DateTime, tyxCalendarWeekGridHeight: number, timeSlotInterval: Duration, slotHeight: number, timezone: string, language: string): {
        eventStartPercentage: number;
        eventHeightPercentage: number;
        eventEndPercentage: number;
        start: DateTime;
        end: DateTime;
    };
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
