import {WeekApiObject} from "src/api_objects/WeekApiObject.ts"

/**
 * SeasonApiObject
 *
 * serializable/opi object for [SeasonModel]
 */
export interface SeasonApiObject {
    id: string
    maxAllowableWeeks: number
    weeks: WeekApiObject[]
}