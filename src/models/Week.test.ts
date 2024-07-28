import Week from "./Week.ts"
import {ALL_WORK_OPTIONS} from "../models/WorkOption.ts"

test('week constructor works as expected', () => {
    const weekId = 1
    const week = new Week(weekId)

    expect(week.id).toBe(weekId)

    // days are correctly set
    expect(week.workDays.length).toBe(7)
    expect(week.workDays.map(wd => wd.day.id)).toEqual([1, 2, 3, 4, 5, 6, 7])

    // forecast is correctly set
    expect(week.workDays.every(wd => wd.forecast !== null)).toBe(true)
})

test('getWorkDay returns the correct day', () => {
    const week = new Week(1)
    const dayId = 1
    const workDay = week.getWorkDay(dayId)

    expect(workDay.day.id).toBe(dayId)
})

test('isScheduleSet works with no options set', () => {
    const week = new Week(1)

    // default should be false
    expect(week.isScheduleSet()).toBe(false)
})

test('isScheduleSet works with all options set', () => {
    const week = new Week(1)

    // set all work options to something
    week.workDays = week.workDays.map(wd => (
        {
            ...wd,
            workOption: ALL_WORK_OPTIONS[0]
        }
    ))

    // should now be true
    expect(week.isScheduleSet()).toBe(true)
})

test('isScheduleSet works with some options set', () => {
    const week = new Week(1)

    // set all work options to something
    week.workDays = week.workDays.map((wd, i) => (
        {
            ...wd,
            workOption: i % 2 === 0 ? ALL_WORK_OPTIONS[0] : null
        }
    ))

    // should now be false
    expect(week.isScheduleSet()).toBe(false)
})