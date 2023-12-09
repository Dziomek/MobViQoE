<template>
    <MenuComponent />
    <div id="continue-layer" class="absolute top-0 left-0 min-w-full min-h-screen z-10 flex flex-col items-center 
    justify-center bg-layer-color text-light text-center px-8 py-16 gap-16 overflow-auto">
        <div class="flex flex-col items-center gap-8 items-center text-center">
            <h1 class="text-title">
                {{ language == 'en'
                    ?
                    'You have an unfinished session'
                    :
                    'Wykryto nieukończoną sesję'
                }}
            </h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100"
                fill="#E6E6E6">
                <path
                    d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z" />
            </svg>
        </div>
        <h2>
            {{ language == 'en'
                ?
                'Do you want to go back to it, or start new session?'
                :
                'Chcesz powrócić do starej sesji, czy rozpocząć nową?'
            }}
        </h2>
        <!-- <Timeline :value="timelineData">
            <template #content="slotProps">
                {{ slotProps.item.name }}
            </template>
        </Timeline> -->
        <div class="flex items-center justify-center gap-6">
            <Button @click="goBackToPreviousSession" icon="pi pi-refresh"
                :label="language == 'en' ? 'Go back to previous session' : 'Wróć do poprzedniej sesji'" outlined />
            <Button @click="startNewSession" icon="pi pi-play"
                :label="language == 'en' ? 'Start new session' : 'Rozpocznij nową sesję'" outlined />
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import { removeExistingCookies, getCookiesData } from '../cookiesUtils.js'
import { useRouter } from 'vue-router'
import MenuComponent from '../components/MenuComponent.vue'
// import Timeline from 'primevue/timeline'

const router = useRouter()

const store = useStore()
const { sessionId, sessionState, showContinueLayer, language } = storeToRefs(store)

const timelineData = [
    {
        name: 'Instruction'
    },
    {
        name: 'Personal survey'
    },
    {
        name: 'Video',
        number: 3
    },
    {
        name: 'Assessment',
        number: 3
    }
]

function startNewSession() {
    removeExistingCookies()
    sessionStorage.removeItem('sessionId')
    sessionStorage.removeItem('sessionState')
    showContinueLayer.value = false
}

function goBackToPreviousSession() {
    const data = getCookiesData()
    const currentRoute = data.history.currentRoute
    sessionId.value = data.sessionId
    if (data.history.videoIndex && data.history.excludedIndexes) {
        sessionState.value = {
            videoIndex: data.history.videoIndex,
            excludedIndexes: data.history.excludedIndexes
        }
        sessionStorage.setItem('sessionState', JSON.stringify(sessionState.value))
    }
    sessionStorage.setItem('currentRoute', currentRoute)

    router.push({ name: currentRoute })
}
</script>