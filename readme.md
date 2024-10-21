# TimelyX Calendar

TimelyX is a powerful and customizable calendar solution, allowing for easy event management and recurrence handling. This README will guide you through how to use TimelyX, add events, and handle various calendar options.

[![](https://markdown-videos-api.jorgenkh.no/youtube/{video_id})](https://youtu.be/{video_id})


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Event Management](#event-management)
- [Methods](#methods)
  - [addEvent](#addevent)
  - [changeViewType](#changeviewtype)
  - [onDayClicked](#ondayclicked)
  - [onTEventClicked](#onteventclicked)
  - [onBordersChanged](#onborderschanged)
- [Event Recurrence](#event-recurrence)
- [Generated Fake Events](#generated-fake-events)

## Installation

To install and start using TimelyX, run this command in your project:

```bash
npm install timely-x
```

## Usage

### 1. Import and Initialize the Calendar

To start using TimelyX, you first need to import the necessary utilities and initialize the calendar. Here's how you can set up the calendar with basic options:

```js
import { TimelyX } from "timely-x";
import 'timely-x/style'

const calendar = new TimelyX({
    timezone: "America/New_York",  // Set your preferred timezone
    language: "en-US",             // Set the language/locale for the calendar
    view: 'week',                  // Default view ('week' or 'month')
    handleEvents: true,            // Enable event handling capabilities
    tHeaderOption: {               // Customize the calendar header display
        currentMonthFormat: "MMMM yyyy",  // Format for the displayed month (e.g., 'October 2024')
        dayFormat: "ccc"           // Format for day names (e.g., 'Mon', 'Tue')
    },
    tyxWeekOption: {               // Options specific to the week view
        timeSlotInterval: 30,      // Set the interval between time slots in minutes
        startHourOfDay: 4,         // Define the start hour of the day (e.g., 4 AM)
        endHourOfDay: 22,          // Define the end hour of the day (e.g., 10 PM)
        timeSlotHeight: 100         // Height of each time slot in pixels
    }
});

// Mount the calendar to a DOM element with the ID 'timely-calendar'
calendar.mount("#timely-calendar");
```


### 2. Adding Events to the Calendar

Adding events to the calendar is straightforward. You can add single or multiple events using the `addEvent` method. Each event must have attributes like title, start and end dates, location, description, color, and a list of attendees.

#### Single Event Example

Here's an example of adding a single event:

```js
calendar.addEvent({
    title: "Team Meeting",                    // Event title
    start_date: "2024-10-21T02:00:00Z",       // ISO format start date and time
    end_date: "2024-10-21T05:00:00Z",         // ISO format end date and time
    location: "Conference Room A",            // Event location
    description: "Discuss project updates and deadlines.",  // Event description
    allDay: false,                            // Specify if it's an all-day event
    color: "#FF0000",                         // Event color (hex code)
    attendees: ["alice@example.com", "bob@example.com"]  // List of attendee email addresses
});
```


### 2.1. Recurring Events
For recurring events, you can specify a recurrence rule using the iCal RRULE format. Here's how to add a recurring event that happens weekly on Tuesdays:

```js
calendar.addEvent({
    title: "Weekly Sync",
    start_date: "2024-10-20T14:00:00Z",
    end_date: "2024-10-20T15:00:00Z",
    location: "Conference Room A",
    description: "Weekly project sync",
    recurrence: "RRULE:FREQ=WEEKLY;WKST=MO;BYDAY=TU",  // RRULE format for weekly recurrence on Tuesdays
    allDay: false,
    color: "#89CFDE",
    attendees: ["alice@example.com", "bob@example.com"]
});

```
his allows you to manage repeating events easily, ensuring that your calendar remains up to date with your scheduling needs.


### 3. API Reference

#### TimelyX

The `TimelyX` class is the main interface for managing the calendar.

##### Constructor

```javascript
new TimelyX(options: {
    timezone: string,          // Timezone for the calendar
    language: string,         // Language for the calendar (e.g., "en-US")
    view: 'day' | 'week' | 'month', // Initial view type of the calendar
    handleEvents: boolean,    // Enable event handling
    tHeaderOption: {
        currentMonthFormat: string, // Format for the current month header
        dayFormat: string           // Format for the day header
    },
    tyxWeekOption: {
        timeSlotInterval: number, // Interval for time slots in minutes
        startHourOfDay: number,   // Start hour for the day view
        endHourOfDay: number,     // End hour for the day view
        timeSlotHeight: number     // Height of each time slot in pixels
    }
});
```

##### Methods

- **`mount(selector: string): void`**
    - Mounts the calendar to a DOM element specified by the selector.

- **`changeViewType(view: 'day' | 'week' | 'month'): void`**
    - Changes the current view of the calendar.

- **`addEvent(event: TEvent): void`**
    - Adds a single event to the calendar.
  
- **`addAllEvents(events: TEvent[]): void`**
    - Adds multiple events to the calendar at once.

##### Event Handlers

You can define handlers for specific calendar events:

- **`onDayClicked(date: DateTime, events: TEvent[]): void`**
    - Triggered when a day is clicked. Receives the clicked date and any events on that day.

- **`onTEventClicked(event: TEvent): void`**
    - Triggered when a specific event is clicked. Receives the clicked event.

- **`onBordersChanged(start: DateTime, end: DateTime): void`**
    - Triggered when the visible date range changes (e.g., navigating to a different week/month).
  
#### EventUtils

The `EventUtils` class provides utility methods for managing events.

##### Methods

- **`static getId(event: TEvent): string`**
    - Returns a unique ID for the given event. If the event has an `id`, it uses that; otherwise, it generates one based on event properties.

- **`static getEventMetadata(event: TEvent, date: DateTime, tyxCalendarWeekGridHeight: number, timeSlotInterval: Duration, slotHeight: number, timezone: string, language: string): Object`**
    - Computes metadata for displaying the event, including position and height percentages based on the calendar grid.

- **`static fakeEvents(): TEvent[]`**
    - Generates an array of fake events for testing purposes. This can be useful for demoing the calendar functionality.




