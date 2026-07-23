<script setup lang="ts">
import OpenMeteoLocalStorage from '@/features/openMeteoLocalStorage';
import { ref } from 'vue';

const forecastDays = ref(OpenMeteoLocalStorage.getForecastDays())

function updateForecastDays (newDays: number) {
    forecastDays.value = newDays
    OpenMeteoLocalStorage.setForecastDays(forecastDays.value)
}
</script>

<template>
    <v-list-item>
        <v-list-item-title>
            Forecast days:
        </v-list-item-title>

        <template v-slot:append>
            <v-number-input
                :model-value="forecastDays"
                :min="1"
                :max="14"
                hide-details
                min-width="142px"
                variant="outlined"
                density="comfortable"
                @update:model-value="updateForecastDays" />
        </template>
    </v-list-item>
</template>

<style lang="css" scoped>
.v-list-item-title {
    user-select: none;
}
</style>
