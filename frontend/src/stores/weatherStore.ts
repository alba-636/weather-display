import type { CurrentWeather, HourlyForecastWeather } from '@/features/openMeteoController'
import OpenMeteoController from '@/features/openMeteoController'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePositionStore } from './position'
import OpenMeteoLocalStorage from '@/features/openMeteoLocalStorage'

export const useWeatherStore = defineStore('weather-store', () => {
    const currentWeather = ref<CurrentWeather>()
    const forecastWeather = ref<HourlyForecastWeather>()
    
    async function getCurrentWeather () {
        const positionStore = usePositionStore()
        const weather = await OpenMeteoController.fetchCurrent(
            positionStore.latitude,
            positionStore.longitude,
            OpenMeteoLocalStorage.getModel()
        )
        if (weather) currentWeather.value = weather
    }

    async function getForecastWeather() {
        const positionStore = usePositionStore()
        const hourly = await OpenMeteoController.fetchForecast(
            positionStore.latitude,
            positionStore.longitude,
            OpenMeteoLocalStorage.getForecastDays(),
            OpenMeteoLocalStorage.getModel(),
        )
        if (hourly) forecastWeather.value = hourly
    }

    return { currentWeather, forecastWeather, getCurrentWeather, getForecastWeather }
})
