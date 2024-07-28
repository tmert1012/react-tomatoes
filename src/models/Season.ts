/**
 * Season
 *
 * Contains all the base logic around a season, used directly by [SeasonContext]
 */
import Week from "./Week.ts"

class Season {
    maxAllowableWeeks: number
    weeks: Week[]

    constructor(maxAllowableWeeks: number) {
        this.maxAllowableWeeks = maxAllowableWeeks
        this.weeks = []

        for (let i = 1; i <= this.maxAllowableWeeks; i++) {
            this.weeks.push(new Week(i))
        }
    }

    /**
     * getCurrentWeekId - get the current week id. finds the first week with no work options selected
     * @returns number
     */
    getCurrentWeekId = (): number => {
        const week = this.weeks.find(week => !week.isScheduleSet())
        return week.id
    }

    /**
     * isSeasonComplete - check if all work options are selected for all days in all weeks
     */
    isSeasonComplete = (): boolean => {
        return this.weeks.every(week => week.isScheduleSet())
    }

    getCurrentWeek = (): Week => {
        const weekId = this.getCurrentWeekId()
        return this.weeks.find(week => week.id === weekId)
    }
}

export default Season