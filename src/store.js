import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const sessionId = ref(null)
    const sessionState = ref(null) // { videoIndex: Number, excludedIndexes: Array }
    const showContinueLayer = ref(null)

    return { sessionId, sessionState, showContinueLayer }
})