/**
 * StatusParams - convenience for testing the status object without recreating season and rules objects
 */
export interface StatusParams {
    overcastFollowsDayOfRain: boolean
    isOverWatered: boolean
    atLeastOneScheduleSet: boolean
    isSeasonComplete: boolean
}

/**
 * StatusResults - results from the Status class, convenience for storing the results in state
 */
export interface StatusResults extends StatusParams {
    gameIsLost: boolean
    gameIsWon: boolean
}

/**
 * default StatusResults for the context when the app starts
 */
export const DEFAULT_STATUS_RESULTS: StatusResults = {
    overcastFollowsDayOfRain: false,
    isOverWatered: false,
    atLeastOneScheduleSet: false,
    isSeasonComplete: false,
    gameIsLost: false,
    gameIsWon: false
}

/**
 * Status - class to check the status of the game
 */
class Status {
    params: StatusParams

    constructor(params: StatusParams) {
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
    getStatusResults = (): StatusResults => {
        return {
            overcastFollowsDayOfRain: this.params.overcastFollowsDayOfRain,
            isOverWatered: this.params.isOverWatered,
            atLeastOneScheduleSet: this.params.atLeastOneScheduleSet,
            isSeasonComplete: this.params.isSeasonComplete,
            gameIsLost: this.gameIsLost(),
            gameIsWon: this.gameIsWon()
        }
    }
}

export default Status