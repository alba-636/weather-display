<script setup lang="ts">
const props = defineProps<{
    temperature: number
}>()
</script>

<template>
    <div>
        <v-icon
            size="x-large"
            icon="mdi-thermometer" />
        {{ props.temperature }}°C
    </div>
</template>
