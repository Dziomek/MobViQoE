import Cookies from "js-cookie"
import { useStore } from "./store"
import { storeToRefs } from "pinia"

export function setCookieBeforeInstruction() {
    const store = useStore()
    const { sessionId } = storeToRefs(store)
    Cookies.set('history', JSON.stringify({ 'currentRoute': 'instruction' }), { expires: 1 })
    Cookies.set('sessionId', sessionId.value, { expires: 1 })
}

export function setCookieBeforeSurvey() {
    const store = useStore()
    const { sessionId } = storeToRefs(store)
    Cookies.set('history', JSON.stringify({ 'currentRoute': 'survey' }), { expires: 1 })
    Cookies.set('sessionId', sessionId.value, { expires: 1 })
}

export function setCookieBeforeSession(index, excludedIndexes) {
    const store = useStore()
    const { sessionId } = storeToRefs(store)
    Cookies.set('history', JSON.stringify({
        currentRoute: 'session',
        videoIndex: index,
        excludedIndexes: excludedIndexes
    }), { expires: 1 })
    Cookies.set('sessionId', sessionId.value, { expires: 1 })
}

export function removeExistingCookies() { // starting new session
    Cookies.remove('history', { path: '' })
    Cookies.remove('sessionId', { path: '' })
}

export function getCookiesData() { // going back to existing session
    let historyCookie
    const rawHistoryCookie = Cookies.get('history')
    historyCookie = rawHistoryCookie ? JSON.parse(rawHistoryCookie) : undefined
    const sessionIdCookie = Cookies.get('sessionId')

    return {
        history: historyCookie,
        sessionId: sessionIdCookie
    }
}

// export function setCookieAfterSurveySubmit() {
//     Cookies.set('history', JSON.stringify({ 'currentRoute': 'survey' }), { expires: 1 })
// }
