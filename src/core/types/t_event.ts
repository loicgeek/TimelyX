export interface TEvent{
    id?:string,
    // The title of the event
    title: string,

    ///the start date. it is ISO 8601 Format (Standard)
    start_date: string,

    //the end date. it is ISO 8601 Format (Standard)
    end_date: string,

    //the location of the event
    location?:string,

    //the description of the event
    description?:string,

    // whether or not the event is all day
    allDay?: boolean,

    // the recurrence of the event, it is a rrule string
    recurrence?:string,

    // used to handle resource events
    attendees?:string[],

    // color of event
    color?:string
}