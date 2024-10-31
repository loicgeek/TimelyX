import { TimelyX,EventUtils } from './src';


const calendar = new TimelyX({
    language:"en-US",
    view:'month',
   // timezone:"UTC+1",
    handleEvents:true,
    tHeaderOption:{
        currentMonthFormat:"MMMM yyyy",
        dayFormat:"ccc"
    },
    tyxWeekOption:{
        timeSlotInterval:30,
       //  startHourOfDay:3,
        // endHourOfDay:22,
        timeSlotHeight:90
    },
    settings:{
        // smallView:true
    }
});

calendar.mount("#timely-calendar");

// setTimeout(() => {
//     calendar.changeViewType('month');
// }, 5000);

calendar.addEvent({
    title: "Team Meeting",
    start_date: "2024-10-21T02:00:00Z",
    end_date: "2024-10-21T05:00:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#FF0000",
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 2",
    start_date: "2024-10-20T11:00:00Z",
    end_date: "2024-10-20T12:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#00FF00",
    attendees: ["alice@example.com", "bob@example.com"]
});

calendar.addEvent({
    title: " Meeting 2",
    start_date: "2024-10-20T14:00:00Z",
    end_date: "2024-10-20T15:00:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    recurrence:"RRULE:FREQ=WEEKLY;WKST=MO;BYDAY=TU",
    allDay: false,
    color:"#89CFDE",
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 19",
    start_date: "2024-10-19T11:00:00Z",
    end_date: "2024-10-19T12:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#0000FF",
    attendees: ["alice@example.com", "bob@example.com"]
});

calendar.addEvent({
    title: "Team Meeting 0933",
    start_date: "2024-10-19T11:00:00Z",
    end_date: "2024-10-19T12:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#FFFF00",
    attendees: ["alice@example.com", "bob@example.com"]
});

calendar.addEvent({
    title: "Team Meeting 123",
    start_date: "2024-10-19T12:00:00Z",
    end_date: "2024-10-19T13:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#FF00FF",
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 99",
    start_date: "2024-10-19T13:00:00Z",
    end_date: "2024-10-19T13:30:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#900CF0",
    attendees: ["alice@example.com", "bob@example.com"]
});
calendar.addEvent({
    title: "Team Meeting 56",
    start_date: "2024-10-19T13:20:00Z",
    end_date: "2024-10-19T14:20:00Z",
    location: "Conference Room A",
    description: "Discuss project updates and deadlines.",
    allDay: false,
    color:"#89CFF0",
    attendees: ["alice@example.com", "bob@example.com"]
});


const eventsGenerated  = EventUtils.fakeEvents();
// calendar.addAllEvents(events);

for (let i = 0; i < eventsGenerated.length; i++) {
    const element = eventsGenerated[i];
    calendar.addEvent(element);  
}



calendar.onDayClicked = (date:any, events:any) => {
   // console.log(date, events);
}
calendar.onTEventClicked = (event:any) => {
   // console.log(event);
}
calendar.onBordersChanged = (start:any,end:any) => {
  //  console.log(start, end);
}
calendar.onTEventUpdated = (event)=>{
    console.log("onTEventUpdated",event);
    
}


