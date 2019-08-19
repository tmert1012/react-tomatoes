import { days, options, weather, season } from './_data'

export function getInitialData() {
    return Promise.all([
        getDays(),
        getOptions(),
        getWeather(),
        getSeason(),
    ]).then(([days, options, weather, season]) => ({
        days,
        options,
        weather,
        season
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

function getSeason () {
    return new Promise((res, rej) => {

        const weatherKeys = Object.keys(weather)

        // each week
        for (let weekId = 1; weekId <= 8; weekId++) {

            season[weekId] = {
                weekId,
                schedule: {}
            }

            // each day of the week
            Object.keys(days).forEach((dayId) => {
                season[weekId].schedule[dayId] = {
                    dayId,
                    weatherId: weatherKeys[Math.floor(Math.random() * weatherKeys.length)],
                    optionId: '',
                }
            })
        }

        setTimeout(() => res({...season}), 1000)
    })
}