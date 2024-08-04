import Rules from "../models/Rules.ts"
import Season from "../models/Season.ts"
import {OVERCAST_WEATHER_OPTION, RAIN_WEATHER_OPTION, SUNNY_WEATHER_OPTION} from "../models/WeatherOption.ts"
import {SPRAY_WORK_OPTION, TRIM_WORK_OPTION, WATER_WORK_OPTION, WEED_WORK_OPTION} from "../models/WorkOption.ts"

test('Rules constructor works as expected', () => {
    const season = new Season(3)
    const rules = new Rules(season)
    expect(rules.season).toBe(season)
})

test('overcastFollowsDayOfRain returns true with conditions set on the first week', () => {
    const season = new Season(3)

    // set the first week to have a day of rain followed by a day of overcast
    season.weeks[0].workDays[0].forecast = RAIN_WEATHER_OPTION
    season.weeks[0].workDays[1].forecast = OVERCAST_WEATHER_OPTION

    // set the first week of work options to something
    season.weeks[0].workDays.forEach(wd => wd.workOption = WEED_WORK_OPTION)

    const rules = new Rules(season)
    expect(rules.overcastFollowsDayOfRain()).toBe(true)
})

test('overcastFollowsDayOfRain returns true with conditions set on week 2 but not week 1', () => {
    const season = new Season(3)

    // set the first week to a sunny everyday to ensure it doesn't trigger the rule
    season.weeks[0].workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION)

    // set the first week work options to something
    season.weeks[0].workDays.forEach(wd => wd.workOption = WEED_WORK_OPTION)

    // set the second week to have a day of rain followed by a day of overcast
    season.weeks[1].workDays[0].forecast = RAIN_WEATHER_OPTION
    season.weeks[1].workDays[1].forecast = OVERCAST_WEATHER_OPTION

    // set the second week work options to something
    season.weeks[1].workDays.forEach(wd => wd.workOption = WEED_WORK_OPTION)

    const rules = new Rules(season)
    expect(rules.overcastFollowsDayOfRain()).toBe(true)
})

test('overcastFollowsDayOfRain returns false with sunny conditions for the entire season`', () => {
    const season = new Season(3)

    // set all weeks to have sunny conditions
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    const rules = new Rules(season)
    expect(rules.overcastFollowsDayOfRain()).toBe(false)
})

test('overcastFollowsDayOfRain returns false with a day of rain but no overcast', () => {
    const season = new Season(3)

    // set all weeks to have sunny conditions
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    // set the first week to have a day of rain
    season.weeks[0].workDays[0].forecast = RAIN_WEATHER_OPTION

    const rules = new Rules(season)
    expect(rules.overcastFollowsDayOfRain()).toBe(false)
})

test('isOverWatered returns false with all sunny conditions', () => {
    const season = new Season(3)

    // reset all forecasts to sunny
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    const rules = new Rules(season)
    expect(rules.isOverWatered()).toBe(false)
})

test('isOverWatered returns false with all sunny conditions and no watering', () => {
    const season = new Season(3)

    // reset all forecasts to sunny
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    // set all work options to weeding
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.workOption = WEED_WORK_OPTION))

    const rules = new Rules(season)
    expect(rules.isOverWatered()).toBe(false)
})

test('isOverWatered returns true with 4 days of watering', () => {
    const season = new Season(3)

    // reset all forecasts to sunny
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    // set the first week to have 4 days of watering (monday, wednesday, friday, sunday)
    season.weeks[0].workDays[0].workOption = WATER_WORK_OPTION
    season.weeks[0].workDays[1].workOption = WEED_WORK_OPTION
    season.weeks[0].workDays[2].workOption = WATER_WORK_OPTION
    season.weeks[0].workDays[3].workOption = WEED_WORK_OPTION
    season.weeks[0].workDays[4].workOption = WATER_WORK_OPTION
    season.weeks[0].workDays[5].workOption = WEED_WORK_OPTION
    season.weeks[0].workDays[6].workOption = WATER_WORK_OPTION

    const rules = new Rules(season)
    expect(rules.isOverWatered()).toBe(true)
})

test('isOverWatered returns true with 4 days of rain', () => {
    const season = new Season(3)

    // reset all forecasts to sunny
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    // set the first week to have 4 days of rain (monday, wednesday, friday, sunday)
    season.weeks[0].workDays[0].forecast = RAIN_WEATHER_OPTION
    season.weeks[0].workDays[1].forecast = SUNNY_WEATHER_OPTION
    season.weeks[0].workDays[2].forecast = RAIN_WEATHER_OPTION
    season.weeks[0].workDays[3].forecast = SUNNY_WEATHER_OPTION
    season.weeks[0].workDays[4].forecast = RAIN_WEATHER_OPTION
    season.weeks[0].workDays[5].forecast = SUNNY_WEATHER_OPTION
    season.weeks[0].workDays[6].forecast = RAIN_WEATHER_OPTION

    // set the first week work options to something
    season.weeks[0].workDays.forEach(wd => wd.workOption = WEED_WORK_OPTION)

    const rules = new Rules(season)
    expect(rules.isOverWatered()).toBe(true)
})

test('isOverWatered returns true with two days of watering and two days of rain`', () => {
    const season = new Season(3)

    // reset all forecasts to sunny
    season.weeks.forEach(week => week.workDays.forEach(wd => wd.forecast = SUNNY_WEATHER_OPTION))

    // set the first week to have 2 days of watering and 2 days of rain
    season.weeks[0].workDays[0].workOption = WATER_WORK_OPTION
    season.weeks[0].workDays[1].workOption = WEED_WORK_OPTION
    season.weeks[0].workDays[2].workOption = TRIM_WORK_OPTION
    season.weeks[0].workDays[3].workOption = SPRAY_WORK_OPTION
    season.weeks[0].workDays[4].workOption = WATER_WORK_OPTION
    season.weeks[0].workDays[5].workOption = WEED_WORK_OPTION
    season.weeks[0].workDays[6].workOption = TRIM_WORK_OPTION

    // reset the forecst
    season.weeks[0].workDays[2].forecast = RAIN_WEATHER_OPTION
    season.weeks[0].workDays[3].forecast = SUNNY_WEATHER_OPTION
    season.weeks[0].workDays[6].forecast = RAIN_WEATHER_OPTION

    const rules = new Rules(season)
    expect(rules.isOverWatered()).toBe(true)
})
