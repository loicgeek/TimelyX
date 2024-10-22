import { DateTime, Duration } from 'ts-luxon';
import { TyxEvent } from './types/tyx_event';
import { TyxHeaderOption } from './types/tyx_header_option';
import { rrulestr } from 'rrule';
import { ColorUtils } from './color_utils';
import { EventUtils } from './event_utils';
import { TyxWeekOption } from './types/tyx_week_option';
import "../assets/css/output.css"
import { TyxView } from './types/tyx_view';



export class TimelyX {
   protected instance?: HTMLElement;
    timezone: string;
    private selectedDate?: DateTime;
    private startDate: DateTime;
    private  endDate: DateTime;
    private language: string;
    private daysOfWeek: Record<string,any>[];
    private  events: { [key: string]: TyxEvent[] }; // Event storage
    private eventInstances: { [key: string]: TyxEvent[] }; // Event storage
    private view: TyxView; // Current view
    private tHeaderOption: TyxHeaderOption;
    private tyxWeekOption: TyxWeekOption;
    private handleEvents:boolean;
    isMobile = window.matchMedia("(max-width: 600px)").matches;
    onDayClicked?: (date: DateTime, events: TyxEvent[]) => void;
    onTEventClicked?: (event: TyxEvent) => void;
    onBordersChanged?: (start: DateTime,end: DateTime) => void;


    constructor({
        timezone = DateTime.local().zoneName,
        selectedDate = DateTime.local().toISODate(),
        language = navigator.language || 'en-US',
        view = 'month', // Default view,
        tHeaderOption = {
           
        } as TyxHeaderOption,
        tyxWeekOption = {
           
        } as TyxWeekOption,
        handleEvents = false
    } = {}) {
        this.timezone = timezone;
        this.language = language;
        this.handleEvents = handleEvents;
        
        this.events = {};
        this.eventInstances = {};
        this.view = view as TyxView;
        this.tHeaderOption = {
             currentMonthFormat:'MMMM yyyy',
            dayFormat:'ccc',
            ...tHeaderOption
        };
        this.tyxWeekOption = {
            timeSlotInterval:60,
            startHourOfDay:0,
            endHourOfDay:24,
            timeSlotHeight:100,
            ...tyxWeekOption
        };
        this.selectedDate = DateTime.fromISO(selectedDate).setZone(this.timezone);

        this.startDate = this.selectedDate.startOf(view.toString() as 'month' | 'week' | 'day');
        this.endDate = this.selectedDate.endOf(view.toString() as 'month' | 'week' | 'day');
        this.daysOfWeek = this._getDayHeaders();
        
    }

    private adjustGridClass() {
        const calendarElement = document.querySelector('.calendar');        
        if (window.innerWidth <= 600) {
            this.isMobile = true;
            calendarElement?.classList.add('small-grid');
            calendarElement?.classList.remove('large-grid');
        } else {
            this.isMobile = false;
            calendarElement?.classList.add('large-grid');
            calendarElement?.classList.remove('small-grid');
        }
    }
    
    

    mount(selectorString: string) {
        this.instance = document.querySelector(selectorString) as HTMLElement;
        this.instance.classList.add("calendar");
        this._render();

    // Listen for window resize
        window.addEventListener('resize', this.adjustGridClass);
        this.adjustGridClass();
    }
    changeViewType(view: TyxView){
        this.view = view;
        this._renderDayHeaders();
        this._render();
    }
    previous(){
        this._changeMonth(-1);
    }
    next(){
        this._changeMonth(1);
    }

    protected _changeMonth(delta: number) {
        if (this.view === 'month') {
            this.startDate = this.startDate!.plus({ months: delta });
            this.endDate = this.startDate.endOf('month');

        } else if (this.view === 'week') {
            this.startDate = this.startDate!.plus({ weeks: delta });
            this.endDate = this.startDate.endOf('week');
        }
        this.selectedDate = undefined;
        this.onBordersChanged?.call(this, this.startDate,this.endDate);
        this._render(delta);
    }
    gotoDate(date: DateTime, delta?: number) {
        this.selectedDate = date;
        this.startDate = date.startOf(this.view);
        this.endDate = date.endOf(this.view);
        this.onBordersChanged?.call(this, this.startDate,this.endDate);
        this._render(delta);
    }

    private _render(delta?: number) {
        
        // update events list with all recurring event
        this._updateEventInstances();
        
        // Clear previous content
        this.instance!.innerHTML = '';
            
        // Create calendar header
        const headerDiv = this._createHeader();
        this.instance?.appendChild(headerDiv);

        const calendarContent = document.createElement('div');
        calendarContent.className = 'calendar-content';
        this.instance?.appendChild(calendarContent);

        // Render the calendar grid
        const gridDiv = document.createElement('div');
        gridDiv.className = 'calendar-grid';

        if (this.view === 'month') {
            this._renderMonthView(gridDiv);
        } else if (this.view === 'week') {
            this._renderDayHeaders();
            this._renderWeekView(gridDiv);
        } else if (this.view === 'day') {
            this._renderDayView(gridDiv);
        }
        gridDiv.classList.remove('fade-in');
        gridDiv.classList.add('fade-out');
       
        gridDiv.classList.add((delta && delta<0) ? 'direction-left' : 'direction-right');
        
        calendarContent.appendChild(gridDiv);

        this.instance?.appendChild(calendarContent);

        this._renderEventLists()

        // render events view
        setTimeout(() => {
            gridDiv.classList.remove('fade-out');
            gridDiv.classList.add('fade-in');
            this.adjustGridClass();
        }, 100); // Timing for fade-out
    }
    

    private _createHeader() {
        const headerDiv = document.createElement('header');
        headerDiv.className = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.className = 'prev-month';
        prevButton.innerText = '◀';
        prevButton.addEventListener('click', () => this._changeMonth(-1));

        const currentMonth = document.createElement('h2');
        currentMonth.className = 'current-month';
        currentMonth.innerText = this.view === 'month'
            ? this.startDate! .setLocale(this.language).toFormat(this.tHeaderOption!.currentMonthFormat!)
            : `${this.startDate!.startOf('week').toLocaleString(DateTime.DATE_FULL)} - ${this.startDate.endOf('week').toLocaleString(DateTime.DATE_FULL)}`;

        const nextButton = document.createElement('button');
        nextButton.className = 'next-month';
        nextButton.innerText = '▶';
        nextButton.addEventListener('click', () => this._changeMonth(1));

        headerDiv.appendChild(prevButton);
        headerDiv.appendChild(currentMonth);
        headerDiv.appendChild(nextButton);
        return headerDiv;
    }

    private _renderMonthView(gridDiv: HTMLElement) {

        this._removeViewClass();
        document.querySelector('.calendar')?.classList.add('month');
        // Create a container for the week headers
        const weekHeaderDiv = document.createElement('div');
        weekHeaderDiv.className = 'month-header';

        this.daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.innerText = day['dayName'];
            weekHeaderDiv.appendChild(dayHeader);
        });

        gridDiv.appendChild(weekHeaderDiv); // Append week headers to grid

        const dates = this._getDatesForMonth();
        const weekDiv = document.createElement('div');
        weekDiv.className = 'month-grid'; // Create a div for week grid to hold the dates

        dates.forEach(({ date, isPrevious, isNext }) => {
            const dateCell = this._createDateCell({ date, isPrevious, isNext });
            weekDiv.appendChild(dateCell);
        });

        gridDiv.appendChild(weekDiv); // Append week grid to main grid

    }

    private _renderEventLists() {
        if(this.view!="month" || this.handleEvents==false) return
             //append events list view
        const eventListDiv = document.querySelector('.event-list') as HTMLElement || document.createElement('div');
        eventListDiv.innerHTML = '';
        eventListDiv.className = 'event-list';

        eventListDiv.childNodes.forEach(child => child.remove());

        if(this.selectedDate==undefined) return
        const eventDate =this.selectedDate.toISODate();
        const eventList = this.eventInstances[eventDate] || []
        eventList.forEach(tevent => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';

            let color = tevent.color?? getComputedStyle(document.body).getPropertyValue('--tyx-primary-color')
            eventItem.style.backgroundColor = ColorUtils.generateEventBgColor(color);
            eventItem.style.borderLeftColor =ColorUtils.generateEventBorderColor(color);
            eventItem.style.color =ColorUtils.generateEventTitleColor(color);

            const eventTitle = document.createElement('div');
            eventTitle.className = 'event-title';
            eventTitle.innerText = `${tevent.title}${tevent.recurrence?'🔁':''}`;
            eventItem.appendChild(eventTitle);

            const eventTime = document.createElement('div');
            eventTime.className = 'event-time';
            eventTime.innerText = `${DateTime.fromISO(tevent.start_date).setZone(this.timezone).setLocale(this.language).toFormat('HH:mm a')} - ${DateTime.fromISO(tevent.end_date).setZone(this.timezone).setLocale(this.language).toFormat('HH:mm a')}`;
            eventItem.appendChild(eventTime);
            eventItem.addEventListener('click', () => this._handleTEventClick(tevent));
            eventListDiv.appendChild(eventItem);
        })
        const calendarContent = document.querySelector('.calendar-content') as HTMLElement
        calendarContent.appendChild(eventListDiv);
    }

    private _removeViewClass(){
        document.querySelector('.calendar')?.classList.remove('week');
        document.querySelector('.calendar')?.classList.remove('month');
    }

    private _renderWeekView(gridDiv: HTMLElement) {

        this._removeViewClass();
        document.querySelector('.calendar')?.classList.add('week');
        const weekHeaderDiv = document.createElement('div');
        weekHeaderDiv.className = 'tyx__week-header';

        this.daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'tyx__week-day-header';

            const dayName = document.createElement('div');
            dayName.className = 'tyx__week-day-name';
            dayName.innerText = day['dayName'];
            dayHeader.appendChild(dayName);

            const dayDate = document.createElement('span');
            dayDate.className = 'tyx__week-day-date';
            dayDate.innerText =  (day['date'] as DateTime).day.toString();
            dayHeader.appendChild(dayDate);

            weekHeaderDiv.appendChild(dayHeader);
        });

        const calendarContent = document.querySelector('.calendar-content') as HTMLElement;
        calendarContent.appendChild(weekHeaderDiv);
       // gridDiv.appendChild(weekHeaderDiv); // Append day headers

         // generate week grid as flex row
         const weekGrid = document.createElement('div');
         weekGrid.className = 'tyx__week-grid';
         
 
         // add time column
         const timeAxis = document.createElement('div');
         timeAxis.className = 'tyx__week-grid__time-axis';
         weekGrid.appendChild(timeAxis);
         // generate hours
    
       
        const timeSlotInterval = Duration.fromObject({minute:this.tyxWeekOption.timeSlotInterval }); // Example: 30-minute intervals
        const startHourOfDay = DateTime.fromObject({ hour: this.tyxWeekOption.startHourOfDay });
        const endHourOfDay = DateTime.fromObject({ hour: this.tyxWeekOption.endHourOfDay });
        // Calculate the total duration between start and end in minutes
        const totalDuration = endHourOfDay.diff(startHourOfDay, "minutes");
        // Calculate the number of slots
        const numberOfSlots = (totalDuration.as("minutes") / timeSlotInterval.as("minutes"))+1;

        const slotHeight = this.tyxWeekOption.timeSlotHeight!;

        const tyxCalendarWeekGridHeight = numberOfSlots * slotHeight;
        // Get the root element
        const root = document.documentElement;
        // Change the value of --tyx-calendar-week-grid-height

        
        root.style.setProperty('--tyx-calendar-week-grid-height', `${tyxCalendarWeekGridHeight}px`); // Set it to 1600px as an example
        root.style.setProperty('--tyx-calendar-week-grid-slot-height', `${slotHeight}px`); // Set it to 1600px as an example
        const tyxCalendarWeekGridPaddingTop = 15;
        root.style.setProperty('--tyx-calendar-week-grid-padding-top', `${tyxCalendarWeekGridPaddingTop}px`); // Set it to 1600px as an example

        let startHourCounter = startHourOfDay;
        while (startHourCounter < endHourOfDay) {
            const hourDiv = document.createElement('div');
            hourDiv.className = 'tyx__week-grid__time';
            hourDiv.setAttribute("time",`${startHourCounter.toFormat('HH:mm')}`);

            const hourDivText = document.createElement('span');
            hourDivText.className = 'tyx__week-grid__time-text';
            hourDivText.innerText = `${startHourCounter.toFormat('HH:mm')}`;

            hourDiv.appendChild(hourDivText);
            timeAxis.appendChild(hourDiv);
            startHourCounter = startHourCounter.plus(timeSlotInterval);
        }

         // add days column

        const weekDates = this._getDatesForWeek();
        weekDates.forEach(date => {
             const dayDivColumn = document.createElement('div');
             dayDivColumn.className = 'tyx__week-grid__day';
             dayDivColumn.classList.add(`tyx__${date.toFormat('EEEE').toLowerCase()}`);
             dayDivColumn.setAttribute("data",date ? date.toISODate() : '');
             dayDivColumn.setAttribute("day",date ? date.toFormat('ccc') : '');
             weekGrid.appendChild(dayDivColumn);

            const events = this.eventInstances[date.toISODate()] || [];

            for (let i = 0; i < events.length; i++) {
                var eventsPercentageIntervals = events.map(e => {
                    var metadata = EventUtils.getEventMetadata(e,
                        date,
                        tyxCalendarWeekGridHeight,
                        timeSlotInterval, slotHeight, 
                        this.timezone,
                        this.language,
                   )
                    return {
                        start: metadata.eventStartPercentage,
                        end: metadata.eventEndPercentage,
                        event: e
                    }
                })
                const event = events[i];
                const eventDiv = document.createElement('div');
                eventDiv.addEventListener('click', () => this._handleTEventClick(event));
                eventDiv.className = 'tyx__week-grid__day-event';

                const eventMetadata = EventUtils.getEventMetadata(event,
                     date,
                     tyxCalendarWeekGridHeight,
                     timeSlotInterval, slotHeight, this.timezone,
                     this.language,
                );
                eventDiv.style.top = `${eventMetadata.eventStartPercentage}%`;
                eventDiv.style.height = `${eventMetadata.eventHeightPercentage}%`;

                // start detect collision

                let collisions = eventsPercentageIntervals.filter(e => {
                    return  (e.start > eventMetadata.eventStartPercentage && e.start < eventMetadata.eventEndPercentage)||
                    e.end > eventMetadata.eventStartPercentage && e.end < eventMetadata.eventEndPercentage || EventUtils.getId(event) == EventUtils.getId(e.event)
                })

                // dectect the position of current element within the array with collisions
                const position = collisions.findIndex(e => {
                    return EventUtils.getId(event) == EventUtils.getId(e.event)
                });

                // trim out the current item as it is not an actual collision
                collisions = collisions.filter(e => {
                    return EventUtils.getId(event) != EventUtils.getId(e.event)
                })
                if(collisions.length==0){
                    eventDiv.style.width = `calc(100%)`;
                }else{
                    const singleEventW = 100/(collisions.length+1);
                    const shiftW = singleEventW*(position);
                    eventDiv.style.marginLeft = `calc(${(shiftW)}%)`;
                    eventDiv.style.width = `calc(${(100- shiftW)}%)`;
                    eventDiv.style.zIndex = `${i +1}`
                    eventDiv.classList.add('position-'+position);
                }
               
                // end detect collision

                let color = event.color?? getComputedStyle(document.body).getPropertyValue('--tyx-primary-color')
                // lighter color for background
                eventDiv.style.backgroundColor = ColorUtils.generateEventBgColor(color);
                eventDiv.style.borderLeftColor =ColorUtils.generateEventBorderColor(color);
                eventDiv.style.color =ColorUtils.generateEventTitleColor(color);
                
                const eventTitleDiv = document.createElement('div');
                eventTitleDiv.classList.add('tyx__week-grid__day-event-title')
                eventTitleDiv.innerText = `${event.title}`
                eventDiv.appendChild(eventTitleDiv)

                const eventTimesDiv = document.createElement('div')
                eventTimesDiv.classList.add('tyx__week-grid__day-event-time')
                eventTimesDiv.innerText = `${eventMetadata.start.toFormat('HH:mm')} - ${eventMetadata.end.toFormat('HH:mm')}`
                eventDiv.appendChild(eventTimesDiv)

                if(event.location){
                    const eventLocationDiv = document.createElement('div');
                    eventLocationDiv.innerText = event.location;
                    eventLocationDiv.classList.add('tyx__week-grid__day-event-location')
                    eventDiv.appendChild(eventLocationDiv)
                }

                dayDivColumn.appendChild(eventDiv);
            }
             
        })
        gridDiv.appendChild(weekGrid); // Append week grid to main grid
    }
    private _renderDayHeaders(){
        this.daysOfWeek = this._getDayHeaders();
    }

    private _renderDayView(gridDiv: HTMLElement) {
        const dayDetails = document.createElement('div');
        dayDetails.className = 'day-details';
        dayDetails.innerText = `Events for ${this.selectedDate?.toLocaleString(DateTime.DATE_FULL)}`;
        this._populateEventDetails(this.selectedDate, dayDetails);
        gridDiv.appendChild(dayDetails);
    }

    private _createDateCell({ date, isPrevious, isNext }: { date?: DateTime; isPrevious: boolean; isNext: boolean }): HTMLElement {
        const dateCell = document.createElement('div');
        const isSelectedDate = date && date.toISODate() === this.selectedDate?.toISODate();
        dateCell.className = `date-cell ${isPrevious ? 'previous-date' : ''} ${isNext ? 'next-date' : ''} ${(isSelectedDate) ? 'selected-date' : ''}`; // Add class for next dates
        
        const today = DateTime.now().setZone(this.timezone).startOf('day');
        const isTodayDate = date && date.toISODate() === today.toISODate();
        if(isTodayDate){
            dateCell.classList.add('today');
        }
        dateCell.setAttribute("data",date ? date.toISODate() : '');
        dateCell.setAttribute("day",date ? date.toFormat('ccc') : '');
        dateCell.addEventListener('click', () => this._handleDateClick(date));
        const dateElement = document.createElement('div');
        dateElement.innerText = date ? date.day.toString() : '';
        dateCell.appendChild(dateElement);
        if(this.handleEvents){
            this._populateEventDetails(date, dateCell);
        }
        
        return dateCell;
    }

    private _getDayHeaders():Record<string,any>[] {
        const days = [];
        const startDate = 1;
        const endDate = 7;
        if(this.view=="week"){
            for (let i = 0; i <= 6; i++) {
                const date = this.startDate.plus({ days: i });
                const dayName = date
                    .toFormat(this.tHeaderOption!.dayFormat!);
                days.push({
                    "dayName":dayName,
                    "date":date
                });
            } 
        }else{
            for (let i = startDate; i <= endDate; i++) {
                const date = DateTime.local(this.startDate.year, this.startDate.month, 1,{zone:this.timezone})
                    .set({ weekday: i })
                    .setLocale(this.language);
                const dayName = date
                    .toFormat(this.tHeaderOption!.dayFormat!);
                days.push({
                    "dayName":dayName,
                    "date":date
                });
            }
        }
       
        return days;
    }

    private _getDatesForMonth() {
        const dates: { date: DateTime | undefined; isPrevious: boolean; isNext: boolean }[] = [];
        const firstDay = DateTime.local(this.startDate.year, this.startDate.month, 1, { zone: this.timezone });
        const lastDay = firstDay.endOf('month');
        const startDayOfWeek = firstDay.weekday;

        // Add previous month's days
        const previousMonthEnd = firstDay.minus({ days: 1 }).endOf('month');
        for (let i = 0; i < startDayOfWeek - 1; i++) {
            const date = previousMonthEnd.minus({ days: i });
            dates.push({ date, isPrevious: true, isNext: false }); // Mark as previous
        }

        // Add current month's days
        for (let day = 1; day <= lastDay.day; day++) {
            dates.push({ date: DateTime.local(this.startDate.year, this.startDate.month, day, { zone: this.timezone }), isPrevious: false, isNext: false });
        }

        // Calculate how many next month's days are needed to fill the grid
       
        // Add next month's days
        const nextMonthStart = lastDay.plus({ days: 1 }).startOf('month');
        for (let day = 1; day <= (7-lastDay.weekday); day++) {
            dates.push({ date: DateTime.local(nextMonthStart.year, nextMonthStart.month, day, { zone: this.timezone }), isPrevious: false, isNext: true }); // Mark as next
        }
        // var remaining = (7*6) - dates.length;
        // for (let i = 0; i < remaining; i++) {
        //     dates.push({ date: undefined, isPrevious: false, isNext: false });
        // }

        return dates;
    }

    private _getDatesForWeek() {
        const weekDates: DateTime[] = [];
        const startOfWeek = this.startDate.startOf('week');
        for (let i = 0; i < 7; i++) {
            weekDates.push(startOfWeek.plus({ days: i }));
        }
        return weekDates;
    }

    private _handleDateClick(date?: DateTime) {
        if (date) {
            document.querySelector('.selected-date')?.classList.remove('selected-date');
            
            var element = document.querySelector(`[data="${date.toISODate()}"]`);
            if(element?.classList.contains('previous-date')  ){
                this.gotoDate(date,-1);
            } else if(element?.classList.contains('next-date')){
                this.gotoDate(date,1);
            }

            this.selectedDate = date;
            document.querySelector(`[data="${date.toISODate()}"]`)?.classList.add('selected-date');
            this._renderEventLists();
            this.onDayClicked?.call(this, date, this.eventInstances[date.toISODate()] || []);
            // Optionally display events or open a detailed view
        }
    }
    private _handleTEventClick(event:TyxEvent) {
        this.onTEventClicked?.call(this,event);
    }

    private _populateEventDetails(date: DateTime | undefined, cell: HTMLElement) {
        if (!date) return;
        const dateString = date.toISODate();
        const eventList = this.eventInstances[dateString] || [];
        if(eventList.length>0){
            const eventsElement = document.createElement('div');
            eventsElement.classList.add('event-list-large');
            eventList.forEach(event => {
                const eventItem = document.createElement('div');
                // customize style
                let color = event.color?? getComputedStyle(document.body).getPropertyValue('--tyx-primary-color')
                eventItem.style.backgroundColor = ColorUtils.generateEventBgColor(color);
               // eventItem.style.borderLeftColor =ColorUtils.generateEventBorderColor(color);
                eventItem.style.color =ColorUtils.generateEventTitleColor(color);

                // end
                eventItem.className = 'event-item';
                eventItem.addEventListener('click', () => this._handleTEventClick(event));
                const eventDetails = document.createElement('div');
                eventDetails.className = 'event-details';
                eventItem.appendChild(eventDetails);
    
                const eventTitle = document.createElement('div');
                eventTitle.className = 'event-title';
                eventTitle.innerText = event.title;
                eventDetails.appendChild(eventTitle);
    
                const eventTime = document.createElement('div');
                eventTime.className = 'event-time';
                eventTime.innerText = `${DateTime.fromISO(event.start_date).setZone(this.timezone).setLocale(this.language).toFormat('HH:mm a')} - ${DateTime.fromISO(event.end_date).setZone(this.timezone).setLocale(this.language).toFormat('HH:mm a')}`;
                eventDetails.appendChild(eventTime);

                const eventMarker = document.createElement('div');
                eventMarker.className = 'event-marker';
                eventMarker.style.backgroundColor = color;
                eventItem.appendChild(eventMarker);

                eventsElement.appendChild(eventItem);
            })

            cell.appendChild(eventsElement);
        }
        
    }

    private _updateEventInstances(){
        this.eventInstances = {};
        const flatennedEvents = Object.values(this.events).flatMap((events) => events);
        for (const event of flatennedEvents) {
            if(!event.recurrence){
                this.addEventInstance(event, this.eventInstances);
            }else{
                // Parse the recurrence rule using rrule
                const rule = rrulestr(event.recurrence);
                // Expand recurrence dates within the range of startDate to endDate
                const rruleDates = rule.between(this.startDate.toJSDate(), this.endDate.toJSDate(), true);
                // Convert rruleDates to DateTime and push to recurrenceDates array
                const recurrenceDates = rruleDates.map(date => DateTime.fromJSDate(date).setZone(this.timezone));
                recurrenceDates.forEach(date => {
                    var start = DateTime.fromISO(event.start_date).setZone(this.timezone);
                    var newStart = DateTime.fromObject({ year: date.year, month: date.month, day: date.day,hour: start.hour, minute: start.minute })
                    var end = DateTime.fromISO(event.end_date).setZone(this.timezone);
                    var  duration = end.diff(start, 'minutes');
                    var newEvent =  {
                        start_date: newStart.toISO(),
                        end_date: newStart.plus(duration).toISO(),
                        title: event.title,
                        location: event.location,
                        description: event.description,
                        attendees: event.attendees,
                        allDay: event.allDay,
                        recurrence: event.recurrence,
                    } as TyxEvent
                    
                    this.addEventInstance(newEvent, this.eventInstances);
                })
            }
        }

    }

   
    addEvent(event: TyxEvent) {
        this.addEventInstance(event,this.events)
        this._render();
    }

    private addEventInstance(event: TyxEvent,events: {
        [key: string]: TyxEvent[];
    }) {
     
    const startDate = DateTime.fromISO(event.start_date).setZone(this.timezone);
    const endDate = DateTime.fromISO(event.end_date).setZone(this.timezone);

    let currentDate = startDate.startOf('day');  // Begin at the start of the day for the start_date

    while (currentDate <= endDate.startOf('day')) {
        const eventDate = currentDate.toISODate();

        // Initialize the event array for the current date if not already initialized
        if (!events[eventDate]) {
            events[eventDate] = [];
        }

        // Determine the event's start and end times for the current day
        let eventStart = currentDate.equals(startDate.startOf('day')) ? startDate : currentDate.startOf('day');
        let eventEnd = currentDate.equals(endDate.startOf('day')) ? endDate : currentDate.endOf('day');

        // Push the adjusted event for the current day
        events[eventDate].push({
            ...event,
            start_date: eventStart.toISO(),  // Adjusted start date for this segment
            end_date: eventEnd.toISO()       // Adjusted end date for this segment
        });

        // Sort events by start_date after adding the new event
        events[eventDate].sort((a, b) => DateTime.fromISO(a.start_date).toMillis() - DateTime.fromISO(b.start_date).toMillis());


        // Move to the next day
        currentDate = currentDate.plus({ days: 1 });
    }
    }
    addAllEvents(events: TyxEvent[]) {
        for (let i = 0; i < events.length; i++) {
            this.addEvent(events[i]);
        }
    }
}
