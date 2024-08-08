import ForecastModel, {WeatherOptionId} from "src/models/ForecastModel.ts"

test('toApiObject works as expected', () => {
    const forecastModel = new ForecastModel(WeatherOptionId.SUNNY, 'Sunny')
    expect(forecastModel.toApiObject()).toEqual({
        id: WeatherOptionId.SUNNY,
        title: 'Sunny'
    })
})

test('copy works as expected', () => {
    const forecastModel = new ForecastModel(WeatherOptionId.SUNNY, 'Sunny')
    const copy = forecastModel.copy()
    expect(copy).toEqual(forecastModel)
    expect(copy).not.toBe(forecastModel)
})