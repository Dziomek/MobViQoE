<template>
    <div id="continue-layer" class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center bg-layer-color text-light py-16 gap-16">
        <h1>You have an unfinished session</h1>
        <h2>Do you want to go back to it, or start new session?</h2>
        <div class="flex items-center justify-center gap-6">
            <Button @click="goBackToPreviousSession" label="Go back to previous session" outlined />
            <Button @click="startNewSession" label="Start new session" outlined />
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import { removeExistingCookies, getCookiesData } from '../cookiesComposables.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useStore()
const { sessionId, sessionState, showContinueLayer } = storeToRefs(store)

function startNewSession() {
    removeExistingCookies()
    sessionStorage.removeItem('sessionId')
    showContinueLayer.value = false
}

function goBackToPreviousSession() {
    const data = getCookiesData()
    const currentRoute = data.history.currentRoute
    sessionId.value = data.sessionId
    if(data.history.videoIndex && data.history.excludedIndexes) {
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