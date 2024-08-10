import {StatusParamsApiObject, StatusResultsApiObject} from "src/api_objects/StatusApiObjects.ts"

/**
 * StatusModel - class to check the status of the game
 */
class StatusModel {
    params: StatusParamsApiObject

    constructor(params: StatusParamsApiObject) {
        this.params = params
    }

    /**
     * gameIsLost - Check if the game is lost.
     * - at least one schedule is set, we need some input from the user before checking if the game is lost.
     *
     * @returns boolean
     */
    gameIsLost = (): boolean => {
        if (this.params.atLeastOneScheduleSet) {
            return (this.params.overcastFollowsDayOfRain || this.params.isOverWatered)
        }
        return false
    }

    /**
     * gameIsWon - Check if the game is won.
     *
     * NOTE: this doesn't include any checks if the gameIsLost, so this should be called after gameIsLost.
     *
     * @returns boolean
     */
    gameIsWon = (): boolean => {
        return this.params.isSeasonComplete
    }

    /**
     * getStatusResults - get the game results in a convenient object to store in state
     */
    getStatusResults = (): StatusResultsApiObject => {
        return {
            currentWeek: this.params.currentWeek,
            overcastFollowsDayOfRain: this.params.overcastFollowsDayOfRain,
            isOverWatered: this.params.isOverWatered,
            atLeastOneScheduleSet: this.params.atLeastOneScheduleSet,
            isSeasonComplete: this.params.isSeasonComplete,
            gameIsLost: this.gameIsLost(),
            gameIsWon: this.gameIsWon()
        }
    }
}

export default StatusModel