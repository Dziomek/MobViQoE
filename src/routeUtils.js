import { useStore } from "./store.js"
import { storeToRefs } from "pinia"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from 'uuid'
import { removeExistingCookies } from './cookiesUtils.js'

export function syncSessionId() {
    const store = useStore()
    const { sessionId } = storeToRefs(store)
    const sessionIdCookie = Cookies.get('sessionId')
    if(sessionStorage.getItem('sessionId')) {
        if(!sessionId.value) {
            sessionId.value = sessionStorage.getItem('sessionId')
        } 
    } else if(sessionIdCookie) {
        sessionId.value = sessionIdCookie
        sessionStorage.setItem('sessionId', sessionId.value)
    }
     else {
        sessionId.value = uuidv4()
        sessionStorage.setItem('sessionId', sessionId.value)
    }
    console.log(sessionId.value)
}

export function decideOnContinueLayerVisibility() {
    const cookie = Cookies.get('history')
    if(cookie) {
        // const parsedCookie = JSON.parse(cookie)
        const store = useStore()
        const { showContinueLayer } = storeToRefs(store)
        showContinueLayer.value = true
    }
}

export function syncSessionStorage() {
    const sessionIdCookie = Cookies.get('sessionId')
    const historyCookie = Cookies.get('history')
    if(!sessionIdCookie) {
        if(sessionStorage.getItem('sessionId')) sessionStorage.removeItem('sessionId')
    }
    if(!historyCookie) {
        if(sessionStorage.getItem('history')) sessionStorage.removeItem('history')
    }
    if(!historyCookie)
    sessionStorage.clear()
}

export function finishSurvey() {
    const store = useStore()
    store.clearStore()
    sessionStorage.clear()
    removeExistingCookies()
}

export function clearDataWithoutCookie() {
    const store = useStore()
    store.clearStore()
    sessionStorage.clear()
}

export function syncLanguage() {
    const store = useStore()
    const cookie = Cookies.get('language')
    const sessionItem = sessionStorage.getItem('language')
    if(cookie) {
        store.selectLanguage(cookie, true, false)
        return
    } 
    if(sessionItem) {
        store.selectLanguage(sessionItem, false, true)
        return
    }
    store.selectLanguage()
    return
}