<script setup lang="ts">
import GPSController from '@/features/GPSController'
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

updatePosition()
</script>

<template>
    <p>Hello, World</p>
    <p>lat: {{ store.latitude }} lon: {{ store.longitude }}</p>
    <button @click="updatePosition">reresh</button>
</template>

<script lang="ts">
console.log('test')

</script>