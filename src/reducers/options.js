import { RECEIVE_OPTIONS } from '../actions/options'

export default function options(state = {}, action) {

    switch (action.type) {
        case RECEIVE_OPTIONS:
            return {
                ...state,
                ...action.options
            }
        default:
            return state
    }

}