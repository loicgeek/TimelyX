export interface TyxWeekOption{
    // The number of minutes between each time slot
    timeSlotInterval?:number,

    // The start hour of the day
    // Default: 0
    startHourOfDay?:number,

    // The end hour of the day
    // Default: 24
    endHourOfDay?:number

    // The height of each time slot in px
    // Default: 100
    timeSlotHeight?:number
}
