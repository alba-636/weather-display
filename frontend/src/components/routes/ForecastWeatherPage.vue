<script setup lang="ts">
import ForecastWeather from '../weather/ForecastWeather.vue';

const props = withDefaults(
    defineProps<{ days?: string }>(),
    { days: '3' }
)
</script>

<template>
    <div class="d-flex fill-height align-center justify-center">
        <ForecastWeather :days="Number(props.days)" />
    </div>
</template>
