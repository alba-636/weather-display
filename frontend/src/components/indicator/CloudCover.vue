<script setup lang="ts">
const props = defineProps<{
    cloudCover: number
}>()
</script>

<template>
    <div>
        <v-icon
            size="x-large"
            icon="mdi-cloud-percent" />
        {{ props.cloudCover }}%
    </div>    
</template>
