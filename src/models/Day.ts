interface Day {
    id: number,
    displayName: string,
}

export const ALL_DAYS: Array<Day> = [
    {id: 1, displayName: 'Monday'},
    {id: 2, displayName: 'Tuesday'},
    {id: 3, displayName: 'Wednesday'},
    {id: 4, displayName: 'Thursday'},
    {id: 5, displayName: 'Friday'},
    {id: 6, displayName: 'Saturday'},
    {id: 7, displayName: 'Sunday'}
]

export default Day