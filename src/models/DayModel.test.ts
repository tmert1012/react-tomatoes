import DayModel from "src/models/DayModel.ts"

test('toApiObject works as expected', () => {
    const day = new DayModel(1, 'Monday')
    expect(day.toApiObject()).toEqual({id: 1, displayName: 'Monday'})
})

test('copy works as expected', () => {
    const day = new DayModel(1, 'Monday')
    const copy = day.copy()
    expect(copy).toEqual(day)
    expect(copy).not.toBe(day)
})