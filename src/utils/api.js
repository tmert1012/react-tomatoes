import { days, options, weather } from './_data'

export function getInitialData() {
    return Promise.all([
        getDays(),
        getOptions(),
        getWeather(),
    ]).then(([days, options, weather]) => ({
        days,
        options,
        weather
    }))
}

function getDays () {
    return new Promise((res, rej) => {
        setTimeout(() => res({...days}), 1000)
    })
}

function getOptions () {
    return new Promise((res, rej) => {
        setTimeout(() => res({...options}), 1000)
    })
}

function getWeather () {
    return new Promise((res, rej) => {
        setTimeout(() => res({...weather}), 1000)
    })
}