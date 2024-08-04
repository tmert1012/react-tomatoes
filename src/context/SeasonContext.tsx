import React, {createContext, FC, useEffect, useState} from 'react'
import Season from "../models/Season"
import Week from "../models/Week"
import WorkOption from "../models/WorkOption"
import Rules from "../models/Rules.ts"
import Status, {DEFAULT_STATUS_RESULTS, StatusResults} from "../models/Status.ts"

/**
 * set the total number of weeks for a season
 */
const WEEKS_IN_SEASON: number = 8

interface SeasonContextValue {
    season: Season,
    results: StatusResults,
    getCurrentWeek: () => Week
    setWorkOption: (dayId: number, workOption: WorkOption) => void,
    resetSeason: () => void
}

/**
 * SeasonContext.tsx
 *
 * A context to build and store the current [Season].
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
    const [season, setSeason] = useState<Season>(new Season(WEEKS_IN_SEASON))
    const [results, setResults] = useState<StatusResults>(DEFAULT_STATUS_RESULTS)

    // reset the results when the season changes
    useEffect(
        () => {
            const rules = new Rules(season)
            setResults(new Status({
                overcastFollowsDayOfRain: rules.overcastFollowsDayOfRain(),
                isOverWatered: rules.isOverWatered(),
                atLeastOneScheduleSet: season.atLeastOneScheduleSet(),
                isSeasonComplete: season.isSeasonComplete()
            }).getStatusResults())
        },
        [season]
    )

    const setWorkOption = (dayId: number, workOption: WorkOption) => {
        const seasonCopy = {...season}

        const week = seasonCopy.getCurrentWeek()
        const workDay = week.getWorkDay(dayId)
        workDay.workOption = workOption

        setSeason(seasonCopy)
    }

    /**
     * resetSeason - reset the season to a new season
     */
    const resetSeason = () => {
        const newSeason = new Season(WEEKS_IN_SEASON)
        setSeason(newSeason)
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

