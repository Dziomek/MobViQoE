<template>
    <div id="finish" class="flex flex-col w-full min-h-full justify-center items-center px-32 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-full">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title">Thank you!</h1>
                <FinishIcon />
            </div>
            <div id="finish-content" class="flex flex-col flex-wrap gap-4 text-light text-center justify-center">
                <h2>Thank you for participating in the study</h2>
                <h3>Your voice will help us develop video technology</h3>
            </div>
            <Button icon="pi pi-check" @click="navigateToStart" label="Finish" outlined/>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import FinishIcon from '../assets/icons/FinishIcon.vue'

const router = useRouter()

function navigateToStart() {
    router.push({ name: 'start' })
}
</script>

<style scoped>
#animated {
    animation: fadeIn ease-in .9s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
}
</style>