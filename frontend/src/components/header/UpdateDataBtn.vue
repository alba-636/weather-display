<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { useWeatherStore } from '@/stores/weatherStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const positionStore = usePositionStore()
const weatherStore = useWeatherStore()

const route = useRoute()

const isLoading = ref(false)

async function updateData () {
    isLoading.value = true
    await updatePosition()

    switch (route.name) {
        case 'current-weather':
            await updateCurrentWeather()
            break
        case 'forecast-weather':
            await updateForecastWeather()
            break
    }

    isLoading.value = false
}

async function updatePosition() {
    try {
        await positionStore.updatePosition()
    } catch (error) {
        console.error('[UpdateDataBtn:updatePosition]', error)
    }
}

async function updateCurrentWeather() {
    try {
        await weatherStore.getCurrentWeather()
    } catch (error) {
        console.error('[UpdateDataBtn:updateCurrentWeather]', error)
    }
}

async function updateForecastWeather() {
    try {
        await weatherStore.getForecastWeather()
    } catch (error) {
        console.error('[UpdateDataBtn:updateForecastWeather]', error)
    }
}
</script>

<template>
  <v-btn
    :loading="isLoading"
    variant="text"
    icon="mdi-reload"
    class="mr-1"
    @click="updateData" />
</template>
