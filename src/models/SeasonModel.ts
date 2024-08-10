import WeekModel from "src/models/WeekModel.ts"
import {SeasonApiObject} from "src/api_objects/SeasonApiObject.ts"

/**
 * SeasonModel
 *
 * Contains all the base logic around a season, used directly by [SeasonContext]
 */
class SeasonModel {
    id: string
    maxAllowableWeeks: number
    weeks: WeekModel[]

    /**
     * constructor
     * create a new season with a max number of allowable weeks and a list of weeks
     *
     * @param maxAllowableWeeks
     * @param weeks - default is an empty array. if no weeks are provided, they will be created
     */
    constructor(maxAllowableWeeks: number, weeks: WeekModel[] = []) {
        this.id = this.uuid()
        this.maxAllowableWeeks = maxAllowableWeeks
        this.weeks = weeks.length > 0
            ? weeks
            : Array.from({length: maxAllowableWeeks}, (_, i) => new WeekModel(i + 1))
    }

    /**
     * uuid - generate a unique id
     *
     * the common uuid packages out there either break in jest or break in the browser. this is good enough.
     */
    private uuid = () => {
        return (
            (new Date()).getTime().toString(36) + '-' +
            Math.random().toString(8).slice(2) + '-' +
            (new Date()).getTime().toString(10) + '-' +
            Math.random().toString(36).slice(2)
        )
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
    getCurrentWeek = (): WeekModel => {
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
    findScheduleInProgress = (): WeekModel | undefined => {
        return this.weeks.find(week => week.isScheduleInProgress())
    }

    /**
     * getWeeksInSeasonSoFar - get the weeks of the season we've set work options, so far
     */
    getWeeksInSeasonSoFar = (): WeekModel[] => {
        return this.weeks.filter(week => week.isScheduleSet())
    }

    toApiObject(): SeasonApiObject {
        return {
            id: this.id,
            maxAllowableWeeks: this.maxAllowableWeeks,
            weeks: this.weeks.map(week => week.toApiObject())
        }
    }

    copy(): SeasonModel {
        return new SeasonModel(
            this.maxAllowableWeeks,
            this.weeks.map(week => week.copy())
        )
    }

}

export default SeasonModel