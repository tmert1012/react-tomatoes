import React, {FC, useEffect} from 'react'
import Header from 'src/components/Header'
import Week from "src/components/Week"
import Failed from 'src/components/Failed'
import Won from 'src/components/Won'
import {useSeasonContext} from "src/context/SeasonContext.tsx"
import {useHistoryIndexedDbContext} from "src/context/HistoryIndexedDbContext.tsx"

const App: FC = () => {
    const {results, season} = useSeasonContext()
    const {add} = useHistoryIndexedDbContext()

    /**
     * useEffect to add the game results to the IndexedDB database when the game is over
     *
     * check if season.id has changed before saving results. we only want to save the season to the db once.
     */
    useEffect(
        () => {
            if (results.gameIsLost || results.gameIsWon) {
                add({
                    season: season.toApiObject(),
                    results: results,
                    gameDate: new Date().toISOString()
                })
            }
        },
        [add, results, season, season.id]
    )

    let component: React.ReactNode
    if (results.gameIsLost)
        component = <Failed/>
    else if (results.gameIsWon)
        component = <Won/>
    else
        component = <Week/>

    return (
        <div>
            <div>
                <Header/>
                <div style={{padding: 10}}>
                    {component}
                </div>
            </div>
        </div>
    )
}

export default App

