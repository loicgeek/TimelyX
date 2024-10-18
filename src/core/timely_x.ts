import { DateTime } from 'ts-luxon';
import { TEvent } from './types/t_event';
import { THeaderOption } from './types/t_header_option';
import { rrulestr } from 'rrule';

type TimelyXView = "month" | "week" | "day";

export class TimelyX {
    instance?: HTMLElement;
    timezone: string;
    selectedDate?: DateTime;
    startDate: DateTime;
    endDate: DateTime;
    language: string;
    daysOfWeek: string[];
    events: { [key: string]: TEvent[] }; // Event storage
    eventInstances: { [key: string]: TEvent[] }; // Event storage
    view: TimelyXView; // Current view
    tHeaderOption: THeaderOption;
    handleEvents:boolean;
    onDayClicked?: (date: DateTime, events: TEvent[]) => void;
    onTEventClicked?: (event: TEvent) => void;

    constructor({
        timezone = DateTime.local().zoneName,
        selectedDate = DateTime.local().toISODate(),
        language = navigator.language || 'en-US',
        view = 'month', // Default view,
        tHeaderOption = {
           
        } as THeaderOption,
        handleEvents = false
    } = {}) {
        this.timezone = timezone;
        this.language = language;
        this.handleEvents = handleEvents;
        
        this.events = {};
        this.eventInstances = {};
        this.view = view as TimelyXView;
        this.tHeaderOption = {
             currentMonthFormat:'MMMM yyyy',
            dayFormat:'ccc',
            ...tHeaderOption
        };
        this.selectedDate = DateTime.fromISO(selectedDate).setZone(this.timezone);

        this.startDate = this.selectedDate.startOf('month');
        this.endDate = this.selectedDate.endOf('month');

        this.daysOfWeek = this._getDayHeaders();
        
    }

     adjustGridClass() {
        const calendarElement = document.querySelector('.calendar');        
        if (window.innerWidth <= 600) {
            calendarElement?.classList.add('small-grid');
            calendarElement?.classList.remove('large-grid');
        } else {
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

    changeMonth(delta: number) {
        if (this.view === 'month') {
            this.startDate = this.startDate!.plus({ months: delta });
            this.endDate = this.startDate.endOf('month');

        } else if (this.view === 'week') {
            this.startDate = this.startDate!.plus({ weeks: delta });
            this.endDate = this.startDate.endOf('week');
        }
        this.selectedDate = undefined;
        this._render(delta);
    }
    gotoDate(date: DateTime, delta?: number) {
        this.selectedDate = date;
        this.startDate = date.startOf('month');
        this.endDate = date.endOf('month');
        this._render(delta);
    }

    _render(delta?: number) {
        
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
            this._renderWeekView(gridDiv);
        } else if (this.view === 'day') {
            this._renderDayView(gridDiv);
        }
        gridDiv.classList.remove('fade-in');
        gridDiv.classList.add('fade-out');
        if(delta){
            gridDiv.classList.add(delta < 0 ? 'direction-left' : 'direction-right');
        }
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
    

    _createHeader() {
        const headerDiv = document.createElement('header');
        headerDiv.className = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.className = 'prev-month';
        prevButton.innerText = '◀';
        prevButton.addEventListener('click', () => this.changeMonth(-1));

        const currentMonth = document.createElement('h2');
        currentMonth.className = 'current-month';
        currentMonth.innerText = this.view === 'month'
            ? this.startDate! .setLocale(this.language).toFormat(this.tHeaderOption!.currentMonthFormat!)
            : `${this.startDate!.startOf('week').toLocaleString(DateTime.DATE_FULL)} - ${this.startDate.endOf('week').toLocaleString(DateTime.DATE_FULL)}`;

        const nextButton = document.createElement('button');
        nextButton.className = 'next-month';
        nextButton.innerText = '▶';
        nextButton.addEventListener('click', () => this.changeMonth(1));

        headerDiv.appendChild(prevButton);
        headerDiv.appendChild(currentMonth);
        headerDiv.appendChild(nextButton);
        return headerDiv;
    }

    _renderMonthView(gridDiv: HTMLElement) {
        // Create a container for the week headers
        const weekHeaderDiv = document.createElement('div');
        weekHeaderDiv.className = 'week-header';

        this.daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.innerText = day;
            weekHeaderDiv.appendChild(dayHeader);
        });

        gridDiv.appendChild(weekHeaderDiv); // Append week headers to grid

        const dates = this._getDatesForMonth();
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-grid'; // Create a div for week grid to hold the dates

        dates.forEach(({ date, isPrevious, isNext }) => {
            const dateCell = this._createDateCell({ date, isPrevious, isNext });
            weekDiv.appendChild(dateCell);
        });

        gridDiv.appendChild(weekDiv); // Append week grid to main grid

    }

    _renderEventLists() {
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

    _renderWeekView(gridDiv: HTMLElement) {
        const weekHeaderDiv = document.createElement('div');
        weekHeaderDiv.className = 'week-header';

        this.daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.innerText = day;
            weekHeaderDiv.appendChild(dayHeader);
        });

        gridDiv.appendChild(weekHeaderDiv); // Append day headers

        const weekDates = this._getDatesForWeek();
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-grid'; // Create a div for the week grid

        weekDates.forEach(date => {
            const dateCell = this._createDateCell({ date, isPrevious: false, isNext: false }); // Default to current month dates
            weekDiv.appendChild(dateCell);
        });

        gridDiv.appendChild(weekDiv); // Append week grid to main grid
    }

    _renderDayView(gridDiv: HTMLElement) {
        const dayDetails = document.createElement('div');
        dayDetails.className = 'day-details';
        dayDetails.innerText = `Events for ${this.selectedDate?.toLocaleString(DateTime.DATE_FULL)}`;
        this._populateEventDetails(this.selectedDate, dayDetails);
        gridDiv.appendChild(dayDetails);
    }

    _createDateCell({ date, isPrevious, isNext }: { date?: DateTime; isPrevious: boolean; isNext: boolean }): HTMLElement {
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

    _getDayHeaders() {
        const days = [];
        const startDate = 1;
        const endDate = 7;
        for (let i = startDate; i <= endDate; i++) {
            const dayName = DateTime.local(this.startDate.year, this.startDate.month, 1,{zone:this.timezone})
                .set({ weekday: i })
                .setLocale(this.language)
                .toFormat(this.tHeaderOption!.dayFormat!);
            days.push(dayName);
        }
        return days;
    }

    _getDatesForMonth() {
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

    _getDatesForWeek() {
        const weekDates: DateTime[] = [];
        const startOfWeek = this.startDate.startOf('week');
        for (let i = 0; i < 7; i++) {
            weekDates.push(startOfWeek.plus({ days: i }));
        }
        return weekDates;
    }

    _handleDateClick(date?: DateTime) {
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
    _handleTEventClick(event:TEvent) {
        this.onTEventClicked?.call(this,event);
    }

    _populateEventDetails(date: DateTime | undefined, cell: HTMLElement) {
        if (!date) return;
        const dateString = date.toISODate();
        const eventList = this.eventInstances[dateString] || [];
        if(eventList.length>0){
            const eventsElement = document.createElement('div');
            eventsElement.classList.add('event-list-large');
            eventList.forEach(event => {
                const eventItem = document.createElement('div');
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
                eventItem.appendChild(eventMarker);

                eventsElement.appendChild(eventItem);
            })

            cell.appendChild(eventsElement);
        }
        
    }

    _updateEventInstances(){
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
                    } as TEvent
                    
                    this.addEventInstance(newEvent, this.eventInstances);
                })
            }
        }

    }

   
    addEvent(event: TEvent) {
        
        this.addEventInstance(event,this.events)
        this._render();
    }

    addEventInstance(event: TEvent,events: {
        [key: string]: TEvent[];
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
}
