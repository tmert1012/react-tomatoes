import { RECEIVE_SEASON } from '../actions/season'

export default function season(state = {}, action) {

    switch (action.type) {
        case RECEIVE_SEASON:
            return {
                ...state,
                ...action.season
            }
        default:
            return state
    }

}