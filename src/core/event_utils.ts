import { DateTime, Duration } from "ts-luxon";
import { TEvent } from "./types/t_event";



export class EventUtils{
    static getId(event:TEvent){
        return event.id?? Object.entries(event)
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
    protected  static  getRandomInt = (min:any, max:any)=> {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      static fakeEvents  =  ()=> {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
        const titles = ["Team Meeting", "Client Call", "Code Review", "Marketing Strategy", "Design Sync"];
        const locations = ["Conference Room A", "Zoom", "Office 1", "Office 2", "Online"];
        const descriptions = [
          "Discuss project updates and deadlines.",
          "Meet with the client to discuss requirements.",
          "Review the recent code changes and PRs.",
          "Plan the marketing strategy for Q4.",
          "Sync with the design team on new features."
        ];
        const attendees = [
          ["alice@example.com", "bob@example.com"],
          ["john@example.com", "jane@example.com"],
          ["mike@example.com", "sara@example.com"],
          ["tom@example.com", "lisa@example.com"],
          ["nina@example.com", "peter@example.com"]
        ];
      
        const events = [];
        const now = new Date();
      
        for (let i = 0; i < 13; i++) {
          const randomDay = this.getRandomInt(1, 7); // Pick a random day of the current week
          const startHour = this.getRandomInt(8, 18); // Random hour between 8 AM and 6 PM
          const duration = this.getRandomInt(1, 3); // Random event duration between 1 and 3 hours
      
          const startDate = new Date(now);
          startDate.setDate(now.getDate() + randomDay - now.getDay()); // Set to a random day of the week
          startDate.setHours(startHour, 0, 0, 0);
      
          const endDate = new Date(startDate);
          endDate.setHours(startHour + duration);
      
          const event = {
            id:`${DateTime.now().toMillis().toString()}-${i}`,
            title: titles[this.getRandomInt(0, titles.length)],
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            location: locations[this.getRandomInt(0, locations.length)],
            description: descriptions[this.getRandomInt(0, descriptions.length)],
            allDay: false,
            color: colors[this.getRandomInt(0, colors.length)],
            attendees: attendees[this.getRandomInt(0, attendees.length)],
          };
      
          events.push(event);
        }
      
        return events;
      }
}



