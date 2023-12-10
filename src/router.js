import { createRouter, createWebHistory } from "vue-router"
import StartView from "./views/StartView.vue"
import SessionView from "./views/SessionView.vue"
import PersonalSurvey from "./views/PersonalSurvey.vue"
import InstructionView from "./views/InstructionView.vue"
import FinishView from './views/FinishView.vue'
import View404 from './views/View404.vue'
import { syncSessionId, decideOnContinueLayerVisibility, syncSessionStorage, finishSurvey, syncLanguage, clearDataWithoutCookie } from './routeUtils.js'
import { setCookieBeforeInstruction, setCookieBeforeSession, setCookieBeforeSurvey } from "./cookiesUtils.js"

export const routes = [
    {   
        path: '/', 
        name: 'start', 
        component: StartView,
        beforeEnter: (to, from, next) => {
            syncLanguage()
            syncSessionStorage()
            decideOnContinueLayerVisibility()
            sessionStorage.setItem('currentRoute', to.name)
            next()
        },
    },
    { 
        path: '/instruction', 
        name: 'instruction', 
        component: InstructionView,
        beforeEnter: (to, from, next) => {
            syncLanguage()
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'start' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            syncSessionId()
            setCookieBeforeInstruction()
            next()
        },
    },
    { 
        path: '/survey', 
        name: 'survey', 
        component: PersonalSurvey ,
        beforeEnter: (to, from, next) => {
            syncLanguage()
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'instruction' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            syncSessionId()
            setCookieBeforeSurvey()
            next()
        },
    },
    {   
        path: '/session', 
        name: 'session', 
        component: SessionView,  
        beforeEnter: (to, from, next) => {
            syncLanguage()
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'survey' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            syncSessionId()
            setCookieBeforeSession()
            next()
        },
    },
    {
        path: '/finish',
        name: 'finish',
        component: FinishView,
        beforeEnter: (to, from, next) => {
            syncLanguage()
            const currentRoute = sessionStorage.getItem('currentRoute')
            if(!(currentRoute == 'session' || currentRoute == to.name)) {
                router.push({ name: 'start' })
                return
            }
            sessionStorage.setItem('currentRoute', to.name)
            finishSurvey()
            next()
        }
    },
    {
        path: '/:catchAll(.*)',
        component: View404,
        beforeEnter: (to, from, next) => {
            syncLanguage()
            clearDataWithoutCookie()
            next()
        }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes, 
})
