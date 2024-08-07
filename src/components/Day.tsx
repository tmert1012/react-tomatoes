import React, {FC} from 'react'
import { Card, OverlayTrigger, Tooltip, Button, ButtonGroup } from 'react-bootstrap'
import Overcast from 'src/icons/wi-cloudy.svg'
import Sunny from 'src/icons/wi-day-sunny.svg'
import Rain from 'src/icons/wi-day-rain.svg'
import {useSeasonContext} from "src/context/SeasonContext"
import WorkDayModel from "src/models/WorkDayModel.ts"
import {WeatherOptionId} from "src/models/ForecastModel.ts"
import {ALL_WORK_OPTIONS} from "src/models/WorkOptionModel.ts"

const Day: FC<{
    workDay: WorkDayModel
}> = ({
    workDay
}) => {
    const {setWorkOption} = useSeasonContext()

    let icon: string
    switch (workDay.forecast.id) {
        case WeatherOptionId.SUNNY:
            icon = Sunny
            break
        case WeatherOptionId.RAIN:
            icon = Rain
            break
        case WeatherOptionId.OVERCAST:
            icon = Overcast
            break
        default:
            icon = Sunny
    }

    return (
        <Card className="flex-fill">
            <Card.Header>{workDay.day.displayName}</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={icon} />
                <Card.Title>{workDay.forecast.title}</Card.Title>
                <ButtonGroup vertical style={{width: "100%"}}>
                    {ALL_WORK_OPTIONS.map((workOption) => (
                        <OverlayTrigger
                            key={workOption.id}
                            delay={1000}
                            overlay={<Tooltip>{workOption.title}</Tooltip>}
                        >
                            <span style={{width: '100%', paddingBottom: '5px'}}>
                                <Button
                                    style={{width: '100%'}}
                                    key={workOption.id}
                                    onClick={(e) => setWorkOption(workDay.day.id, workOption)}
                                    active={(workDay.workOption?.id === workOption.id)}>
                                    {workOption.title}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    ))}
                    <OverlayTrigger
                        key="noaction"
                        delay={1000}
                        overlay={<Tooltip>Take the day off!</Tooltip>}>
                              <span style={{width: '100%'}}>
                                <Button
                                    key="noaction"
                                    style={{width: '100%', pointerEvents: 'none'}}
                                    disabled
                                >
                                    Do Nothing
                                </Button>
                              </span>
                    </OverlayTrigger>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default Day