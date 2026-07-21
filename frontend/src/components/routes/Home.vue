<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { ref } from 'vue';
import FullscreenButton from '../helpers/FullscreenButton.vue';

const positionStore = usePositionStore()

const showDrawer = ref<boolean>(false)
const isLoadingPosition = ref<boolean>(true)

const menuItems: MenuItem[] = [
    { title: 'Current Weather', path: '/weather/current' },
    { title: 'Forecast Weather', path: '/weather/forecast' },
    { title: 'Settings', path: '/settings', icon: 'mdi-cog' },
    { title: 'Status', path: '/status', icon: 'mdi-check-network' },
]

async function updatePosition() {
    try {
        isLoadingPosition.value = true
        await positionStore.updatePosition()
    } catch (error) {
        console.error('[Home:updatePosition]', error)
    }
    isLoadingPosition.value = false
}

updatePosition()
setInterval(updatePosition.bind(this), 60_000)

interface MenuItem {
    title: string
    path: string
    icon?: string
}
</script>

<template>
    <div class="fill-height fill-width pa-0 ma-0">
        <div class="app_bar d-flex align-center border-b">
            <v-btn
                :disabled="showDrawer"
                icon="mdi-menu"
                variant="text"
                size="x-large"
                @click="showDrawer = true" />

            <fullscreen-button />

            <v-spacer />

            <p class="text-title-small">
                <span v-if="positionStore.altitudeShort">{{ positionStore.altitudeShort }}m •</span> lat {{ positionStore.latitudeShort }}° lon {{ positionStore.longitudeShort }}°
            </p>
            <v-btn
                :loading="isLoadingPosition"
                variant="text"
                icon="mdi-reload"
                class="mr-1"
                @click="updatePosition" />
        </div>
        
        <v-navigation-drawer
            v-model="showDrawer"
            temporary>
            <v-list-item
                :to="{ name: 'home' }"
                class="text-center font-weight-bold">
                Weather
            </v-list-item>
            <v-divider color="surface" />

            <v-list-item
                v-for="menuItem of menuItems"
                link
                :to="menuItem.path">
                <!-- <template v-slot:prepend>
                    <v-icon :icon="menuItem.icon" />
                </template> -->
                <p class="ma-0 mt-n1">{{ menuItem.title }}</p>
            </v-list-item>
        </v-navigation-drawer>

        <div class="main_container">
            <router-view />
        </div>
    </div>
</template>

<style lang="css" scoped>
.app_bar {
    background: rgb(var(--v-theme-surface));
    height: 64px;
}

.main_container {
    width: 100%;
    height: calc(100% - 64px);
}
</style>
