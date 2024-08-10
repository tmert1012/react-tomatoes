import {StatusResultsApiObject} from "src/api_objects/StatusApiObjects.ts"
import {SeasonApiObject} from "src/api_objects/SeasonApiObject.ts"

/**
 * @apiDefine HistoryApiObject
 *
 * stores the history of each game/season
 */
export interface HistoryApiObject {
    season: SeasonApiObject,
    results: StatusResultsApiObject,
    gameDate: string
}