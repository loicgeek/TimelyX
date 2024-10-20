import { DateTime, Duration } from "ts-luxon";
import { TEvent } from "./types/t_event";



export class EventUtils{
    static getId(event:TEvent){
        return Object.entries(event)
                .map(([_, value]) => {
                 const sanitizedValue = String(value).replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters from the value
                    return `${sanitizedValue}`;
                })
                .join('');
    }
    static getEventMetadata(event:TEvent,
        date:DateTime,
        tyxCalendarWeekGridHeight: number, 
        timeSlotInterval: Duration,
        slotHeight: number,
        timezone: string, language: string
    ){
        const start = DateTime.fromISO(event.start_date).setZone(timezone).setLocale(language);
        const end = DateTime.fromISO(event.end_date).setZone(timezone).setLocale(language);

        // compute percentage from the top of the column, event will be displayed by absolute to value
        const totalMinutesStart = start.diff(date.startOf("day"),'minutes').minutes;
        const numberOfSlotsForEventStart = (totalMinutesStart / (timeSlotInterval.as("minutes")));
        const eventYPosition = slotHeight * numberOfSlotsForEventStart; 
        const eventHeight = slotHeight * (end.diff(start,'minutes').minutes / (timeSlotInterval.as("minutes")));
        const eventStartPercentage = eventYPosition*100/tyxCalendarWeekGridHeight;
        const eventHeightPercentage = eventHeight*100/tyxCalendarWeekGridHeight;
        const eventEndPercentage = eventStartPercentage + eventHeightPercentage;
        return {
            eventStartPercentage,
            eventHeightPercentage,
            eventEndPercentage,
            start,
            end
        }
    }
}