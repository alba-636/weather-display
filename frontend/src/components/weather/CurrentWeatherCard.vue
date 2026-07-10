<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { computed, onUnmounted, ref, watch } from 'vue';
import Wind from './indicator/wind/Wind.vue';
import Humidity from './indicator/Humidity.vue';
import CloudCover from './indicator/CloudCover.vue';
import Thermometer from './indicator/Thermometer.vue';
import OpenMeteoController, { type CurrentWeather } from '@/features/openMeteoController.ts';
import type { OpenMeteoModels } from '@/features/openMeteoLocalStorage.ts';

const props = defineProps<{
    model?: OpenMeteoModels
}>()

const positionStore = usePositionStore()

const date = ref(new Date())
const currentWeather = ref<CurrentWeather | null>(null)

const hasPosition = computed(() => {
    return positionStore.latitude !== 0 && positionStore.longitude !== 0
})

const hasCurrentWeatherData = computed(() => {
    return currentWeather.value !== null
})

const dateFomatted = computed(() => {
    return date.value.toLocaleString('fr-FR', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
})

async function fetchCurrentMeteo() {
    if (!hasPosition) return console.warn('[CurrentWeatherCard] Not position found!')
    const weather = await OpenMeteoController.fetchCurrent(positionStore.latitude, positionStore.longitude, props.model)
    if (weather) {
        currentWeather.value = weather
    }
}

if (positionStore.latitudeShort && positionStore.longitudeShort) fetchCurrentMeteo()
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

        <v-card-text v-if="currentWeather">
            <div class="d-flex flex-wrap justify-space-evenly">
                <thermometer
                    v-if="currentWeather.current.temperature_2m"
                    :temperature="currentWeather.current.temperature_2m" />
    
                <humidity
                    v-if="currentWeather.current.relative_humidity_2m"
                    :humidity="currentWeather.current.relative_humidity_2m" />
    
                <cloud-cover
                    v-if="currentWeather.current.cloud_cover"
                    :cloud-cover="currentWeather.current.cloud_cover" />
    
                <wind
                    v-if="currentWeather.current.wind_speed_10m && currentWeather.current.wind_gusts_10m && currentWeather.current.wind_direction_10m"
                    :wind-speed="currentWeather.current.wind_speed_10m"
                    :gust-speed="currentWeather.current.wind_gusts_10m"
                    :direction="currentWeather.current.wind_direction_10m" />
            </div>
        </v-card-text>
    </v-card>
</template>
