import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { connect } from 'react-redux'

class SeasonProgressBar extends Component {

    render() {
        const { loading, perc, week } = this.props

        return (
            <div>
                { week }
                <ProgressBar striped animated variant="success" now={ loading ? 0 : perc } />
            </div>
        )
    }

}

function mapStateToProps({ season, loadingBar }) {
    return {
        loading: loadingBar.default === 1,
        perc: season.length > 0 ? Math.floor(season.length/8 ) : 0,
        week: season.length > 0 ? season[season.length-1] : null,
    }
}

export default connect(mapStateToProps)(SeasonProgressBar)