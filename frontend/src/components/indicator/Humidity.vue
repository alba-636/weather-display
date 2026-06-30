<script setup lang="ts">
const props = defineProps<{
    humidity: number
}>()
</script>

<template>
    <div class="text-center pa-1">
        <v-icon
            size="x-large"
            icon="mdi-water-percent" />
        {{ props.humidity }}%
    </div>
</template>