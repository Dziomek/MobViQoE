import { useStore } from "./store"
import { storeToRefs } from "pinia"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from 'uuid'

export function checkSessionId() {
    const store = useStore()
    const { sessionId } = storeToRefs(store)
    if(sessionStorage.getItem('sessionId')) {
        if(!sessionId.value) sessionId.value = sessionStorage.getItem('sessionId')
    }
     else {
        sessionId.value = uuidv4()
        sessionStorage.setItem('sessionId', sessionId.value)
    }
    console.log(sessionId.value)
}