import SeasonModel from "src/models/SeasonModel.ts"
import {WeatherOptionId} from "src/models/ForecastModel.ts"
import {WorkOptionId} from "src/models/WorkOptionModel.ts"

/**
 * RulesModel - game rules
 */
class RulesModel {
    season: SeasonModel

    constructor(season: SeasonModel) {
        this.season = season
    }

    /**
     * overcastFollowsDayOfRain - Check if in current week, the day after a rainy day is overcast.
     *
     * @returns boolean
     */
    overcastFollowsDayOfRain = (): boolean => {
        return this.season.getWeeksInSeasonSoFar().some(week =>
            week.workDays.some((workDay, index) => {
                // check for rain and exclude the last day of the week
                if (workDay.forecast.id === WeatherOptionId.RAIN && index < 7) {
                    return week.workDays[index + 1]?.forecast.id === WeatherOptionId.OVERCAST
                }
                return false
            })
        )
    }

    /**
     * isOverWatered - four or more days of rain and/or watering
     *
     * @returns boolean
     */
    isOverWatered = (): boolean => {
        return this.season.getWeeksInSeasonSoFar().some(week => {
            const wateredDays = week.workDays.filter(wd =>
                wd.workOption?.id === WorkOptionId.WATER
            ).length
            const rainyDays = week.workDays.filter(wd =>
                wd.forecast.id === WeatherOptionId.RAIN
            ).length

            return (wateredDays + rainyDays) >= 4
        })
    }

}

export default RulesModel