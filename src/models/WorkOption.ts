export enum WorkOptionId {
    WEED = 'weed',
    WATER = 'water',
    TRIM = 'trim',
    TRELLIS = 'trellis',
    SPRAY = 'spray',
}

interface WorkOption {
    id: WorkOptionId,
    title: string,
    description: string,
}

export const WEED_WORK_OPTION: WorkOption = {
    id: WorkOptionId.WEED,
    title: 'Weed',
    description: 'Remove weeds from the garden'
}
export const WATER_WORK_OPTION: WorkOption = {
    id: WorkOptionId.WATER,
    title: 'Water',
    description: 'Water the plants in the garden'
}
export const TRIM_WORK_OPTION: WorkOption = {
    id: WorkOptionId.TRIM,
    title: 'Trim',
    description: 'Trim the plants in the garden'
}
export const TRELLIS_WORK_OPTION: WorkOption = {
    id: WorkOptionId.TRELLIS,
    title: 'Trellis',
    description: 'Add trellis to the plants in the garden'
}
export const SPRAY_WORK_OPTION: WorkOption = {
    id: WorkOptionId.SPRAY,
    title: 'Spray',
    description: 'Spray the plants in the garden'
}

export const ALL_WORK_OPTIONS: Array<WorkOption> = [
    WEED_WORK_OPTION,
    WATER_WORK_OPTION,
    TRIM_WORK_OPTION,
    TRELLIS_WORK_OPTION,
    SPRAY_WORK_OPTION,
]

export default WorkOption