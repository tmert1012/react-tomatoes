export const RECEIVE_SEASON = 'RECEIVE_SEASON'

export function receiveSeason(season) {
    return {
        type: RECEIVE_SEASON,
        season,
    }
}
