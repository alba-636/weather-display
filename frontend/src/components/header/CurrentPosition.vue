<script setup lang="ts">
import { usePositionStore } from '@/stores/position';

const positionStore = usePositionStore()

const tooltip = {
    text: 'Unable to get your current GPS position, using the fallback position',
    scrollStrategy: 'close',
    scrim: true,
    persistent: false,
    openOnClick: true,
    openOnHover: false,
  }
</script>

<template>
    <p class="text-title-small ma-0">
        <span v-if="positionStore.altitudeShort">{{ positionStore.altitudeShort }}m • </span>
        <span>lat {{ positionStore.latitudeShort }}° </span>
        <span>lon {{ positionStore.longitudeShort }}° </span>

        <v-btn
            v-if="positionStore.isUsingFallback"
            v-tooltip="tooltip"
            variant="text"
            icon="mdi-alert-outline"
            color="orange" />
    </p>
</template>

<style lang="css" scoped>
p span {
    user-select: none;
}
</style>
