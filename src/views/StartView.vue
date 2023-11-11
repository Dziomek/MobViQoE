<template>
    <ContinueLayer v-if="showContinueLayer"/>
    <div id="instruction" class="flex flex-col w-full h-full justify-center items-center py-16 gap-16">
        <h1>MobiViQoE</h1>
        <Button @click="navigateToInstruction" label="Get started" outlined/>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { v4 as uuidv4 } from 'uuid'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import ContinueLayer from '../components/ContinueLayer.vue'

const router = useRouter()

const store = useStore()
const { sessionId, showContinueLayer } = storeToRefs(store)


async function navigateToInstruction() {
    router.push({ name: 'instruction' })
}

</script>
