/**
 * Rules - game rules
 */
import Season from "../models/Season.ts"
import {WeatherOptionId} from "../models/WeatherOption.ts"
import {WorkOptionId} from "../models/WorkOption.ts"

class Rules {
    season: Season

    constructor(season: Season) {
        this.season = season
    }

    /**
     * overcastFollowsDayOfRain - Check if the day after a rainy day is overcast.
     *
     * @returns boolean
     */
    overcastFollowsDayOfRain = (): boolean => {
        this.season.weeks.forEach(week => {
            for (let i = 0; i < week.workDays.length - 1; i++) {
                const currentDayWorkId = week.workDays[i].forecast.id
                const followingDayWorkId = week.workDays[i + 1].forecast.id

                if (currentDayWorkId === WeatherOptionId.RAIN && followingDayWorkId === WeatherOptionId.OVERCAST) {
                    return true
                }
            }
        })

        return false
    }

    /**
     * isOverWatered - four or more days of rain and/or watering
     *
     * @returns boolean
     */
    isOverWatered = (): boolean => {
        return this.season.weeks.every(week => {
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
     * isGameOver - Check if the game is over.
     *
     * @returns boolean
     */
    isGameOver = (): boolean => {
        return this.season.weeks.every(week => {
            return week.isScheduleSet() && (this.overcastFollowsDayOfRain() || this.isOverWatered())
        })
    }

    /**
     * gameIsWon - Check if the game is won.
     *
     * @returns boolean
     */
    gameIsWon = (): boolean => {
        return this.season.isSeasonComplete()
    }
}

export default Rules