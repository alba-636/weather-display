<script setup lang="ts">
const props = defineProps<{
    temperature: number
}>()
</script>

<template>
    <div class="text-center pa-1">
        <v-icon
            size="x-large"
            icon="mdi-thermometer" />
        {{ props.temperature }}°C
    </div>
</template>
