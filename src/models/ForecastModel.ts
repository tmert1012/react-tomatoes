import {ForecastApiObject} from "src/api_objects/ForecastApiObject.ts"

/**
 * ForecastModel - a model for a weather forecast option
 */
class ForecastModel {
    id: WeatherOptionId
    title: string

    constructor(id: WeatherOptionId, title: string) {
        this.id = id
        this.title = title
    }

    toApiObject(): ForecastApiObject {
        return {
            id: this.id,
            title: this.title
        }
    }

    copy(): ForecastModel {
        return new ForecastModel(this.id, this.title)
    }
}


export enum WeatherOptionId {
    SUNNY = 'sunny',
    RAIN = 'rain',
    OVERCAST = 'overcast',
}

export const SUNNY_WEATHER_OPTION = new ForecastModel(WeatherOptionId.SUNNY,'Sunny')
export const RAIN_WEATHER_OPTION = new ForecastModel(WeatherOptionId.RAIN,'Rain')
export const OVERCAST_WEATHER_OPTION = new ForecastModel(WeatherOptionId.OVERCAST,'Overcast')

export const ALL_WEATHER_OPTIONS: Array<ForecastModel> = [
    SUNNY_WEATHER_OPTION,
    RAIN_WEATHER_OPTION,
    OVERCAST_WEATHER_OPTION,
]

export default ForecastModel