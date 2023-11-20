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
            <UnfinishedSessionIcon />
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
import { removeExistingCookies, getCookiesData } from '../cookiesComposables.js'
import { useRouter } from 'vue-router'
import UnfinishedSessionIcon from '../assets/icons/UnfinishedSessionIcon.vue'
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