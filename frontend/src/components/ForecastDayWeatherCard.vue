<script setup lang="ts">
import { computed } from 'vue';
import type { Hourly } from '@/features/openMeteoController';
import WindDirectionIcon from './indicator/wind/WindDirectionIcon.vue';

const props = defineProps<{
    day: string,
    hourly: Hourly
}>()

const hourlyItems = computed(() => {
    return props.hourly.time?.map((_, index) => {
        const item: Record<string, string|number|undefined> = {}
        Object.keys(props.hourly).forEach(key => {
            item[key] = props.hourly[key]?.[index]
        })
        return item
    })
})

const headers = [
    { title: 'time', align: 'center', key: 'time' },
    { title: 'temperature_2m', align: 'center', key: 'temperature_2m' },
    { title: 'relative_humidity_2m', align: 'center', key: 'relative_humidity_2m' },
    { title: 'cloud_cover', align: 'center', key: 'cloud_cover' },
    { title: 'wind_speed_10m', align: 'center', key: 'wind_speed_10m', minWidth: 100 },
    { title: 'precipitation', align: 'center', key: 'precipitation' },
]
</script>

<template>
    <v-card>
        <v-card-item>
            <v-card-title class="text-center">{{ props.day }}</v-card-title>
        </v-card-item>

        <v-card-text class="px-0">
            <v-data-table
                :headers="headers"
                :items="hourlyItems"
                :items-per-page="-1"
                fixed-header
                disable-sort
                hide-default-footer
                height="400"
                density="compact"
                >
                <!-- Headers -->
                <template v-slot:header.time>
                    <v-icon icon="mdi-clock-time-five" />
                </template>

                <template v-slot:header.temperature_2m>
                    <v-icon icon="mdi-thermometer" />
                </template>

                <template v-slot:header.relative_humidity_2m>
                    <v-icon icon="mdi-water-percent" />
                </template>

                <template v-slot:header.cloud_cover>
                    <v-icon icon="mdi-cloud-percent" />
                </template>

                <template v-slot:header.wind_speed_10m>
                    <v-icon icon="mdi-weather-windy" />
                </template>

                <template v-slot:header.precipitation>
                    <v-icon icon="mdi-water" />
                </template>

                <!-- Items -->
                <template v-slot:item="{ index, item }">
                    <tr :class="{ 'bg-grey-darken-3': index % 2 === 0 }">
                        <td>{{ String(item.time).slice(11) }}</td>
                        <td>{{ item.temperature_2m }}°C</td>
                        <td>{{ item.relative_humidity_2m }}%</td>
                        <td>{{ item.cloud_cover }}%</td>
                        <td>
                            {{ item.wind_speed_10m }}km/h
                            <wind-direction-icon :direction="Number(item.wind_direction_10m)" />
                        </td>
                        <td>
                            {{ item.precipitation }}mm
                            {{ item.precipitation_probability }}%
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>    
</template>
