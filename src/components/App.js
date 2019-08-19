import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'
import Header from './Header'
import Week from "./Week"
import Failed from './Failed'
import {receiveCurrentWeek} from "../actions/currentWeek"
import Won from './Won'

class App extends Component {

    WEEKS_IN_SEASON = 8

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    checkGameOver() {
        const { season, weekId, days } = this.props

        if (season[weekId] && season[weekId].schedule) {
            const schedule = season[weekId].schedule

            // option selected for all seven days
            const scheduleComplete = Object.keys(schedule).filter( dayId => schedule[dayId].optionId === '' ).length === 0

            // get weather
            const weather = Object.keys(days).map( dayId => schedule[dayId].weatherId)

            // overcast follows a day of rain, fail
            let overcastFollowsRain = false
            for (let i = 0; i < weather.length-1; i++)
                if (weather[i] === 'rain' && weather[i+1] === 'overcast')
                    overcastFollowsRain = true

            //console.log(`checkGameOver(): weekId: ${weekId}, scheduleComplete: ${scheduleComplete}, overcastFollowsRain: ${overcastFollowsRain}`)

            // game is lost
            if (scheduleComplete && overcastFollowsRain)
                return true

            // continue to following week
            if (scheduleComplete && weekId <= this.WEEKS_IN_SEASON)
                this.props.dispatch(receiveCurrentWeek( {weekId: weekId+1}))
        }

        return false
    }

    render() {
        const { loading, weekId } = this.props

        let component
        if (this.checkGameOver())
            component = <Failed />
        else if (weekId <= this.WEEKS_IN_SEASON)
            component = <Week />
        else
            component = <Won />

        return (
            <div>
                <LoadingBar />
                { loading
                    ? null
                    :
                    <div>
                        <Header />
                        <div style={{ padding:10 }}>
                            { component }
                        </div>
                    </div>
                }
            </div>
        )
    }

}

function mapStateToProps({ days, season, currentWeek, loadingBar }) {
    return {
        days,
        season,
        weekId: currentWeek.weekId,
        loading: loadingBar.default === 1,
    }
}

export default connect(mapStateToProps)(App)
