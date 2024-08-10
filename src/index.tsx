import React from 'react'
import App from 'src/components/App'
import {SeasonContextProvider} from "./context/SeasonContext"
import {createRoot} from "react-dom/client"
import {HistoryIndexedDbContextProvider} from "src/context/HistoryIndexedDbContext.tsx"

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <HistoryIndexedDbContextProvider>
        <SeasonContextProvider>
            <App />
        </SeasonContextProvider>
    </HistoryIndexedDbContextProvider>
)

