import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const sessionId = ref(null)
    const sessionState = ref(null) // { videoIndex: Number, excludedIndexes: Array }
    const showContinueLayer = ref(null)
    const language = ref('en')

    function selectLanguage(lang) {
        language.value = lang
    }

    function clearStore() {
        sessionId.value = null
        sessionState.value = null
        showContinueLayer.value = null
    }

    return { sessionId, sessionState, showContinueLayer, language, clearStore, selectLanguage }
})