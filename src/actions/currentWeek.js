export const RECEIVE_CURRENT_WEEK = 'RECEIVE_CURRENT_WEEK'

export function receiveCurrentWeek(weekId) {
    return {
        type: RECEIVE_CURRENT_WEEK,
        weekId,
    }
}



