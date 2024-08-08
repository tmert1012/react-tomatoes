import {DayApiObject} from "src/api_objects/DayApiObject.ts"

/**
 * DayModel - a model for a day of the week
 */
class DayModel {
    id: number
    displayName: string

    constructor(id: number, displayName: string) {
        this.id = id
        this.displayName = displayName
    }

    toApiObject(): DayApiObject {
        return {
            id: this.id,
            displayName: this.displayName
        }
    }

    copy(): DayModel {
        return new DayModel(this.id, this.displayName)
    }
}

export const MONDAY = new DayModel(1, 'Monday')
export const TUESDAY = new DayModel(2, 'Tuesday')
export const WEDNESDAY = new DayModel(3, 'Wednesday')
export const THURSDAY = new DayModel(4, 'Thursday')
export const FRIDAY = new DayModel(5, 'Friday')
export const SATURDAY = new DayModel(6, 'Saturday')
export const SUNDAY = new DayModel(7, 'Sunday')

export const ALL_DAYS: Array<DayModel> = [
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
]

export default DayModel