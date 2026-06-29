import OpenMeteoController, { type CurrentWeather } from '@/features/openMeteoController'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
    const current = ref<CurrentWeather>()

    async function updateCurrentWeather (latitude: number, longitude: number) {
        const weather = await OpenMeteoController.fetchCurrent(latitude, longitude)
        if (!weather) return

        current.value = weather
    } 

    return { current, updateCurrentWeather }
})
