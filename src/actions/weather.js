export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'

export function receiveWeather(weather) {
    return {
        type: RECEIVE_WEATHER,
        weather,
    }
}
