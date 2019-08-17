export const RECEIVE_SEASON = 'RECEIVE_SEASON'
export const UPDATE_DAY_OPTION = 'UPDATE_DAY_OPTION'

export function receiveSeason(season) {
    return {
        type: RECEIVE_SEASON,
        season,
    }
}

export function updateDayOption(weekId, dayId, optionId) {
    return {
        type: UPDATE_DAY_OPTION,
        weekId,
        dayId,
        optionId
    }
}

export function handleUpdateDayOption(weekId, dayId, optionId) {
    return (dispatch) => {
        dispatch(updateDayOption(weekId, dayId, optionId))
    }
}


