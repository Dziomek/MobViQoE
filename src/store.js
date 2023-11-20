import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'

export const useStore = defineStore('store', () => {
    const sessionId = ref(null)
    const sessionState = ref(null) // { videoIndex: Number, excludedIndexes: Array }
    const showContinueLayer = ref(null)
    const language = ref('en')

    function selectLanguage(lang='en', setSession=true, setCookie=true) {
        if(setSession) sessionStorage.setItem('language', lang)
        if(setCookie) Cookies.set('language', lang)
        language.value = lang
    }

    function clearStore() {
        sessionId.value = null
        sessionState.value = null
        showContinueLayer.value = null
    }

    return { sessionId, sessionState, showContinueLayer, language, clearStore, selectLanguage }
})