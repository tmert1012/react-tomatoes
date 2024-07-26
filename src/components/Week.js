import React, { Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import SeasonProgressBar from "./SeasonProgressBar"
import History from './History'
import {Col, Container, Row} from "react-bootstrap"

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
                            <Container fluid>
                                <Row>
                                    { Object.keys(schedule).map((dayId) => (
                                        <Col>
                                            <Day
                                                dayId={dayId}
                                                key={dayId}
                                                weatherId={schedule[dayId].weatherId}
                                            />
                                        </Col>
                                    )) }
                                </Row>
                            </Container>
                            <History />
                        </div>
                    )
                }
            </div>
         )

    }

}

function mapStateToProps({ season, currentWeek }) {
    return {
        schedule: season[currentWeek.weekId] ? season[currentWeek.weekId].schedule : {}
    }
}

export default connect(mapStateToProps)(Week)
