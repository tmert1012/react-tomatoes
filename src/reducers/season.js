import { RECEIVE_SEASON, UPDATE_SEASON } from '../actions/season'

export default function season(state = {}, action) {

    switch (action.type) {
        case RECEIVE_SEASON:
            return {
                ...state,
                ...action.season
            }
        case UPDATE_SEASON:
            const { weekId, dayId, weatherId, optionId } = action

            let prevSchedule = {}
            if (state.season)
                prevSchedule = state.season[weekId].schedule

            return {
                ...state,
                season: {
                    ...state.season,
                    [weekId]: {
                        weekId,
                        schedule: {
                            ...prevSchedule,
                            [dayId]: {dayId, weatherId, optionId},
                        }
                    }
                }
            }
        default:
            return state
    }

}