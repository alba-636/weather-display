
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

class OpenMeteoController {
    private static fetchOpenMeteo (params: OpenMeteoParams): Promise<Response> {
        return fetch(`${FORECAST_URL}?${new URLSearchParams(params as any).toString()}`)
    }

    static async fetchCurrent (
        latitude: number,
        longitude: number
    ): Promise<CurrentWeather | null | undefined> {
        try {
            const response = await OpenMeteoController.fetchOpenMeteo(
                {
                    latitude: latitude,
                    longitude: longitude,
                    timezone: "auto",
                    current: [
                        CurrentWeatherVariable.temperature_2m,
                        CurrentWeatherVariable.relative_humidity_2m,
                        CurrentWeatherVariable.cloud_cover,
                        CurrentWeatherVariable.wind_speed_10m,
                        CurrentWeatherVariable.wind_direction_10m,
                        CurrentWeatherVariable.wind_gusts_10m,
                    ]
                }
            )
            const json = await response.json()
            return json
        } catch (error) {
            console.error('[OpenMeteoController:fetchCurrent]', error)
        }
    }

    static async fetchForecast (
        latitude: number,
        longitude: number,
        forecastDays: number = 7
    ): Promise<HourlyForecastWeather | null | undefined> {
        try {
            const response = await OpenMeteoController.fetchOpenMeteo(
                {
                    latitude: latitude,
                    longitude: longitude,
                    timezone: "auto",
                    forecast_days: forecastDays,
                    hourly: [
                        ForecastWeatherVariable.temperature_2m,
                        ForecastWeatherVariable.relative_humidity_2m,
                        ForecastWeatherVariable.cloud_cover,
                        ForecastWeatherVariable.wind_speed_10m,
                        ForecastWeatherVariable.wind_direction_10m,
                        ForecastWeatherVariable.wind_gusts_10m,
                        ForecastWeatherVariable.precipitation,
                        ForecastWeatherVariable.precipitation_probability,
                    ]
                }
            )
            const json = await response.json()
            return json
        } catch (error) {
            console.error('[OpenMeteoController:fetchCurrent]', error)
        }
    }
}

enum CurrentWeatherVariable {
    temperature_2m = "temperature_2m",
    apparent_temperature = "apparent_temperature",
    is_day = "is_day",
    precipitation = "precipitation",
    rain = "rain",
    wind_speed_10m = "wind_speed_10m",
    wind_direction_10m = "wind_direction_10m",
    weather_code = "weather_code",
    cloud_cover = "cloud_cover",
    relative_humidity_2m = "relative_humidity_2m",
    showers = "showers",
    snowfall = "snowfall",
    pressure_msl = "pressure_msl",
    surface_pressure = "surface_pressure",
    wind_gusts_10m = "wind_gusts_10m"
}

enum ForecastWeatherVariable {
    temperature_2m = "temperature_2m",
    relative_humidity_2m = "relative_humidity_2m",
    dew_point_2m = "dew_point_2m",
    apparent_temperature = "apparent_temperature",
    precipitation_probability = "precipitation_probability",
    precipitation = "precipitation",
    rain = "rain",
    showers = "showers",
    snowfall = "snowfall",
    snow_depth = "snow_depth",
    weather_code = "weather_code",
    pressure_msl = "pressure_msl",
    surface_pressure = "surface_pressure",
    cloud_cover = "cloud_cover",
    cloud_cover_mid = "cloud_cover_mid",
    cloud_cover_low = "cloud_cover_low",
    cloud_cover_high = "cloud_cover_high",
    visibility = "visibility",
    evapotranspiration = "evapotranspiration",
    et0_fao_evapotranspiration = "et0_fao_evapotranspiration",
    vapour_pressure_deficit = "vapour_pressure_deficit",
    wind_speed_10m = "wind_speed_10m",
    wind_speed_80m = "wind_speed_80m",
    wind_speed_120m = "wind_speed_120m",
    wind_speed_180m = "wind_speed_180m",
    wind_direction_10m = "wind_direction_10m",
    wind_direction_80m = "wind_direction_80m",
    wind_direction_120m = "wind_direction_120m",
    wind_direction_180m = "wind_direction_180m",
    wind_gusts_10m = "wind_gusts_10m",
    temperature_80m = "temperature_80m",
    temperature_120m = "temperature_120m",
    temperature_180m = "temperature_180m",
    soil_temperature_0cm = "soil_temperature_0cm",
    soil_temperature_6cm = "soil_temperature_6cm",
    soil_temperature_18cm = "soil_temperature_18cm",
    soil_temperature_54cm = "soil_temperature_54cm",
    soil_moisture_0_to_1cm = "soil_moisture_0_to_1cm",
    soil_moisture_1_to_3cm = "soil_moisture_1_to_3cm",
    soil_moisture_3_to_9cm = "soil_moisture_3_to_9cm",
    soil_moisture_9_to_27cm = "soil_moisture_9_to_27cm",
    soil_moisture_27_to_81cm = "soil_moisture_27_to_81cm"
}

export interface OpenMeteoParams {
    latitude: number,
    longitude: number,
    timezone: string,
    forecast_days?: number,
    current?: string[],
    hourly?: string[],
}

export interface CurrentWeather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}

export interface CurrentUnits {
  time?: string
  interval?: string
  temperature_2m?: string
  relative_humidity_2m?: string
  is_day?: string
  precipitation?: string
  rain?: string
  wind_speed_10m?: string
  wind_direction_10m?: string
  cloud_cover?: string
  wind_gusts_10m?: string
}

export interface Current {
  time?: string
  interval?: number
  temperature_2m?: number
  relative_humidity_2m?: number
  is_day?: number
  precipitation?: number
  rain?: number
  wind_speed_10m?: number
  wind_direction_10m?: number
  cloud_cover?: number
  wind_gusts_10m?: number
}

export interface HourlyForecastWeather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: Hourly
}

export interface HourlyUnits {
  time?: string
  temperature_2m?: string
  relative_humidity_2m?: string
  dew_point_2m?: string
  apparent_temperature?: string
  precipitation_probability?: string
  precipitation?: string
  rain?: string
  showers?: string
  snowfall?: string
  snow_depth?: string
  weather_code?: string
  pressure_msl?: string
  surface_pressure?: string
  cloud_cover?: string
  cloud_cover_mid?: string
  cloud_cover_low?: string
  cloud_cover_high?: string
  visibility?: string
  evapotranspiration?: string
  et0_fao_evapotranspiration?: string
  vapour_pressure_deficit?: string
  wind_speed_10m?: string
  wind_speed_80m?: string
  wind_speed_120m?: string
  wind_speed_180m?: string
  wind_direction_10m?: string
  wind_direction_80m?: string
  wind_direction_120m?: string
  wind_direction_180m?: string
  wind_gusts_10m?: string
  temperature_80m?: string
  temperature_120m?: string
  temperature_180m?: string
  soil_temperature_0cm?: string
  soil_temperature_6cm?: string
  soil_temperature_18cm?: string
  soil_temperature_54cm?: string
  soil_moisture_0_to_1cm?: string
  soil_moisture_1_to_3cm?: string
  soil_moisture_3_to_9cm?: string
  soil_moisture_9_to_27cm?: string
  soil_moisture_27_to_81cm?: string
}

export interface Hourly extends Record<string,(string|number)[] | undefined> {
  time?: string[]
  temperature_2m?: number[]
  relative_humidity_2m?: number[]
  dew_point_2m?: number[]
  apparent_temperature?: number[]
  precipitation_probability?: number[]
  precipitation?: number[]
  rain?: number[]
  showers?: number[]
  snowfall?: number[]
  snow_depth?: number[]
  weather_code?: number[]
  pressure_msl?: number[]
  surface_pressure?: number[]
  cloud_cover?: number[]
  cloud_cover_mid?: number[]
  cloud_cover_low?: number[]
  cloud_cover_high?: number[]
  visibility?: number[]
  evapotranspiration?: number[]
  et0_fao_evapotranspiration?: number[]
  vapour_pressure_deficit?: number[]
  wind_speed_10m?: number[]
  wind_speed_80m?: number[]
  wind_speed_120m?: number[]
  wind_speed_180m?: number[]
  wind_direction_10m?: number[]
  wind_direction_80m?: number[]
  wind_direction_120m?: number[]
  wind_direction_180m?: number[]
  wind_gusts_10m?: number[]
  temperature_80m?: number[]
  temperature_120m?: number[]
  temperature_180m?: number[]
  soil_temperature_0cm?: number[]
  soil_temperature_6cm?: number[]
  soil_temperature_18cm?: number[]
  soil_temperature_54cm?: number[]
  soil_moisture_0_to_1cm?: number[]
  soil_moisture_1_to_3cm?: number[]
  soil_moisture_3_to_9cm?: number[]
  soil_moisture_9_to_27cm?: number[]
  soil_moisture_27_to_81cm?: number[]
}



export default OpenMeteoController
