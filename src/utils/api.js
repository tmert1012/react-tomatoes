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
        setTimeout(() => res({...season}), 1000)
    })
}

export function saveSeason(weekId, dayId, weatherId, optionId) {
    console.log(`saveSeason(${weekId}, ${dayId}, ${weatherId}, ${optionId})`)

    return new Promise((res, rej) => {
        if (!season[weekId])
            season[weekId] = {
                weekId,
                schedule: {},
            }

        season[weekId] = {
            weekId,
            schedule: {
                ...season[weekId].schedule,
                [dayId]: {dayId, weatherId, optionId}
            }
        }

        console.log(season)
        res()
    })

}