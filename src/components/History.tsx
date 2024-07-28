import React, {FC} from 'react'
import {Table} from 'react-bootstrap'
import {useSeasonContext} from "../context/SeasonContext"
import WorkDay from "../models/WorkDay.ts"

const History: FC = () => {
    const {season, getCurrentWeek} = useSeasonContext()
    const currentWeekId = getCurrentWeek().id

    const rows = season.weeks
        .filter(week => week.id <= currentWeekId)
        .map(week => (
            week.workDays.map(workDay => (
                <Row
                    key={`${week.id}-${workDay.day.id}`}
                    weekId={week.id}
                    workDay={workDay}
                />
            ))
        ))

    return (
        <div>
            <div style={{marginTop: 10, marginBottom: 5}}>Work History</div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Week #</th>
                        <th>Day</th>
                        <th>Weather</th>
                        <th>Work</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

const Row: FC<{
    weekId: number,
    workDay: WorkDay
}> = ({
    weekId,
    workDay
}) => {
    return  (
        <tr>
            <td>{weekId}</td>
            <td>{workDay.day.displayName}</td>
            <td>{workDay.forecast.title}</td>
            <td>{workDay.workOption ? workDay.workOption?.title : '' }</td>
        </tr>
    )
}

export default History
