import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux'

function Row({ day, weekId }) {
    return  <tr key={`${weekId}${day.dayId}`}>
        <td>{weekId}</td>
        <td>{day.weatherId}</td>
        <td>{day.optionId}</td>
    </tr>
}

class History extends Component {

    render() {
        const { season, loading } = this.props

        let rows =
            Object.keys(season).flatMap((weekId) => (
                Object.keys(season[weekId].schedule).map((dayId) => (
                    <Row weekId={weekId} day={season[weekId].schedule[dayId]} />
                ))
            ))

        return (
            <div>
                { loading
                    ? null
                    : (
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Weather</th>
                                    <th>Option</th>
                                </tr>
                                </thead>
                                <tbody>
                                { rows }
                                </tbody>
                            </Table>
                        </div>
                    )
                }
            </div>
        )

    }

}

function mapStateToProps({ loadingBar, season }) {
    return {
        loading: loadingBar.default === 1,
        season
    }
}

export default connect(mapStateToProps)(History)
