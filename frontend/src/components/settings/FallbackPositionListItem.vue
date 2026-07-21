<script setup lang="ts">
import type { Position } from '@/features/GPSController';
import GPSController from '@/features/GPSController';
import { ref } from 'vue';

const fallbackPosition = ref<Position>(GPSController.getFallbackPosition())

function updateLatitude (newLatitude: number) {
    fallbackPosition.value.lat = newLatitude
    GPSController.setFallbackPosition(fallbackPosition.value)
}

function updateLongitude (newLongitude: number) {
    fallbackPosition.value.lon = newLongitude
    GPSController.setFallbackPosition(fallbackPosition.value)
}
</script>

<template>
    <v-list-item>
        <v-list-item-title>
            Fallback position:
        </v-list-item-title>

        <template v-slot:append>
            <!-- Latitude -->
            <v-number-input
                :model-value="fallbackPosition.lat"
                :min="0"
                :max="90"
                :precision="2"
                label="Latitude"
                hide-details
                min-width="142px"
                variant="outlined"
                density="comfortable"
                control-variant="hidden"
                class="mr-4"
                @update:model-value="updateLatitude" />

            <!-- Longitude -->
            <v-number-input
                :model-value="fallbackPosition.lon"
                :min="0"
                :max="180"
                :precision="2"
                label="Longitude"
                hide-details
                min-width="142px"
                variant="outlined"
                density="comfortable"
                control-variant="hidden"
                @update:model-value="updateLongitude" />
        </template>
    </v-list-item>
</template>