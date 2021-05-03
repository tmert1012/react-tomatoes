import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux'

function Row({ day, weekId, weather, options }) {
    return  <tr key={`${weekId}${day.dayId}`}>
        <td>{weekId}</td>
        <td>{weather[day.weatherId].title}</td>
        <td>{ day.optionId ? options[day.optionId].title : '' }</td>
    </tr>
}

class History extends Component {

    render() {
        const { season, loading, weather, currentWeekId, options } = this.props
        let key = 0

        let rows =
            Object.keys(season).filter( weekId => weekId <= currentWeekId ).flatMap((weekId) => (
                Object.keys(season[weekId].schedule).map((dayId) => (
                    <Row
                        weekId={weekId}
                        day={season[weekId].schedule[dayId]}
                        key={key++}
                        weather={weather}
                        options={options}
                    />
                ))
            ))

        return (
            <div>
                { loading
                    ? null
                    : (
                        <div style={{ width: '50%' }}>
                            <div style={{ marginTop: 10, marginBottom: 5 }}>Work History</div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Week #</th>
                                    <th>Weather</th>
                                    <th>Work</th>
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

function mapStateToProps({ season, weather, currentWeek, options }) {
    return {
        season,
        weather,
        currentWeekId: currentWeek.weekId,
        options
    }
}

export default connect(mapStateToProps)(History)
