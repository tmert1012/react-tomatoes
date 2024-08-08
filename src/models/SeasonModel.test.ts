import SeasonModel from "src/models/SeasonModel.ts"
import {ALL_WORK_OPTIONS, TRIM_WORK_OPTION} from "src/models/WorkOptionModel.ts"
import WorkDayModel from "src/models/WorkDayModel.ts"
import {SUNNY_WEATHER_OPTION} from "src/models/ForecastModel.ts"
import {SeasonApiObject} from "src/api_objects/SeasonApiObject.ts"
import {FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY} from "src/models/DayModel.ts"

test('season constructor works as expected', () => {
    const maxAllowableWeeks = 3
    const season = new SeasonModel(maxAllowableWeeks)

    expect(season.maxAllowableWeeks).toBe(maxAllowableWeeks)

    // weeks are correctly set
    expect(season.weeks.length).toBe(maxAllowableWeeks)
    expect(season.weeks.map(w => w.id)).toEqual([1, 2, 3])
})

test('getCurrentWeek returns the correct week with no schedules set', () => {
    const season = new SeasonModel(3)

    // default should be 1
    expect(season.getCurrentWeek().id).toBe(1)
})

test('getCurrentWeek returns the correct week with some schedules set', () => {
    const season = new SeasonModel(3)

    // set some work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            ALL_WORK_OPTIONS[0]
        )
    )

    // default should be 2
    expect(season.getCurrentWeek().id).toBe(2)
})

test('getCurrentWeek returns the last week with all schedules set', () => {
    const season = new SeasonModel(3)

    // set all work options to something
    season.weeks.forEach(week => {
        week.workDays = week.workDays.map(wd =>
            new WorkDayModel(
                wd.day,
                wd.forecast,
                ALL_WORK_OPTIONS[0]
            )
        )
    })

    // default should be 3
    expect(season.getCurrentWeek().id).toBe(3)
})

test('isSeasonComplete works with no schedules set', () => {
    const season = new SeasonModel(3)

    // default should be false
    expect(season.isSeasonComplete()).toBe(false)
})

test('isSeasonComplete works with all schedules set', () => {
    const season = new SeasonModel(3)

    // set all work options to something
    season.weeks.forEach(week => {
        week.workDays = week.workDays.map(wd =>
            new WorkDayModel(
                wd.day,
                wd.forecast,
                ALL_WORK_OPTIONS[0]
            )
        )
    })

    // should now be true
    expect(season.isSeasonComplete()).toBe(true)
})

test('isSeasonComplete works with some schedules set', () => {
    const season = new SeasonModel(3)

    // set all work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            ALL_WORK_OPTIONS[0]
        )
    )

    // should now be false
    expect(season.isSeasonComplete()).toBe(false)
})

test('atLeastOneScheduleSet returns false with no schedules set', () => {
    const season = new SeasonModel(3)

    // default should be false
    expect(season.atLeastOneScheduleSet()).toBe(false)
})

test('atLeastOneScheduleSet returns true with some schedules set', () => {
    const season = new SeasonModel(3)

    // set some work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            TRIM_WORK_OPTION
        )
    )

    // should now be true
    expect(season.atLeastOneScheduleSet()).toBe(true)
})

test('findScheduleInProgress returns undefined with no schedules set', () => {
    const season = new SeasonModel(3)

    // default should be undefined
    expect(season.findScheduleInProgress()).toBe(undefined)
})

test('findScheduleInProgress returns the correct week with some schedules set', () => {
    const season = new SeasonModel(3)

    // set some work options to something
    season.weeks[0].workDays[0].workOption = TRIM_WORK_OPTION
    season.weeks[0].workDays[1].workOption = TRIM_WORK_OPTION
    season.weeks[0].workDays[2].workOption = TRIM_WORK_OPTION

    // should now be the first week
    expect(season.findScheduleInProgress()).toBe(season.weeks[0])
})

test('findScheduleInProgress returns undefined with first week schedule set', () => {
    const season = new SeasonModel(3)

    // set all work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            TRIM_WORK_OPTION
        )
    )

    // should now be undefined
    expect(season.findScheduleInProgress()).toBe(undefined)
})

test('findScheduleInProgress returns undefined with all schedules set', () => {
    const season = new SeasonModel(3)

    // set all work options to something
    season.weeks.forEach(week => {
        week.workDays = week.workDays.map(wd =>
            new WorkDayModel(
                wd.day,
                wd.forecast,
                TRIM_WORK_OPTION
            )
        )
    })

    // should now be undefined
    expect(season.findScheduleInProgress()).toBe(undefined)
})

test('getWeeksInSeasonSoFar returns the correct weeks with no schedules set', () => {
    const season = new SeasonModel(3)

    // default should be empty
    expect(season.getWeeksInSeasonSoFar()).toEqual([])
})

test('getWeeksInSeasonSoFar returns the correct weeks with some schedules set', () => {
    const season = new SeasonModel(3)

    // set some work options to something
    season.weeks[0].workDays = season.weeks[0].workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            wd.forecast,
            TRIM_WORK_OPTION
        )
    )

    // should now be the first week
    expect(season.getWeeksInSeasonSoFar()).toEqual([season.weeks[0]])
})

test('getWeeksInSeasonSoFar returns the correct weeks with all schedules set', () => {
    const season = new SeasonModel(3)

    // set all work options to something
    season.weeks.forEach(week => {
        week.workDays = week.workDays.map(wd =>
            new WorkDayModel(
                wd.day,
                wd.forecast,
                TRIM_WORK_OPTION
            )
        )
    })

    // should now be all weeks
    expect(season.getWeeksInSeasonSoFar()).toEqual(season.weeks)
})

test('toApiObject works as expected', () => {
    const model = new SeasonModel(1)
    model.weeks[0].workDays = model.weeks[0].workDays.map(wd =>
        new WorkDayModel(
            wd.day,
            SUNNY_WEATHER_OPTION,
            TRIM_WORK_OPTION
        )
    )

    const expected: SeasonApiObject = {
        maxAllowableWeeks: 1,
        weeks: [{
            id: 1,
            workDays: [
                {day: MONDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()},
                {day: TUESDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()},
                {day: WEDNESDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()},
                {day: THURSDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()},
                {day: FRIDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()},
                {day: SATURDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()},
                {day: SUNDAY.toApiObject(), forecast: SUNNY_WEATHER_OPTION.toApiObject(), workOption: TRIM_WORK_OPTION.toApiObject()}
            ]
        }]
    }

    expect(model.toApiObject()).toEqual(expected)
})

test('copy works as expected', () => {
    const model = new SeasonModel(1)
    const copy= model.copy()

    expect(JSON.stringify(copy)).toEqual(JSON.stringify(model))
    expect(copy).not.toBe(model)
})
