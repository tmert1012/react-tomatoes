import {SUNDAY} from "src/models/DayModel.ts"
import {OVERCAST_WEATHER_OPTION} from "src/models/ForecastModel.ts"
import {TRELLIS_WORK_OPTION} from "src/models/WorkOptionModel.ts"
import WorkDayModel from "src/models/WorkDayModel.ts"
import {WorkDayApiObject} from "src/api_objects/WorkDayApiObject.ts"

test('toApiObject works as expected', () => {
    const workDayModel = new WorkDayModel(
        SUNDAY,
        OVERCAST_WEATHER_OPTION,
        TRELLIS_WORK_OPTION
    )

    const expected: WorkDayApiObject = {
        day: SUNDAY.toApiObject(),
        forecast: OVERCAST_WEATHER_OPTION.toApiObject(),
        workOption: TRELLIS_WORK_OPTION.toApiObject()
    }

    expect(workDayModel.toApiObject()).toEqual(expected)
})

test('copy works as expected', () => {
    const workDayModel = new WorkDayModel(
        SUNDAY,
        OVERCAST_WEATHER_OPTION,
        TRELLIS_WORK_OPTION
    )

    const copy = workDayModel.copy()

    expect(JSON.stringify(copy)).toEqual(JSON.stringify(workDayModel))
    expect(copy).not.toBe(workDayModel)
})

test('setWorkOption works as expected', () => {
    const workDayModel = new WorkDayModel(
        SUNDAY,
        OVERCAST_WEATHER_OPTION,
        null
    )

    workDayModel.setWorkOption(TRELLIS_WORK_OPTION)

    expect(workDayModel.workOption).toEqual(TRELLIS_WORK_OPTION)
})