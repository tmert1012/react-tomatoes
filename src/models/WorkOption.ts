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

export const ALL_WORK_OPTIONS: Array<WorkOption> = [
    {id: WorkOptionId.WEED, title: 'Weed', description: 'Remove weeds from the garden'},
    {id: WorkOptionId.WATER, title: 'Water', description: 'Water the plants in the garden'},
    {id: WorkOptionId.TRIM, title: 'Trim', description: 'Trim the plants in the garden'},
    {id: WorkOptionId.TRELLIS, title: 'Trellis', description: 'Add trellis to the plants in the garden'},
    {id: WorkOptionId.SPRAY, title: 'Spray', description: 'Spray the plants in the garden'}
]

export default WorkOption