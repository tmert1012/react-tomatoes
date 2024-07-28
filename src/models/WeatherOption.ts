export enum WeatherOptionId {
    SUNNY = 'sunny',
    RAIN = 'rain',
    OVERCAST = 'overcast',
}

interface WeatherOption {
    id: WeatherOptionId,
    title: string,
}

export const SUNNY_WEATHER_OPTION: WeatherOption = {id: WeatherOptionId.SUNNY, title: 'Sunny'}
export const RAIN_WEATHER_OPTION: WeatherOption = {id: WeatherOptionId.RAIN, title: 'Rain'}
export const OVERCAST_WEATHER_OPTION: WeatherOption = {id: WeatherOptionId.OVERCAST, title: 'Overcast'}

export const ALL_WEATHER_OPTIONS: Array<WeatherOption> = [
    SUNNY_WEATHER_OPTION,
    RAIN_WEATHER_OPTION,
    OVERCAST_WEATHER_OPTION,
]

export default WeatherOption