import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'
import Header from './Header'
import Week from "./Week"
import GameOver from './GameOver'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    checkGameOver() {
        const { season, weekId } = this.props

        if (season[weekId] && season[weekId].schedule) {
            const schedule = season[weekId].schedule
            return Object.keys(schedule).filter( dayId => schedule[dayId].optionId === '').length === 0
        }

        return false
    }

    render() {
        const { loading } = this.props

        return (
            <div>
                <LoadingBar />
                { loading
                    ? null
                    :
                    <div>
                        <Header />
                        { this.checkGameOver() ? <GameOver /> : <Week /> }
                    </div>
                }
            </div>
        )
    }

}

function mapStateToProps({ season, currentWeek, loadingBar }) {
    return {
        season,
        weekId: currentWeek.weekId,
        loading: loadingBar.default === 1,
    }
}

export default connect(mapStateToProps)(App)
