import { createRouter, createWebHistory } from "vue-router"
import StartView from "./views/StartView.vue"
import SessionView from "./views/SessionView.vue"
import PersonalSurvey from "./views/PersonalSurvey.vue"
import Instruction from "./views/Instruction.vue"
import { useStore } from "./store"
import { storeToRefs } from "pinia"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from 'uuid'
import { checkSessionId, decideContinueLayerVisibility } from './routeComposables.js'
import { setCookieBeforeInstruction, setCookieBeforeSession, setCookieBeforeSurvey } from "./cookiesComposables.js"

const routes = [
    {   
        path: '/', 
        name: 'start', 
        component: StartView,
        beforeEnter: (to, from, next) => {
            console.log('enter start')
            decideContinueLayerVisibility()
            sessionStorage.setItem('currentRoute', to.name)
            next()
        },
    },
    { 
        path: '/instruction', 
        name: 'instruction', 
        component: Instruction,
        beforeEnter: (to, from, next) => {
            console.log('enter instruction')
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'start' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            checkSessionId()
            setCookieBeforeInstruction()
            next()
        },
    },
    { 
        path: '/survey', 
        name: 'survey', 
        component: PersonalSurvey ,
        beforeEnter: (to, from, next) => {
            console.log('enter survey')
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'instruction' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                next()
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            checkSessionId()
            setCookieBeforeSurvey()
            next()
        },
    },
    {   
        path: '/session', 
        name: 'session', 
        component: SessionView,  
        beforeEnter: (to, from, next) => {
            console.log('enter session')
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'survey' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                next()
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            checkSessionId()
            setCookieBeforeSession()
            next()
        },
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes, 
})
