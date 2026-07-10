<script setup lang="ts">
import OpenMeteoLocalStorage, { OpenMeteoModels } from '@/features/openMeteoLocalStorage';
import { ref } from 'vue';

const model = ref<string>(OpenMeteoLocalStorage.getModel())
const models: string[] = Object.values(OpenMeteoModels)

function updateModel (newModel: string) {
    try {
        OpenMeteoLocalStorage.setModel(newModel)
        model.value = newModel
    } catch (error) {
        console.error('[ModelSettingsListItem:updateModel]', error)
    }
}
</script>

<template>
    <v-list-item>
        <v-list-item-title>
            OpenMeteo model: <span class="font-weight-bold">{{ model }}</span>
        </v-list-item-title>

        <template v-slot:append>
            <v-select
                :model-value="model"
                :items="models"
                hide-details
                min-width="300px"
                variant="outlined"
                @update:model-value="updateModel" />
        </template>
    </v-list-item>
</template>
