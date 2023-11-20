<template>
    <MenuComponent />
    <ContinueLayer v-if="showContinueLayer" />
    <div v-else id="start-view" class="flex flex-col w-full min-h-full justify-center items-center px-8 py-16 overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title">MobiViQoE</h1>
                <CameraIcon />
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
import ContinueLayer from '../components/ContinueLayer.vue'
import CameraIcon from '../assets/icons/CameraIcon.vue'
import MenuComponent from '../components/MenuComponent.vue'

const router = useRouter()

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

#animated {
    animation: fadeIn ease-in .9s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
}
</style>
