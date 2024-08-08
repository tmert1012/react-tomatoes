import {DayApiObject} from "src/api_objects/DayApiObject.ts"
import {ForecastApiObject} from "src/api_objects/ForecastApiObject.ts"
import {WorkOptionApiObject} from "src/api_objects/WorkOptionApiObject.ts"

/**
 * WorkDayApiObject
 *
 * serializable/api object for [WorkDayModel]
 */
export interface WorkDayApiObject {
    day: DayApiObject
    forecast?: ForecastApiObject | null
    workOption?: WorkOptionApiObject | null
}