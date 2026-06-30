<script setup lang="ts">
import WindDirectionIcon from './WindDirectionIcon.vue';

const props = defineProps<{
    windSpeed: number,
    gustSpeed: number,
    direction: number,
}>()

</script>

<template>
    <div>
        <v-icon
            size="x-large"
            icon="mdi-weather-windy" />

        {{ props.windSpeed }}km/h

        {{ props.gustSpeed }}km/h

        <wind-direction-icon :direction="props.direction" />
    </div>
</template>
