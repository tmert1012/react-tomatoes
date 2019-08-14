import { RECEIVE_DAYS } from '../actions/days'

export default function days(state = {}, action) {

    switch (action.type) {
        case RECEIVE_DAYS:
            return {
                ...state,
                ...action.days
            }
        default:
            return state
    }

}