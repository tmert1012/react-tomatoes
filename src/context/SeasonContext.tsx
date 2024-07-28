/**
 * SeasonContext.tsx
 *
 * A context to build and store the current [Season].
 */

import React, {createContext, FC, useState} from 'react'
import Season from "../models/Season"
import Week from "../models/Week"
import WorkOption from "../models/WorkOption"
import Rules from "../models/Rules.ts"

/**
 * set the total number of weeks for a season
 */
const WEEKS_IN_SEASON: number = 8

interface SeasonContextValue {
    season: Season,
    rules: Rules,
    getCurrentWeek: () => Week
    setWorkOption: (dayId: number, workOption: WorkOption) => void,
    resetSeason: () => void
}

const SeasonContext = createContext<SeasonContextValue>({
    season: null,
    rules: null,
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
    const rules = new Rules(season)

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
        setSeason(new Season(WEEKS_IN_SEASON))
    }

    return (
        <SeasonContext.Provider
            value={{
                season: season,
                rules: rules,
                getCurrentWeek: season.getCurrentWeek,
                setWorkOption: setWorkOption,
                resetSeason: resetSeason
            }}>
            {children}
        </SeasonContext.Provider>
    )
}

export const useSeasonContext = () => React.useContext(SeasonContext)

