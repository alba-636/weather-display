<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { computed, onUnmounted, ref, watch } from 'vue';
import Wind from './indicator/wind/Wind.vue';
import Humidity from './indicator/Humidity.vue';
import CloudCover from './indicator/CloudCover.vue';
import Thermometer from './indicator/Thermometer.vue';
import { useWeatherStore } from '@/stores/weatherStore.ts';

const positionStore = usePositionStore()
const weatherStore = useWeatherStore()

const date = ref(new Date())

const hasPosition = computed(() => {
    return positionStore.latitude !== 0 && positionStore.longitude !== 0
})

const hasCurrentWeatherData = computed(() => {
    return weatherStore.currentWeather !== null
})

const dateFomatted = computed(() => {
    return date.value.toLocaleString('fr-FR', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
})

async function fetchCurrentMeteo() {
    try {
        await weatherStore.getCurrentWeather()
    } catch (error) {
        console.error('[CurrentWeatherCard:fetchCurrentMeteo]', error)
    }
}

if (positionStore.latitudeShort && positionStore.longitudeShort) fetchCurrentMeteo()
watch([() => positionStore.latitudeShort, () => positionStore.longitudeShort], () => {
    fetchCurrentMeteo()
})

const dateInterval = setInterval(() => {
    date.value = new Date()
}, 10_000);

const updateWeatherInterval = setInterval(fetchCurrentMeteo, 60_000)

onUnmounted(() => {
    clearInterval(dateInterval)
    clearInterval(updateWeatherInterval)
})
</script>

<template>
    <v-card
        :loading="!hasCurrentWeatherData || !hasPosition"
        max-width="400">
        <v-card-item>
            <v-card-title class="text-center">{{ dateFomatted }}</v-card-title>
        </v-card-item>

        <v-card-text v-if="weatherStore.currentWeather">
            <div class="d-flex flex-wrap justify-space-evenly">
                <thermometer
                    v-if="weatherStore.currentWeather.current.temperature_2m"
                    :temperature="weatherStore.currentWeather.current.temperature_2m" />
    
                <humidity
                    v-if="weatherStore.currentWeather.current.relative_humidity_2m"
                    :humidity="weatherStore.currentWeather.current.relative_humidity_2m" />
    
                <cloud-cover
                    v-if="weatherStore.currentWeather.current.cloud_cover"
                    :cloud-cover="weatherStore.currentWeather.current.cloud_cover" />
    
                <wind
                    v-if="weatherStore.currentWeather.current.wind_speed_10m && weatherStore.currentWeather.current.wind_gusts_10m && weatherStore.currentWeather.current.wind_direction_10m"
                    :wind-speed="weatherStore.currentWeather.current.wind_speed_10m"
                    :gust-speed="weatherStore.currentWeather.current.wind_gusts_10m"
                    :direction="weatherStore.currentWeather.current.wind_direction_10m" />
            </div>
        </v-card-text>
    </v-card>
</template>
