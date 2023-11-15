<template>
    <ContinueLayer v-if="showContinueLayer"/>
    <div id="instruction" class="flex flex-col w-full h-full justify-center items-center py-16 gap-16">
        <h1>MobiViQoE</h1>
        <Button @click="navigateToInstruction" label="Get started" outlined/>
    </div>
    <!-- <SensorsData /> -->
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import ContinueLayer from '../components/ContinueLayer.vue'
import SensorsData from '../views/SesnorsData.vue'

const router = useRouter()

const store = useStore()
const { showContinueLayer } = storeToRefs(store)

function navigateToInstruction() {
    router.push({ name: 'instruction' })
}

</script>
