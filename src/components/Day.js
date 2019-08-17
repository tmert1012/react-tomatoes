import React, { Component } from 'react'
import { Card, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleUpdateDayOption } from '../actions/season'

class Day extends Component {
    state = {
       selectedOptionId: '',
    }

    optionSelected = (e, optionId) => {
        const { day, weekId } = this.props

        this.setState(() => ({
            selectedOptionId: optionId,
        }))

        this.props.dispatch(handleUpdateDayOption(weekId, day.id, optionId))
    }

    render() {
        const { day, forecast, options } = this.props
        const { selectedOptionId } = this.state

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header>{day.title}</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={`../icons/${forecast.icon}`} />
                    <Card.Title>{forecast.title}</Card.Title>
                    <ListGroup>
                        {Object.keys(options).map((key) => (
                            <OverlayTrigger
                                key={key}
                                delay={1000}
                                overlay={<Tooltip>{options[key].description}</Tooltip>}>
                                    <ListGroup.Item
                                        eventKey={key}
                                        active={ selectedOptionId === options[key].id ? true : false }
                                        action
                                        onClick={(e) => this.optionSelected(e, options[key].id)}>
                                            {options[key].title}
                                    </ListGroup.Item>
                            </OverlayTrigger>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }

}

function mapStateToProps({ weather, options, days, currentWeek }, { dayId, weatherId }) {

    return {
        day: days[dayId],
        forecast: weather[weatherId],
        options,
        weekId: currentWeek.weekId,
    }
}

export default connect(mapStateToProps)(Day)