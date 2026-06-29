
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

// 45.904907802 lon: 6.111833645
/*
https://api.open-meteo.com/v1/forecast
    ?latitude=45.9
    &longitude=6.11
    &hourly=temperature_2m,precipitation_probability,precipitation,soil_temperature_0cm,wind_speed_10m,wind_direction_10m
    &timezone=Europe%2FLondon
*/
class OpenMeteoController {
    private static fetchOpenMeteo (url: string, params: OpenMeteoParams): Promise<Response> {
        return fetch(`${url}?${new URLSearchParams(params as any).toString()}`)
    }

    static async fetchCurrent (latitude: number, longitude: number): Promise<CurrentWeather | null | undefined> {
        try {
            const response = await OpenMeteoController.fetchOpenMeteo(
                "https://api.open-meteo.com/v1/forecast",
                {
                    latitude: latitude,
                    longitude: longitude,
                    timezone: "GMT+1",
                    current: [
                        CurrentWeatherVariable.temperature_2m,
                        CurrentWeatherVariable.relative_humidity_2m,
                        CurrentWeatherVariable.is_day,
                        CurrentWeatherVariable.precipitation,
                        CurrentWeatherVariable.rain,
                        CurrentWeatherVariable.wind_speed_10m,
                        CurrentWeatherVariable.wind_direction_10m,
                        CurrentWeatherVariable.cloud_cover,
                        CurrentWeatherVariable.wind_gusts_10m,
                    ]
                }
            )
            const json = await response.json()
            console.log('result:', json)
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

export interface OpenMeteoParams {
    latitude: number,
    longitude: number,
    timezone: string,
    current?: string[],
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
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  is_day: string
  precipitation: string
  rain: string
  wind_speed_10m: string
  wind_direction_10m: string
  cloud_cover: string
  wind_gusts_10m: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  is_day: number
  precipitation: number
  rain: number
  wind_speed_10m: number
  wind_direction_10m: number
  cloud_cover: number
  wind_gusts_10m: number
}


export default OpenMeteoController
