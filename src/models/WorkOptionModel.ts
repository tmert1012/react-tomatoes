import {WorkOptionApiObject} from "src/api_objects/WorkOptionApiObject.ts"

/**
 * WorkOptionModel - a model for a work option
 */
class WorkOptionModel {
    id: WorkOptionId
    title: string
    description: string

    constructor(id: WorkOptionId, title: string, description: string) {
        this.id = id
        this.title = title
        this.description = description
    }

    toApiObject(): WorkOptionApiObject {
        return {
            id: this.id,
            title: this.title,
            description: this.description
        }
    }

    copy(): WorkOptionModel {
        return new WorkOptionModel(this.id, this.title, this.description)
    }
}

export enum WorkOptionId {
    WEED = 'weed',
    WATER = 'water',
    TRIM = 'trim',
    TRELLIS = 'trellis',
    SPRAY = 'spray',
}

export const WEED_WORK_OPTION = new WorkOptionModel(
    WorkOptionId.WEED,
    'Weed',
    'Remove weeds from the garden'
)
export const WATER_WORK_OPTION = new WorkOptionModel(
    WorkOptionId.WATER,
    'Water',
    'Water the plants in the garden'
)
export const TRIM_WORK_OPTION = new WorkOptionModel(
    WorkOptionId.TRIM,
    'Trim',
    'Trim the plants in the garden'
)
export const TRELLIS_WORK_OPTION = new WorkOptionModel(
    WorkOptionId.TRELLIS,
    'Trellis',
    'Add trellis to the plants in the garden'
)
export const SPRAY_WORK_OPTION = new WorkOptionModel(
    WorkOptionId.SPRAY,
    'Spray',
    'Spray the plants in the garden'
)

export const ALL_WORK_OPTIONS: Array<WorkOptionModel> = [
    WEED_WORK_OPTION,
    WATER_WORK_OPTION,
    TRIM_WORK_OPTION,
    TRELLIS_WORK_OPTION,
    SPRAY_WORK_OPTION,
]

export default WorkOptionModel