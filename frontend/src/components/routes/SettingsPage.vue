<script setup lang="ts">
import FallbackPositionListItem from '../settings/FallbackPositionListItem.vue';
import ForecastDaysListItem from '../settings/ForecastDaysListItem.vue';
import ModelSettingListItem from '../settings/ModelSettingListItem.vue';

</script>

<template>
    <v-list>
        <v-list-subheader>Settings</v-list-subheader>

        <ModelSettingListItem />

        <ForecastDaysListItem />

        <FallbackPositionListItem />
    </v-list>
</template>

<style lang="css" scoped>
.v-list-subheader {
    user-select: none;
}
</style>
