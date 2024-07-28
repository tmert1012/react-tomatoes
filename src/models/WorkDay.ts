import Day from "./Day.ts"
import WeatherOption from "./WeatherOption.ts"
import WorkOption from "./WorkOption.ts"

interface WorkDay {
    day: Day,
    forecast?: WeatherOption | null,
    workOption?: WorkOption | null,
}

export default WorkDay