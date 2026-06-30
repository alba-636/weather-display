<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { useWeatherStore } from '@/stores/weather';
import { computed, onUnmounted, ref, watch } from 'vue';
import Wind from './indicator/wind/Wind.vue';
import Humidity from './indicator/Humidity.vue';
import CloudCover from './indicator/CloudCover.vue';
import Thermometer from './indicator/Thermometer.vue';

const positionStore = usePositionStore()
const weatherStore = useWeatherStore()

const date = ref(new Date())

const hasPosition = computed(() => {
    return positionStore.latitude !== 0 && positionStore.longitude !== 0
})

const hasCurrentWeatherData = computed(() => {
    return weatherStore.current !== null && weatherStore.current !== undefined
})

const dateFomatted = computed(() => {
    return date.value.toLocaleString('fr-FR', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
})

async function fetchCurrentMeteo() {
    if (!hasPosition) return console.warn('[CurrentWeatherCard] Not position found!')
    await weatherStore.updateCurrentWeather(positionStore.latitude, positionStore.longitude)
}

watch([() => positionStore.latitudeShort, () => positionStore.longitudeShort], ([lat, lon]) => {
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

        <v-card-text v-if="weatherStore.current">
            <div class="d-flex flex-wrap justify-space-evenly">
                <thermometer
                    class="pa-1"
                    :temperature="weatherStore.current.current.temperature_2m" />
    
                <humidity
                    class="pa-1"
                    :humidity="weatherStore.current.current.relative_humidity_2m" />
    
                <cloud-cover
                    class="pa-1"
                    :cloud-cover="weatherStore.current.current.cloud_cover" />
    
                <wind
                    class="pa-1"
                    :wind-speed="weatherStore.current.current.wind_speed_10m"
                    :gust-speed="weatherStore.current.current.wind_gusts_10m"
                    :direction="weatherStore.current.current.wind_direction_10m" />
            </div>
        </v-card-text>
    </v-card>
</template>
