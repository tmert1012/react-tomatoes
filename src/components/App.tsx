import React, {FC} from 'react'
import Header from 'src/components/Header'
import Week from "src/components/Week"
import Failed from 'src/components/Failed'
import Won from 'src/components/Won'
import {useSeasonContext} from "src/context/SeasonContext.tsx"

const App: FC = () => {
    const {results} = useSeasonContext()

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

