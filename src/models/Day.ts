interface Day {
    id: number,
    displayName: string,
}

export const MONDAY: Day = {id: 1, displayName: 'Monday'}
export const TUESDAY: Day = {id: 2, displayName: 'Tuesday'}
export const WEDNESDAY: Day = {id: 3, displayName: 'Wednesday'}
export const THURSDAY: Day = {id: 4, displayName: 'Thursday'}
export const FRIDAY: Day = {id: 5, displayName: 'Friday'}
export const SATURDAY: Day = {id: 6, displayName: 'Saturday'}
export const SUNDAY: Day = {id: 7, displayName: 'Sunday'}

export const ALL_DAYS: Array<Day> = [
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
]

export default Day