<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const isOnline = ref<boolean>(window.navigator.onLine)

const isLoadingAPIPositionStatus = ref<boolean>(true)
const isAPIPositionOnline = ref<boolean>(false)

const isLoadingAPIOpenMeteoStatus = ref<boolean>(true)
const isAPIOpenMeteoOnline = ref<boolean>(false)


const apiPositionStatusText = computed<string>(() => {
    if (isLoadingAPIPositionStatus.value) return 'loading...'
    return isAPIPositionOnline.value ? 'online' : 'offline'
})

const apiOpenMeteoStatusText = computed<string>(() => {
    if (isLoadingAPIOpenMeteoStatus.value) return 'loading...'
    return isAPIOpenMeteoOnline.value ? 'online' : 'offline'
})

const onlineListener = () => {
    isOnline.value = true
    checkAll()
}
const offlineListener = () => {
    isOnline.value = false
    checkAll()
}

onMounted(() => {
    window.addEventListener('online', onlineListener)
    window.addEventListener('offline', offlineListener)

    checkAll()
})

onBeforeUnmount(() => {
    window.removeEventListener('online', onlineListener)
    window.removeEventListener('offline', offlineListener)
})

function checkAll () {
    checkPositionAPIStatus()
    checkopenMeteoAPIStatus()
}

async function checkPositionAPIStatus () {
    isLoadingAPIPositionStatus.value = true
    const isOnline = await checkAPIStatus('http://localhost:4242/api/position')
    isAPIPositionOnline.value = isOnline
    isLoadingAPIPositionStatus.value = false
}

async function checkopenMeteoAPIStatus () {
    isLoadingAPIOpenMeteoStatus.value = true
    const isOnline = await checkAPIStatus('https://api.open-meteo.com/v1/forecast')
    isAPIOpenMeteoOnline.value = isOnline
    isLoadingAPIOpenMeteoStatus.value = false
}

async function checkAPIStatus (url: string): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            cache: 'no-cache',
            signal: AbortSignal.timeout(5_000)
        })
        return response.ok
    } catch (error) {
        console.error('[Statuses:checkAPIStatus]', error)
        return false
    }
}
</script>

<template>
    <v-list>
        <!-- Internet Status -->
        <v-list-item>
            <template v-slot:prepend>
                <v-icon
                    :color="isOnline ? 'green' : 'red'"
                    icon="mdi-web" />
            </template>

            <p>Internet connection is <span class="font-weight-bold">{{ isOnline ? 'online' : 'offline' }}</span></p>
        </v-list-item>

        <!-- API Position Status -->
        <v-list-item>
            <template v-slot:prepend>
                <v-progress-circular
                    v-if="isLoadingAPIPositionStatus"
                    indeterminate
                    size="24"
                    width="2"
                    class="mr-8" />
                <v-icon
                    v-else
                    :color="isAPIPositionOnline ? 'green' : 'red'"
                    icon="mdi-server" />
            </template>

            <p>Position API is <span class="font-weight-bold">{{ apiPositionStatusText }}</span></p>

            <template v-slot:append>
                <v-btn
                    :disabled="isLoadingAPIPositionStatus"
                    variant="text"
                    icon="mdi-reload"
                    @click="checkPositionAPIStatus" />
            </template>
        </v-list-item>

        <!-- API OpenMeteo Status -->
        <v-list-item>
            <template v-slot:prepend>
                <v-progress-circular
                    v-if="isLoadingAPIOpenMeteoStatus"
                    indeterminate
                    size="24"
                    width="2"
                    class="mr-8" />
                <v-icon
                    v-else
                    :color="isAPIOpenMeteoOnline ? 'green' : 'red'"
                    icon="mdi-server" />
            </template>

            <p>OpenMeteo API is <span class="font-weight-bold">{{ apiOpenMeteoStatusText }}</span></p>

            <template v-slot:append>
                <v-btn
                    :disabled="isLoadingAPIOpenMeteoStatus"
                    variant="text"
                    icon="mdi-reload"
                    @click="checkopenMeteoAPIStatus" />
            </template>
        </v-list-item>
    </v-list>
</template>
