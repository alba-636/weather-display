<script setup lang="ts">
import { type Hourly } from '@/features/openMeteoController';
import { usePositionStore } from '@/stores/position';
import { useWeatherStore } from '@/stores/weather';
import { computed, watch } from 'vue';
import ForecastDayWeatherCard from './ForecastDayWeatherCard.vue';

const props = defineProps<{
    days: number
}>()

const positionStore = usePositionStore()
const weatherStore = useWeatherStore()

const hasPosition = computed(() => {
    return positionStore.latitude !== 0 && positionStore.longitude !== 0
})

// Bulk data by days
const dailyForecastWeather = computed(() => {
    if (!weatherStore.hourlyForecast?.hourly?.time || weatherStore.hourlyForecast.hourly.time.length <= 0) return []

    const daily: Record<string, Hourly> = {}

    const length = weatherStore.hourlyForecast.hourly.time.length
    for (let i = 0; i < length; i++) {
        const datetime = weatherStore.hourlyForecast.hourly.time[i]
        if (!datetime) continue

        const day = getDay(datetime)
        if (!!daily[day]) {
            // Use existing record
            Object.keys(weatherStore.hourlyForecast.hourly).forEach((key) => {
                const value = weatherStore.hourlyForecast?.hourly?.[key]?.[i]
                if (value !== undefined && daily[day]) {
                    daily[day][key]?.push(value)
                }
            })
            
        } else {
            // Create new record
            const hourly: Record<string, (string|number)[]> = {}
            Object.keys(weatherStore.hourlyForecast.hourly).forEach((key) => {
                const value = weatherStore.hourlyForecast?.hourly?.[key]?.[i]
                if (value !== undefined) {
                    hourly[key] = [value]
                }
            })

            daily[day] = hourly
        }
    }

    return daily
})

async function fetchForecastWeather() {
    if (!hasPosition) return console.warn('[CurrentWeatherCard] Not position found!')
    await weatherStore.updateHourlyForecastWeather(positionStore.latitude, positionStore.longitude, props.days)
}

function getDay (datetime: string): string {
    return datetime.slice(0, 10)
}

if (positionStore.latitudeShort && positionStore.longitudeShort) fetchForecastWeather()
watch([() => positionStore.latitudeShort, () => positionStore.longitudeShort], ([lat, lon]) => {
    fetchForecastWeather()
})

</script>

<template>
    <div class="d-flex overflow-auto">
        <div v-for="(hourly, key) of dailyForecastWeather">
            <ForecastDayWeatherCard
                class="ma-4"
                :day="key.toString()"
                :hourly="hourly" />
        </div>
    </div>    
</template>
