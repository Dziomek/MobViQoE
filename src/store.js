import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'

export const useStore = defineStore('store', () => {
    const sessionId = ref(null)
    const sessionState = ref(null) // { videoIndex: Number, excludedIndexes: Array }
    const showContinueLayer = ref(null)
    const language = ref('en')

    const VIDEOS = ref([])
    const SURVEY_LENGTH = ref(3)
    const VIDEOS_NUMBER = ref(0)

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

    return { sessionId, sessionState, showContinueLayer, language, clearStore, selectLanguage, VIDEOS, SURVEY_LENGTH, VIDEOS_NUMBER }
})