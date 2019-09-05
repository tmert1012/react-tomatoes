import React, { Component } from 'react'
import { Card, OverlayTrigger, Tooltip, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleUpdateDayOption } from '../actions/season'
import Overcast from '../icons/wi-cloudy.svg'
import Sunny from '../icons/wi-day-sunny.svg'
import Rain from '../icons/wi-day-rain.svg'

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

        let icon;
        switch (forecast.id) {
            case 'sunny':
                icon = Sunny
                break
            case 'rain':
                icon = Rain
                break
            case 'overcast':
                icon = Overcast
                break
            default:
                icon = Sunny
        }

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header>{day.title}</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={icon} />
                    <Card.Title>{forecast.title}</Card.Title>
                    <ButtonGroup vertical style={{ width:"100%" }}>
                        {Object.keys(options).map((key) => (
                            <OverlayTrigger
                                key={key}
                                delay={1000}
                                overlay={<Tooltip>{options[key].description}</Tooltip>}>
                                    <span style={{ width:'100%', paddingBottom: '2px' }}>
                                        <Button
                                            block={true}
                                            key={key}
                                            onClick={(e) => this.optionSelected(e, options[key].id)}
                                            active={ currentWeek !== weekId ? false : selectedOptionId === options[key].id }>
                                            {options[key].title}
                                        </Button>
                                    </span>
                            </OverlayTrigger>
                        ))}
                        <OverlayTrigger
                            key="noaction"
                            delay={1000}
                            overlay={<Tooltip>Take the day off!</Tooltip>}>
                              <span style={{ width:'100%' }}>
                                <Button
                                    block={true}
                                    key="noaction"
                                    style={{ pointerEvents: 'none' }}
                                    disabled>
                                    Do Nothing
                                </Button>
                              </span>
                        </OverlayTrigger>
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