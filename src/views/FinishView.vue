<template>
    <div id="finish"
        class="flex flex-col w-full min-h-full justify-center items-center px-32 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-full">
            <div class="flex flex-col items-center gap-8 text-center">
                <h1 class="text-title">
                    {{ language == 'en'
                        ? 'Thank you!'
                        : 'Dziękujemy!'
                    }}
                </h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100" fill="green">
                    <path
                        d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
                </svg>
            </div>
            <div id="finish-content" class="flex flex-col flex-wrap gap-4 text-light text-center justify-center">
                <h2>
                    {{ language == 'en'
                        ? 'Thank you for participating in the study'
                        : 'Dziękujemy za udział w badaniu'
                    }}
                </h2>
                <h3>
                    {{ language == 'en'
                        ? 'Your voice will help us develop video technology'
                        : 'Twoja ocena pozwoli nam rozwinąć technologię wideo'
                    }}
                </h3>
            </div>
            <Button icon="pi pi-check" @click="navigateToStart" :label="language == 'en' ? 'Finish' : 'Zakończ'" outlined />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useStore } from '../store';
import { storeToRefs } from 'pinia';

const router = useRouter()

const store = useStore()
const { language } = storeToRefs(store)

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