<script setup lang="ts">
import OpenMeteoLocalStorage from '@/features/openMeteoLocalStorage.ts';
import ForecastWeather from '../weather/ForecastWeather.vue';

const props = withDefaults(
    defineProps<{ days?: string }>(),
    { days: '3' }
)

const model = OpenMeteoLocalStorage.getModel()
</script>

<template>
    <div class="d-flex fill-height align-center justify-center">
        <ForecastWeather
            :days="Number(props.days)"
            :model="model" />
    </div>
</template>
