import {WeekApiObject} from "src/api_objects/WeekApiObject.ts"

/**
 * SeasonApiObject
 *
 * serializable/opi object for [SeasonModel]
 */
export interface SeasonApiObject {
    maxAllowableWeeks: number
    weeks: WeekApiObject[]
}