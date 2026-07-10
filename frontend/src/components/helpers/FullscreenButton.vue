<script setup lang="ts">
import { ref } from 'vue';

const isFullscreen = ref(!!document.fullscreenElement)

function requestFullscreen () {
    try {
        document.documentElement.requestFullscreen()
        isFullscreen.value = true
    } catch (error) {
        console.error('[FullscreenButton:requestFullscreen]', error)
    }
}

function exitFullscreen () {
    try {
        document.exitFullscreen()
        isFullscreen.value = false
    } catch (error) {
        console.error('[FullscreenButton:exitFullscreen]', error)
    }
}

function toogleFullscreen () {
    if (isFullscreen.value) {
        exitFullscreen()
    } else {
        requestFullscreen()
    }
}
</script>

<template>
    <v-btn
        :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
        variant="text"
        size="x-large"
        @click="toogleFullscreen" />
</template>
