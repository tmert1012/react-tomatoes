import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import days from './days'
import options from './options'
import weather from './weather'

export default combineReducers({
    days,
    options,
    weather,
    loadingBar: loadingBarReducer,
})