import { RECEIVE_SEASON, UPDATE_DAY_OPTION } from '../actions/season'

export default function season(state = {}, action) {

    switch (action.type) {
        case RECEIVE_SEASON:
            return {
                ...state,
                ...action.season
            }
        case UPDATE_DAY_OPTION: {
            const {weekId, dayId, optionId} = action

            return {
                ...state,
                [weekId]: {
                    ...state[weekId],
                    schedule: {
                        ...state[weekId].schedule,
                        [dayId]: {
                            ...state[weekId].schedule[dayId],
                            optionId
                        },
                    }
                }
            }

        }
        default:
            return state
    }

}