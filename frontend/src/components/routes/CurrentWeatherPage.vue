<script setup lang="ts">
import OpenMeteoLocalStorage from '@/features/openMeteoLocalStorage.ts';
import CurrentWeatherCard from '../weather/CurrentWeatherCard.vue'

const model = OpenMeteoLocalStorage.getModel()
</script>

<template>
    <div class="d-flex fill-height align-start justify-center">
        <CurrentWeatherCard
            :model="model"
            class="mt-16" />
    </div>
</template>
