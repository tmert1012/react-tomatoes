import {WorkDayApiObject} from "src/api_objects/WorkDayApiObject.ts"

/**
 * WeekApiObject
 *
 * serialized/api object for [WeekModel]
 */
export interface WeekApiObject {
    id: number
    workDays: WorkDayApiObject[]
}