import React from 'react'
import App from './components/App'
import {SeasonContextProvider} from "./context/SeasonContext"
import {createRoot} from "react-dom/client"

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <SeasonContextProvider>
        <App />
    </SeasonContextProvider>
)

