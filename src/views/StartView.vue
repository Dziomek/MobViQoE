<template>
    <MenuComponent />
    <ContinueLayer v-if="showContinueLayer" />
    <div v-else id="start-view"
        class="flex flex-col w-full min-h-full justify-center items-center px-8 py-16 overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title">MobiViQoE</h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100" fill="#E6E6E6">
                    <path
                        d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                </svg>
            </div>
            <h2 class="text-light text-center">
                {{ language == 'en'
                    ?
                    'Application for performing video quality assessment'
                    :
                    'Aplikacja do przeprowadzania badań jakości wideo'
                }}
            </h2>
            <Button @click="navigateToInstruction" :label="language == 'en' ? 'Get started' : 'Rozpocznij'" outlined />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import MenuComponent from '../components/MenuComponent.vue'
import { defineAsyncComponent } from 'vue'

const router = useRouter()

const ContinueLayer = defineAsyncComponent(() => import('../components/ContinueLayer.vue'))

const store = useStore()
const { showContinueLayer, language } = storeToRefs(store)

function navigateToInstruction() {
    router.push({ name: 'instruction' })
}

</script>

<style scoped>
#start-view {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("../assets/theme.jpg");
    background-size: cover;
    background-position: center;
}
</style>
