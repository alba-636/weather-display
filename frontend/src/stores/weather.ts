import OpenMeteoController, { type CurrentWeather, type HourlyForecastWeather } from '@/features/openMeteoController'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
    const current = ref<CurrentWeather>()
    const hourlyForecast = ref<HourlyForecastWeather>()

    async function updateCurrentWeather (latitude: number, longitude: number) {
        const weather = await OpenMeteoController.fetchCurrent(latitude, longitude)
        if (!weather) return

        current.value = weather
    }

    async function updateHourlyForecastWeather (latitude: number, longitude: number, days: number = 7, model: string | undefined | null = 'best_match') {
        const weather = await OpenMeteoController.fetchForecast(latitude, longitude, days, model)
        if (!weather) return

        hourlyForecast.value = weather
    }

    return { current, hourlyForecast, updateCurrentWeather, updateHourlyForecastWeather }
})
