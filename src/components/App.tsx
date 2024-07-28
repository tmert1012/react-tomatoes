import React, {FC} from 'react'
import Header from './Header'
import Week from "./Week"
import Failed from './Failed'
import Won from './Won'
import {useSeasonContext} from "../context/SeasonContext.tsx"

const App: FC = () => {
    const {rules} = useSeasonContext()

    let component: React.ReactNode
    if (rules.gameIsLost())
        component = <Failed/>
    else if (rules.gameIsWon())
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

