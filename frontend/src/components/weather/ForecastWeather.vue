<script setup lang="ts">
import OpenMeteoController, { type Hourly, type HourlyForecastWeather } from '@/features/openMeteoController';
import { usePositionStore } from '@/stores/position';
import { computed, ref, watch } from 'vue';
import ForecastDayWeatherCard from './ForecastDayWeatherCard.vue';
import type { OpenMeteoModels } from '@/features/openMeteoLocalStorage.ts';

const props = defineProps<{
    days: number,
    model?: OpenMeteoModels,
}>()

const positionStore = usePositionStore()

const isLoadingWeather = ref<boolean>(true)
const hourlyForecast = ref<HourlyForecastWeather | null>(null)

const hasPosition = computed(() => {
    return positionStore.latitude !== 0 && positionStore.longitude !== 0
})

// Bulk data by days
const dailyForecastWeather = computed(() => {
    if (!hourlyForecast.value?.hourly?.time || hourlyForecast.value.hourly.time.length <= 0) return []

    const daily: Record<string, Hourly> = {}

    const length = hourlyForecast.value.hourly.time.length
    for (let i = 0; i < length; i++) {
        const datetime = hourlyForecast.value.hourly.time[i]
        if (!datetime) continue

        const day = getDay(datetime)
        if (!!daily[day]) {
            // Use existing record
            Object.keys(hourlyForecast.value.hourly).forEach((key) => {
                const value = hourlyForecast.value?.hourly?.[key]?.[i]
                if (value !== undefined && daily[day]) {
                    daily[day][key]?.push(value)
                }
            })
            
        } else {
            // Create new record
            const hourly: Record<string, (string|number)[]> = {}
            Object.keys(hourlyForecast.value.hourly).forEach((key) => {
                const value = hourlyForecast.value?.hourly?.[key]?.[i]
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
    isLoadingWeather.value = true
    const hourly = await OpenMeteoController.fetchForecast(positionStore.latitude, positionStore.longitude, props.days, props.model)
    if (hourly) {
        hourlyForecast.value = hourly
    }
    isLoadingWeather.value = false
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
    <!-- Loader -->
     <v-progress-circular
        v-if="isLoadingWeather"
        indeterminate
        size="32"
        width="4" />

    <!-- Forecast Weather -->
    <div
        v-else
        class="container d-flex fill-height overflow-auto">
        <div v-for="(hourly, key) of dailyForecastWeather">
            <ForecastDayWeatherCard
                :day="key.toString()"
                :hourly="hourly" />
        </div>
    </div>    
</template>

<style lang="css" scoped>
.container div:not(:first-child) {
    margin-left: 8px;
}
</style>
