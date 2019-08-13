export const RECEIVE_OPTIONS = 'RECEIVE_OPTIONS'

export function receiveOptions(options) {
    return {
        type: RECEIVE_OPTIONS,
        options,
    }
}