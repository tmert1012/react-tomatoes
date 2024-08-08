import DayModel from "src/models/DayModel.ts"
import ForecastModel from "src/models/ForecastModel.ts"
import WorkOptionModel from "src/models/WorkOptionModel.ts"
import {WorkDayApiObject} from "src/api_objects/WorkDayApiObject.ts"

class WorkDayModel {
    day: DayModel
    forecast?: ForecastModel | null
    workOption?: WorkOptionModel | null

    constructor(day: DayModel, forecast: ForecastModel | null, workOption: WorkOptionModel | null) {
        this.day = day
        this.forecast = forecast
        this.workOption = workOption
    }

    setWorkOption = (workOption: WorkOptionModel) => {
        this.workOption = workOption
    }

    toApiObject(): WorkDayApiObject {
        return {
            day: this.day.toApiObject(),
            forecast: this.forecast !== null ? this.forecast.toApiObject() : null,
            workOption: this.workOption !== null ? this.workOption.toApiObject() : null
        }
    }

    copy(): WorkDayModel {
        return new WorkDayModel(
            this.day.copy(),
            this.forecast !== null ? this.forecast.copy() : null,
            this.workOption !== null ? this.workOption.copy() : null
        )
    }
}

export default WorkDayModel