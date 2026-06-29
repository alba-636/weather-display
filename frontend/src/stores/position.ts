import GPSController from '@/features/GPSController'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePositionStore = defineStore('position', () => {
    const latitude = ref(0)
    const longitude = ref(0)

    const latitudeShort = computed(() => {
        return Number(latitude.value.toFixed(2))
    })

    const longitudeShort = computed(() => {
        return Number(longitude.value.toFixed(2))
    })

    async function updatePosition() {
        const position = await GPSController.fetchCurrentPosition()
        if (!position) return
        
        latitude.value = position.lat
        longitude.value = position.lon
    }

    return { latitude, longitude, latitudeShort, longitudeShort, updatePosition }
})
