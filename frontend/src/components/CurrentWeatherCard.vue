<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { useWeatherStore } from '@/stores/weather';
import { computed, onUnmounted, ref, watch } from 'vue';

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
    console.log(`lat: ${lat} lon:${lon}`)
    fetchCurrentMeteo()
})

const dateInterval = setInterval(() => {
    date.value = new Date()
}, 10_000);

const updateWeatherInterval = setInterval(fetchCurrentMeteo, 10000)

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

        <v-card-text v-if="hasCurrentWeatherData">
            <p>{{ weatherStore.current?.current.temperature_2m }}{{ weatherStore.current?.current_units.temperature_2m }}</p>
            <p>Humidity: {{ weatherStore.current?.current.relative_humidity_2m }}{{ weatherStore.current?.current_units.relative_humidity_2m }}</p>
            <p>Precipitation: {{ weatherStore.current?.current.precipitation }}{{ weatherStore.current?.current_units.precipitation }}</p>
            <p>Rain: {{ weatherStore.current?.current.rain }}{{ weatherStore.current?.current_units.rain }}</p>
            <p>Cloud cover: {{ weatherStore.current?.current.cloud_cover }}{{ weatherStore.current?.current_units.cloud_cover }}</p>

            <p>Wind: {{ weatherStore.current?.current.wind_speed_10m }}{{ weatherStore.current?.current_units.wind_speed_10m }}</p>
            <p>Direction: {{ weatherStore.current?.current.wind_direction_10m }}{{ weatherStore.current?.current_units.wind_direction_10m }}</p>
            <p>Gust: {{ weatherStore.current?.current.wind_gusts_10m }}{{ weatherStore.current?.current_units.wind_gusts_10m }}</p>


        </v-card-text>
    </v-card>
</template>

<script lang="ts">



</script>