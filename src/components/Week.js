import React, { Component } from 'react'
import { CardDeck } from 'react-bootstrap'
import { connect } from 'react-redux'
import Day from './Day'
import SeasonProgressBar from "./SeasonProgressBar"

class Week extends Component {

    render() {
        const { schedule, loading } = this.props

        return (
            <div>
                { loading
                    ? null
                    : (
                        <div>
                        <SeasonProgressBar />
                        <CardDeck>
                            { Object.keys(schedule).map((dayId) => (
                                <Day
                                    dayId={dayId}
                                    key={dayId}
                                    weatherId={schedule[dayId].weatherId}

                                />
                            )) }
                        </CardDeck>
                        </div>
                    )
                }
            </div>
         )

    }

}

function mapStateToProps({ loadingBar, season, currentWeek }) {
    return {
        loading: loadingBar.default === 1,
        schedule: season[currentWeek.weekId] ? season[currentWeek.weekId].schedule : {}
    }
}

export default connect(mapStateToProps)(Week)
