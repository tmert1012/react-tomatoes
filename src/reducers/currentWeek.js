import { RECEIVE_CURRENT_WEEK } from '../actions/currentWeek'

export default function currentWeek(state = {}, action) {

    switch (action.type) {
        case RECEIVE_CURRENT_WEEK:
            return {
                ...state,
                ...action.weekId
            }
        default:
            return state
    }

}