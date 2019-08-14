import { hideLoading, showLoading } from "react-redux-loading"
import { getInitialData } from '../utils/api'
import { receiveDays } from './days'
import { receiveOptions } from './options'
import { receiveWeather } from "./weather"
import { receiveSeason} from "./season"

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({days, options, weather, season}) => {
                dispatch(receiveDays(days))
                dispatch(receiveOptions(options))
                dispatch(receiveWeather(weather))
                dispatch(receiveSeason(season))
                dispatch(hideLoading())
            })
    }
}