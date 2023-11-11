import { useStore } from "./store"
import { storeToRefs } from "pinia"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from 'uuid'

export function checkSessionId() {
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