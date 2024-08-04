import WorkDay from "./WorkDay.ts"
import {ALL_DAYS} from "./Day.ts"
import {ALL_WEATHER_OPTIONS} from "./WeatherOption.ts"

class Week {
    id: number
    workDays: WorkDay[]

    /**
     * create a new week and pick random weather for each day
     * @param id - the week id
     */
    constructor(id: number) {
        this.id = id
        this.workDays = ALL_DAYS.map(day =>
            ({
                day,
                forecast: ALL_WEATHER_OPTIONS[Math.floor(Math.random() * ALL_WEATHER_OPTIONS.length)],
                workOption: null
            })
        )
    }

    getWorkDay = (dayId: number): WorkDay => {
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
}

export default Week