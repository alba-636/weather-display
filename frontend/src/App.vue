<script setup lang="ts">
import CurrentWeatherCard from './components/CurrentWeatherCard.vue';
import Test from './components/Test.vue';
import { usePositionStore } from './stores/position.ts';

const store = usePositionStore()

async function updatePosition() {
    try {
        await store.updatePosition()
    } catch (error) {
        console.error('[updatePosition]', error)
    }
}

updatePosition()
setInterval(updatePosition.bind(this), 30_000)

</script>

<template>
  <v-app>
    <CurrentWeatherCard class="ma-16"/>
    
    <Test />
  </v-app>
</template>

<style scoped>

</style>
