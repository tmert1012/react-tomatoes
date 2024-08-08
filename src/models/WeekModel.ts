import WorkDayModel from "src/models/WorkDayModel.ts"
import {ALL_DAYS} from "src/models/DayModel.ts"
import {ALL_WEATHER_OPTIONS} from "src/models/ForecastModel.ts"
import {WeekApiObject} from "src/api_objects/WeekApiObject.ts"

/**
 * WeekModel - a model for a week of work days
 */
class WeekModel {
    id: number
    workDays: WorkDayModel[]

    /**
     * create a new week
     *
     * @param id - the week id
     * @param workDays - an array of work days, if empty, will be created
     */
    constructor(id: number, workDays: WorkDayModel[] = []) {
        this.id = id
        this.workDays = workDays.length > 0
            ? workDays
            : ALL_DAYS.map(day =>
                new WorkDayModel(
                    day,
                    ALL_WEATHER_OPTIONS[Math.floor(Math.random() * ALL_WEATHER_OPTIONS.length)],
                    null
                )
            )
    }

    getWorkDay = (dayId: number): WorkDayModel => {
        return this.workDays.find(day => day.day.id === dayId)
    }

    /**
     * isScheduleSet - check if all work options are set for all days in a week
     */
    isScheduleSet = (): boolean => {
        return this.workDays.filter(wd => wd.workOption === null).length === 0
    }

    /**
     * isScheduleInProgress - check if any work options are set for any days in a week, but not all
     */
    isScheduleInProgress = (): boolean => {
        const workOptionSetCount = this.workDays.filter(wd => wd.workOption !== null).length
        return (workOptionSetCount > 0 && workOptionSetCount < 7)
    }

    toApiObject(): WeekApiObject {
        return {
            id: this.id,
            workDays: this.workDays.map(wd => wd.toApiObject())
        }
    }

    copy(): WeekModel {
        return new WeekModel(
            this.id,
            this.workDays.map(wd => wd.copy())
        )
    }
}

export default WeekModel