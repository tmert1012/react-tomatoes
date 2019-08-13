import { hideLoading, showLoading } from "react-redux-loading"
import { getInitialData } from '../utils/api'
import { receiveDays } from './days'
import { receiveOptions } from './options'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({days, options}) => {
                dispatch(receiveDays(days))
                dispatch(receiveOptions(options))
                dispatch(hideLoading())
            })
    }
}