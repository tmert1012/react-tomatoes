/**
 * StatusParams - convenience for testing the status object without recreating season and rules objects
 */
export interface StatusParamsApiObject {
    currentWeek: number
    overcastFollowsDayOfRain: boolean
    isOverWatered: boolean
    atLeastOneScheduleSet: boolean
    isSeasonComplete: boolean
}

/**
 * StatusResults - results from the StatusModel class, convenience for storing the results in state
 */
export interface StatusResultsApiObject extends StatusParamsApiObject {
    gameIsLost: boolean
    gameIsWon: boolean
}

/**
 * default StatusResults for the context when the app starts
 */
export const DEFAULT_STATUS_RESULTS: StatusResultsApiObject = {
    currentWeek: 1,
    overcastFollowsDayOfRain: false,
    isOverWatered: false,
    atLeastOneScheduleSet: false,
    isSeasonComplete: false,
    gameIsLost: false,
    gameIsWon: false
}