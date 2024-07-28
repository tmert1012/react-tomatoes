import Season from "../models/Season.ts"
import {WeatherOptionId} from "../models/WeatherOption.ts"
import {WorkOptionId} from "../models/WorkOption.ts"

/**
 * Rules - game rules
 */
class Rules {
    season: Season

    constructor(season: Season) {
        this.season = season
    }

    /**
     * overcastFollowsDayOfRain - Check if in any given week, the day after a rainy day is overcast.
     *
     * @returns boolean
     */
    overcastFollowsDayOfRain = (): boolean => {
        return this.season.weeks.some(week => {
            return week.workDays.some((day, index) => {
                // check for rain and exclude the last day of the week
                if (day.forecast.id === WeatherOptionId.RAIN && index < 7) {
                    return week.workDays[index + 1]?.forecast.id === WeatherOptionId.OVERCAST
                }
                return false
            })
        })
    }

    /**
     * isOverWatered - four or more days of rain and/or watering
     *
     * @returns boolean
     */
    isOverWatered = (): boolean => {
        return this.season.weeks.some(week => {
            const wateredDays = week.workDays.filter(day =>
                day.workOption?.id === WorkOptionId.WATER
            ).length
            const rainyDays = week.workDays.filter(day =>
                day.forecast.id === WeatherOptionId.RAIN
            ).length

            return wateredDays + rainyDays >= 4
        })
    }

    /**
     * gameIsLost - Check if the game is lost.
     * - at least one schedule is set, we need some input from the user before checking if the game is lost.
     *
     * @returns boolean
     */
    gameIsLost = (): boolean => {
        if (this.season.atLeastOneScheduleSet()) {
            return (this.overcastFollowsDayOfRain() || this.isOverWatered())
        }
        return false
    }

    /**
     * gameIsWon - Check if the game is won.
     *
     * NOTE: this doesn't include any checks if the gameIsLost, so this should be called after gameIsLost.
     *
     * @returns boolean
     */
    gameIsWon = (): boolean => {
        return this.season.isSeasonComplete()
    }
}

export default Rules