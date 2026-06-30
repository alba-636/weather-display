<script setup lang="ts">
const props = defineProps<{
    cloudCover: number
}>()
</script>

<template>
    <div class="text-center pa-1">
        <v-icon
            size="x-large"
            icon="mdi-cloud-percent" />
        {{ props.cloudCover }}%
    </div>    
</template>
