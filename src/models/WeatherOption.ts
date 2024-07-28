export enum WeatherOptionId {
    SUNNY = 'sunny',
    RAIN = 'rain',
    OVERCAST = 'overcast',
}

interface WeatherOption {
    id: WeatherOptionId,
    title: string,
}

export const ALL_WEATHER_OPTIONS: Array<WeatherOption> = [
    {id: WeatherOptionId.SUNNY, title: 'Sunny'},
    {id: WeatherOptionId.RAIN, title: 'Rain'},
    {id: WeatherOptionId.OVERCAST, title: 'Overcast'}
]

export default WeatherOption