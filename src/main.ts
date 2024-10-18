import { TimelyX } from "./core/timely_x";
import { TEvent } from "./core/types/t_event";


const events : TEvent[] = [
    {
        title: "Event 1",
        start_date: "2022-01-01",
        end_date: "2022-01-01",
    },
]

const calendar = new TimelyX({
    timezone:"America/New_York",
    language:"en",
    view:'month',
    handleEvents:true,
    tHeaderOption:{
        currentMonthFormat:"MMMM yyyy",
        dayFormat:"ccc"
    }
});
calendar.mount("#timely-calendar");

calendar.addEvent({
    title: "Team Meeting",
    start_date: "2024-10-21T02:00:00Z",
    end_date: "2024-10-21T05:00:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
   
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 2",
    start_date: "2024-10-20T11:00:00Z",
    end_date: "2024-10-20T12:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 2",
    start_date: "2024-10-20T15:00:00Z",
    end_date: "2024-10-20T16:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    recurrence:"RRULE:FREQ=WEEKLY;WKST=MO;BYDAY=TU",
    allDay: false,
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 19",
    start_date: "2024-10-19T11:00:00Z",
    end_date: "2024-10-19T12:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    attendees: ["alice@example.com", "bob@example.com"]
});

calendar.addEvent({
    title: "Team Meeting 19",
    start_date: "2024-12-19T11:00:00Z",
    end_date: "2024-12-19T12:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    attendees: ["alice@example.com", "bob@example.com"]
});

calendar.addEvent({
    title: "Team Meeting 19",
    start_date: "2024-12-19T12:00:00Z",
    end_date: "2024-12-19T13:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    attendees: ["alice@example.com", "bob@example.com"]
});

calendar.onDayClicked = (date, events) => {
    //console.log(date, events);
}
calendar.onTEventClicked = (event) => {
    
}
console.log(calendar);

