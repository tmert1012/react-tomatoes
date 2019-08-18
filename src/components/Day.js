import React, { Component } from 'react'
import { Card, OverlayTrigger, Tooltip, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleUpdateDayOption } from '../actions/season'

class Day extends Component {
    state = {
        selectedOptionId: '',
        currentWeek: '',
    }

    optionSelected = (e, optionId) => {
        const { day, weekId } = this.props

        this.setState(() => ({
            selectedOptionId: optionId,
            currentWeek: weekId,
        }))

        this.props.dispatch(handleUpdateDayOption(weekId, day.id, optionId))
    }

    render() {
        const { day, forecast, options, weekId } = this.props
        const { selectedOptionId, currentWeek } = this.state

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header>{day.title}</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={`../icons/${forecast.icon}`} />
                    <Card.Title>{forecast.title}</Card.Title>
                    <ButtonGroup vertical>
                        {Object.keys(options).map((key) => (
                            <OverlayTrigger
                                key={key}
                                delay={1000}
                                overlay={<Tooltip>{options[key].description}</Tooltip>}>
                                    <Button
                                        block={true}
                                        key={key}
                                        onClick={(e) => this.optionSelected(e, options[key].id)}
                                        active={ currentWeek !== weekId ? false : selectedOptionId === options[key].id }>
                                        {options[key].title}
                                    </Button>
                            </OverlayTrigger>
                        ))}
                    </ButtonGroup>
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