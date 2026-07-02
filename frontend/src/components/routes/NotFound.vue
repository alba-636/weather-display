<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const previousRoute = ref<string>()

const hasPreviousRoute = computed(() => previousRoute.value !== undefined)

if (router.options.history.state.back) {
    previousRoute.value = router.options.history.state.back.toString()
}
</script>

<template>
    <div class="fill-height fill-width d-flex align-center justify-center flex-column ">
        <p class="title">404</p>
        <p class="subtitle">Page not found</p>

        <div class="mt-16">
            <v-btn
                v-if="hasPreviousRoute"
                size="large"
                variant="tonal"
                class="mx-3"
                :to="previousRoute"
                @click="$router.go(-1)">
                Go Back
            </v-btn>

            <v-btn
                size="large"
                variant="tonal"
                class="mx-3"
                :to="{ name: 'home' }">
                Go Home
            </v-btn>
        </div>
    </div>
</template>

<style lang="css" scoped>
.title {
    font-size: 10rem;
    font-weight: bold;
    margin: 0px;
}

.subtitle {
    font-size: 3rem;
    font-weight: bold;
    margin: 0px;
    margin-top: -24px;
}
</style>
