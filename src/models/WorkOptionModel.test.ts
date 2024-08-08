import {WEED_WORK_OPTION} from "src/models/WorkOptionModel.ts"
import {WorkOptionApiObject} from "src/api_objects/WorkOptionApiObject.ts"

test('toApiObject works as expected', () => {
    const expected: WorkOptionApiObject = {
        id: 'weed',
        title: 'Weed',
        description: 'Remove weeds from the garden'
    }

    expect(WEED_WORK_OPTION.toApiObject()).toEqual(expected)
})

test('copy works as expected', () => {
    const copy = WEED_WORK_OPTION.copy()

    expect(copy).toEqual(WEED_WORK_OPTION)
    expect(copy).not.toBe(WEED_WORK_OPTION)
})