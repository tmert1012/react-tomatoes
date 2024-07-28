import Season from "../models/Season.ts"
import {ALL_WORK_OPTIONS, TRIM_WORK_OPTION} from "../models/WorkOption.ts"

test('season constructor works as expected', () => {
    const maxAllowableWeeks = 3
    const season = new Season(maxAllowableWeeks)

    expect(season.maxAllowableWeeks).toBe(maxAllowableWeeks)

    // weeks are correctly set
    expect(season.weeks.length).toBe(maxAllowableWeeks)
    expect(season.weeks.map(w => w.id)).toEqual([1, 2, 3])
})

test('getCurrentWeek returns the correct week with no schedules set', () => {
    const season = new Season(3)

    // default should be 1
    expect(season.getCurrentWeek().id).toBe(1)
})

test('getCurrentWeek returns the correct week with some schedules set', () => {
    const season = new Season(3)

    // set some work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd => (
        {
            ...wd,
            workOption: ALL_WORK_OPTIONS[0]
        }
    ))

    // default should be 2
    expect(season.getCurrentWeek().id).toBe(2)
})

test('getCurrentWeek returns the last week with all schedules set', () => {
    const season = new Season(3)

    // set all work options to something
    season.weeks.forEach(week => {
        week.workDays = week.workDays.map(wd => (
            {
                ...wd,
                workOption: ALL_WORK_OPTIONS[0]
            }
        ))
    })

    // default should be 3
    expect(season.getCurrentWeek().id).toBe(3)
})

test('isSeasonComplete works with no schedules set', () => {
    const season = new Season(3)

    // default should be false
    expect(season.isSeasonComplete()).toBe(false)
})

test('isSeasonComplete works with all schedules set', () => {
    const season = new Season(3)

    // set all work options to something
    season.weeks.forEach(week => {
        week.workDays = week.workDays.map(wd => (
            {
                ...wd,
                workOption: ALL_WORK_OPTIONS[0]
            }
        ))
    })

    // should now be true
    expect(season.isSeasonComplete()).toBe(true)
})

test('isSeasonComplete works with some schedules set', () => {
    const season = new Season(3)

    // set all work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd => (
        {
            ...wd,
            workOption: ALL_WORK_OPTIONS[0]
        }
    ))

    // should now be false
    expect(season.isSeasonComplete()).toBe(false)
})

test('atLeastOneScheduleSet returns false with no schedules set', () => {
    const season = new Season(3)

    // default should be false
    expect(season.atLeastOneScheduleSet()).toBe(false)
})

test('atLeastOneScheduleSet returns true with some schedules set', () => {
    const season = new Season(3)

    // set some work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd => (
        {
            ...wd,
            workOption: TRIM_WORK_OPTION
        }
    ))

    // should now be true
    expect(season.atLeastOneScheduleSet()).toBe(true)
})
