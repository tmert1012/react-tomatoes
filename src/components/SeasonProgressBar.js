import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { connect } from 'react-redux'

class SeasonProgressBar extends Component {

    render() {
        const { perc, weekId } = this.props

        return (
            <div>
                { `Week: ${weekId}` }
                <ProgressBar striped animated variant="success" now={perc} />
            </div>
        )
    }

}

function mapStateToProps({ season, currentWeek }) {
    return {
        perc: Math.floor(currentWeek.weekId/Object.keys(season).length*100 ),
        weekId: currentWeek.weekId,
    }
}

export default connect(mapStateToProps)(SeasonProgressBar)