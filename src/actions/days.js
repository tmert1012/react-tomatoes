export const RECEIVE_DAYS = 'RECEIVE_DAYS'

export function receiveDays(days) {
    return {
        type: RECEIVE_DAYS,
        days,
    }
}
