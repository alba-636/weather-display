<script setup lang="ts">
const props = defineProps<{
    direction: number
}>()
</script>

<template>
    <v-icon
        size="x-large"
        icon="mdi-arrow-up-thin"
        :style="`--angle: ${props.direction}deg;`" />
</template>

<style lang="css" scoped>
.v-icon  {
    transform: rotate(var(--angle, 0));
}
</style>
