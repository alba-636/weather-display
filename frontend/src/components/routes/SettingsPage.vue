<script setup lang="ts">
import FallbackPositionListItem from '../settings/FallbackPositionListItem.vue';
import ModelSettingListItem from '../settings/ModelSettingListItem.vue';

</script>

<template>
    <v-list>
        <v-list-subheader>Settings</v-list-subheader>

        <ModelSettingListItem />

        <FallbackPositionListItem />
    </v-list>
</template>
