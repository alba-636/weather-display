<script setup lang="ts">
import GPSController from '@/features/GPSController'
import OpenMeteoController from '@/features/openMeteoController';
import { usePositionStore } from '@/stores/position'
import { ref } from 'vue'

const store = usePositionStore()

async function updatePosition() {
    try {
        await store.updatePosition()
    } catch (error) {
        console.error('[updatePosition]', error)
    }
}

async function fetchMeteo() {
    await OpenMeteoController.fetchCurrent(store.latitude, store.longitude)
}
</script>

<template>
    <p>Hello, World</p>
    <p>lat: {{ store.latitude }} lon: {{ store.longitude }}</p>
    <button @click="updatePosition">reresh</button>
    <br>
<button @click="fetchMeteo">Meteo</button>
</template>

<script lang="ts">
console.log('test')

</script>