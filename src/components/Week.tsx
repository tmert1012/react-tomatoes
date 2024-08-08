import React, {FC} from 'react'
import Day from 'src/components/Day'
import SeasonProgressBar from "src/components/SeasonProgressBar"
import History from 'src/components/History'
import {Col, Container, Row} from "react-bootstrap"
import {useSeasonContext} from "src/context/SeasonContext"

const Week: FC = () => {
    const {getCurrentWeek} = useSeasonContext()

    return (
        <div>
            <div>
                <SeasonProgressBar/>
                <Container fluid>
                    <Row>
                        {getCurrentWeek().workDays.map((workDay) => (
                            <Col
                                key={`col-${workDay.day.id}`}
                                xs={12} sm={6} md={4} lg={3} xl={3}
                                className={"d-flex"}
                                style={{paddingBottom: '15px'}}
                            >
                                <Day
                                    key={`day-${workDay.day.id}`}
                                    workDay={workDay}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <History/>
            </div>
        </div>
    )
}

export default Week
