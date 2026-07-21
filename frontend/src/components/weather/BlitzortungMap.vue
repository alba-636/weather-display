<script setup lang="ts">
import { usePositionStore } from '@/stores/position';

const positionStore = usePositionStore()

// Documentation: https://map.blitzortung.org/mapexample.html
const urlParameters = {
    // 0=False; 1=True
    interactive: 1,
    NavigationControl: 1,
    FullScreenControl: 0,
    ScaleControl: 0,
    Advertisment: 0,
    InfoDiv: 0,
    Cookies: 0,

    MapStyle: 2, // 0-3
    MapStyleRangeValue: 10, // 0-11
    LightningRangeValue: 4, // 0-23
    LightningCheckboxChecked: 1, // 0/1
    CourseRangeValue: 0, // 0-10
    CourseCheckboxChecked: 0, // 0/1
    CountingRangeValue: 0, // 0-10
    CountingCheckboxChecked: 0, // 0/1
    CirclesRangeValue: 2, // 0-10
    CirclesCheckboxChecked: 1, // 0/1
    SpeedRangeValue: 0, // 0-10
    SpeedCheckboxChecked: 0, // 0/1
    LinksRangeValue: 0, // 0-10
    LinksCheckboxChecked: 0, // 0/1
    DetectorsRangeValue: 0, // 0-12
    DetectorsCheckboxChecked: 0, // 0/1
    CoverageRangeValue: 0, // 0-10
    CoverageCheckboxChecked: 0, // 0/1
    DayNightRangeValue: 5, // 0-10
    DayNightCheckboxChecked: 1, // 0/1
    AudioRangeValue: 0, // 0-10
    AudioCheckboxChecked: 0, // 0/1
    RegionRangeValue: 0, // 0-9
    RegionCheckboxChecked: 0, // 0/1
}

const zoom: number = 10
const urlProparametersString = (new URLSearchParams(urlParameters as any)).toString()

</script>

<template>
    <iframe
        :src="`https://map.blitzortung.org/index.php?${urlProparametersString}#${zoom}/${positionStore.latitudeShort}/${positionStore.longitudeShort}`"
        frameborder="0"
        width="100%"
        height="100%" />
</template>
