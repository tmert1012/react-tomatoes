import WeekModel from "src/models/WeekModel.ts"
import {ALL_WORK_OPTIONS, SPRAY_WORK_OPTION, WEED_WORK_OPTION} from "src/models/WorkOptionModel.ts"
import WorkDayModel from "src/models/WorkDayModel.ts"
import {FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY} from "src/models/DayModel.ts"
import {SUNNY_WEATHER_OPTION} from "src/models/ForecastModel.ts"
import {WeekApiObject} from "src/api_objects/WeekApiObject.ts"

test('week constructor works as expected', () => {
    const weekId = 1
    const week = new WeekModel(weekId)

    expect(week.id).toBe(weekId)

    // days are correctly set
    expect(week.workDays.length).toBe(7)
    expect(week.workDays.map(wd => wd.day.id)).toEqual([1, 2, 3, 4, 5, 6, 7])

    // forecast is correctly set
    expect(week.workDays.every(wd => wd.forecast !== null)).toBe(true)
})

test('getWorkDay returns the correct day', () => {
    const week = new WeekModel(1)
    const dayId = 1
    const workDay = week.getWorkDay(dayId)

    expect(workDay.day.id).toBe(dayId)
})

test('isScheduleSet works with no options set', () => {
    const week = new WeekModel(1)

    // default should be false
    expect(week.isScheduleSet()).toBe(false)
})

test('isScheduleSet works with all options set', () => {
    const week = new WeekModel(1)

    // set all work options to something
    week.workDays = week.workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            ALL_WORK_OPTIONS[0]
        )
    )

    // should now be true
    expect(week.isScheduleSet()).toBe(true)
})

test('isScheduleSet works with some options set', () => {
    const week = new WeekModel(1)

    // set all work options to something
    week.workDays = week.workDays.map((wd, i) =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            i % 2 === 0 ? ALL_WORK_OPTIONS[0] : null
        )
    )

    // should now be false
    expect(week.isScheduleSet()).toBe(false)
})

test('isScheduleInProgress returns false with no options set', () => {
    const week = new WeekModel(1)

    // default should be false
    expect(week.isScheduleInProgress()).toBe(false)
})

test('isScheduleInProgress returns false with all options set', () => {
    const week = new WeekModel(1)

    // set all work options to something
    week.workDays = week.workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            SPRAY_WORK_OPTION
        )
    )

    // should now be true
    expect(week.isScheduleInProgress()).toBe(false)
})

test('isScheduleInProgress returns true with some options set', () => {
    const week = new WeekModel(1)

    // set first work day to something
    week.workDays[0].workOption = SPRAY_WORK_OPTION

    // should now be true
    expect(week.isScheduleInProgress()).toBe(true)
})

test('copy works as expected', () => {
    const week = new WeekModel(1)
    const copy = week.copy()

    expect(JSON.stringify(copy)).toEqual(JSON.stringify(week))
    expect(copy).not.toBe(week)
})

test('toApiObject works as expected', () => {
    const weekId = 1
    const workDays = [
        new WorkDayModel(MONDAY, SUNNY_WEATHER_OPTION, WEED_WORK_OPTION),
        new WorkDayModel(TUESDAY, SUNNY_WEATHER_OPTION, SPRAY_WORK_OPTION),
        new WorkDayModel(WEDNESDAY, SUNNY_WEATHER_OPTION, WEED_WORK_OPTION),
        new WorkDayModel(THURSDAY, SUNNY_WEATHER_OPTION, SPRAY_WORK_OPTION),
        new WorkDayModel(FRIDAY, SUNNY_WEATHER_OPTION, WEED_WORK_OPTION),
        new WorkDayModel(SATURDAY, SUNNY_WEATHER_OPTION, SPRAY_WORK_OPTION),
        new WorkDayModel(SUNDAY, SUNNY_WEATHER_OPTION, WEED_WORK_OPTION)
    ]
    const week = new WeekModel(weekId, workDays)

    const expected: WeekApiObject = {
        id: weekId,
        workDays: [
            {day: MONDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: WEED_WORK_OPTION.toApiObject()},
            {day: TUESDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: SPRAY_WORK_OPTION.toApiObject()},
            {day: WEDNESDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: WEED_WORK_OPTION.toApiObject()},
            {day: THURSDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: SPRAY_WORK_OPTION.toApiObject()},
            {day: FRIDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: WEED_WORK_OPTION.toApiObject()},
            {day: SATURDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: SPRAY_WORK_OPTION.toApiObject()},
            {day: SUNDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: WEED_WORK_OPTION.toApiObject()}
        ]
    }

    expect(week.toApiObject()).toEqual(expected)
})