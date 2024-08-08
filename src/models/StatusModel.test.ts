import StatusModel from "./StatusModel.ts"

test('gameIsLost returns false when no conditions are met', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: false,
        isOverWatered: false,
        atLeastOneScheduleSet: false,
        isSeasonComplete: false
    })
    expect(status.gameIsLost()).toBe(false)
})

test('gameIsLost returns false when atLeastOneScheduleSet is false', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: true,
        isOverWatered: true,
        atLeastOneScheduleSet: false,
        isSeasonComplete: false
    })
    expect(status.gameIsLost()).toBe(false)
})

test('gameIsLost returns false whe no conditions are met and season is complete', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: false,
        isOverWatered: false,
        atLeastOneScheduleSet: true,
        isSeasonComplete: true
    })
    expect(status.gameIsLost()).toBe(false)
})

test('gameIsLost returns true when overcastFollowsDayOfRain is true', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: true,
        isOverWatered: false,
        atLeastOneScheduleSet: true,
        isSeasonComplete: false
    })
    expect(status.gameIsLost()).toBe(true)
})

test('gameIsLost returns true when isOverWatered is true', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: false,
        isOverWatered: true,
        atLeastOneScheduleSet: true,
        isSeasonComplete: false
    })
    expect(status.gameIsLost()).toBe(true)
})

test('gameIsLost returns true when overcastFollowsDayOfRain and isOverWatered are true', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: true,
        isOverWatered: true,
        atLeastOneScheduleSet: true,
        isSeasonComplete: false
    })
    expect(status.gameIsLost()).toBe(true)
})

test('gameIsLost returns true when condition is met and season is complete', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: true,
        isOverWatered: true,
        atLeastOneScheduleSet: true,
        isSeasonComplete: true
    })
    expect(status.gameIsLost()).toBe(true)
})

test('gameIsWon returns false when no conditions are met', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: false,
        isOverWatered: false,
        atLeastOneScheduleSet: false,
        isSeasonComplete: false
    })
    expect(status.gameIsWon()).toBe(false)
})

test('gameIsWon returns true when season is complete', () => {
    const status = new StatusModel({
        overcastFollowsDayOfRain: false,
        isOverWatered: false,
        atLeastOneScheduleSet: false,
        isSeasonComplete: true
    })
    expect(status.gameIsWon()).toBe(true)
})