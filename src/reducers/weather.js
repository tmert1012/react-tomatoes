import { RECEIVE_WEATHER } from '../actions/weather'

export default function weather(state = {}, action) {

    switch (action.type) {
        case RECEIVE_WEATHER:
            return {
                ...state,
                ...action.weather
            }
        default:
            return state
    }

}