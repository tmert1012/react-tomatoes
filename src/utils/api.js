import { days, options } from './_data'

export function getInitialData() {
    return Promise.all([
        getDays(),
        getOptions(),
    ]).then(([days, options]) => ({
        days,
        options,
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