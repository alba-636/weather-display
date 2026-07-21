import GPSController from '@/features/GPSController'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePositionStore = defineStore('position', () => {
    const latitude = ref(0)
    const longitude = ref(0)
    const altitude = ref(0)

    const latitudeShort = computed(() => {
        return Number(latitude.value.toFixed(2))
    })

    const longitudeShort = computed(() => {
        return Number(longitude.value.toFixed(2))
    })

    const altitudeShort = computed(() => {
        return Number(altitude.value.toFixed(0))
    })

    async function updatePosition() {
        let position = await GPSController.fetchCurrentPosition()
        if (!position) position = GPSController.getFallbackPosition()

        if (latitude.value !== position.lat || longitude.value !== position.lon || altitude.value !== position.alt) {
            latitude.value = position.lat
            longitude.value = position.lon
            altitude.value = position.alt
        }
    }

    return { latitude, longitude, altitude, latitudeShort, longitudeShort, altitudeShort, updatePosition }
})
