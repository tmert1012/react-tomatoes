import React, {createContext, FC, useEffect, useState} from 'react'
import SeasonModel from "src/models/SeasonModel.ts"
import WeekModel from "src/models/WeekModel.ts"
import WorkOptionModel from "src/models/WorkOptionModel.ts"
import RulesModel from "src/models/RulesModel.ts"
import StatusModel from "src/models/StatusModel.ts"
import {StatusResultsApiObject, DEFAULT_STATUS_RESULTS} from "src/api_objects/StatusApiObjects.ts"

/**
 * set the total number of weeks for a season
 */
const WEEKS_IN_SEASON: number = 8

interface SeasonContextValue {
    season: SeasonModel,
    results: StatusResultsApiObject,
    getCurrentWeek: () => WeekModel
    setWorkOption: (dayId: number, workOption: WorkOptionModel) => void,
    resetSeason: () => void
}

/**
 * SeasonContext.tsx
 *
 * A context to build and store the current [SeasonModel].
 */
const SeasonContext = createContext<SeasonContextValue>({
    season: null,
    results: null,
    getCurrentWeek: () => null,
    setWorkOption: () => {},
    resetSeason: () => null
})

export const SeasonContextProvider: FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
    const [season, setSeason] = useState<SeasonModel>(new SeasonModel(WEEKS_IN_SEASON))
    const [results, setResults] = useState<StatusResultsApiObject>(DEFAULT_STATUS_RESULTS)

    // reset the results when the season changes
    useEffect(
        () => {
            const rules = new RulesModel(season)
            setResults(new StatusModel({
                currentWeek: season.getCurrentWeek().id,
                overcastFollowsDayOfRain: rules.overcastFollowsDayOfRain(),
                isOverWatered: rules.isOverWatered(),
                atLeastOneScheduleSet: season.atLeastOneScheduleSet(),
                isSeasonComplete: season.isSeasonComplete()
            }).getStatusResults())
        },
        [season]
    )

    const setWorkOption = (dayId: number, workOption: WorkOptionModel) => {
        const seasonCopy = season.copy()

        const week = seasonCopy.getCurrentWeek()
        const workDay = week.getWorkDay(dayId)
        workDay.setWorkOption(workOption)

        setSeason(seasonCopy)
    }

    /**
     * resetSeason - reset the season to a new season
     */
    const resetSeason = () => {
        setResults(DEFAULT_STATUS_RESULTS)
        setSeason(new SeasonModel(WEEKS_IN_SEASON))
    }

    return (
        <SeasonContext.Provider
            value={{
                season: season,
                results: results,
                getCurrentWeek: season.getCurrentWeek,
                setWorkOption: setWorkOption,
                resetSeason: resetSeason
            }}>
            {children}
        </SeasonContext.Provider>
    )
}

export const useSeasonContext = () => React.useContext(SeasonContext)

