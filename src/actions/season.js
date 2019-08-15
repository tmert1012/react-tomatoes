import { saveSeason } from "../utils/api";

export const RECEIVE_SEASON = 'RECEIVE_SEASON'
export const UPDATE_SEASON = 'UPDATE_SEASON'

export function receiveSeason(season) {
    return {
        type: RECEIVE_SEASON,
        season,
    }
}

export function updateSeason(weekId, dayId, weatherId, optionId) {
    return {
        type: UPDATE_SEASON,
        weekId,
        dayId,
        weatherId,
        optionId
    }
}

export function handleUpdateSeason(weekId, dayId, weatherId, optionId) {
    return (dispatch) => {
        return saveSeason(weekId, dayId, weatherId, optionId)
            .then(() => {
                dispatch(updateSeason(weekId, dayId, weatherId, optionId))
            })
    }
}


