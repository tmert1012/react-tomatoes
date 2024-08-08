import React, {FC} from 'react'
import { ProgressBar } from 'react-bootstrap'
import {useSeasonContext} from "src/context/SeasonContext"

const SeasonProgressBar: FC = () => {
    const {season, getCurrentWeek} = useSeasonContext()
    const currentWeek = getCurrentWeek().id
    const percent = Math.floor(currentWeek/season.weeks.length*100)

    return (
        <div style={{marginBottom: 10}}>
            {`Week: ${currentWeek}`}
            <ProgressBar striped animated variant="success" now={percent}/>
        </div>
    )
}

export default SeasonProgressBar