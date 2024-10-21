export interface TEvent {
    id?: string;
    title: string;
    start_date: string;
    end_date: string;
    location?: string;
    description?: string;
    allDay?: boolean;
    recurrence?: string;
    attendees?: string[];
    color?: string;
}
