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
     * isSeasonComplete - check if all work options are selected for all days in all weeks
     */
    isSeasonComplete = (): boolean => {
        return this.weeks.every(week => week.isScheduleSet())
    }

    /**
     * getCurrentWeek - get the current week
     * - if no weeks have a schedule set, return the first week
     * - if all weeks have a schedule set, return the last week
     * - otherwise, return the first week without a schedule set
     */
    getCurrentWeek = (): Week => {
        const week = this.weeks.find(week => !week.isScheduleSet())

        // if undefined, return the last week in the season
        const weekId = (week === undefined) ? this.maxAllowableWeeks : week.id

        return this.weeks.find(week => week.id === weekId)
    }

    /**
     * atLeastOneScheduleSet - checks all weeks to see if at least one schedule is set
     */
    atLeastOneScheduleSet = (): boolean => {
        return this.weeks.some(week => week.isScheduleSet())
    }

    /**
     * findScheduleInProgress - find the first week with a schedule in progress
     */
    findScheduleInProgress = (): Week | undefined => {
        return this.weeks.find(week => week.isScheduleInProgress())
    }

    /**
     * getWeeksInSeasonSoFar - get the weeks of the season we've set work options, so far
     */
    getWeeksInSeasonSoFar = (): Week[] => {
        return this.weeks.filter(week => week.isScheduleSet())
    }

}

export default Season