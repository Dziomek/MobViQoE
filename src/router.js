import { createRouter, createWebHistory } from "vue-router"
import { syncSessionId, decideOnContinueLayerVisibility, syncSessionStorage, finishSurvey, syncLanguage, clearDataWithoutCookie } from './routeUtils.js'
import { setCookieBeforeInstruction, setCookieBeforeSession, setCookieBeforeSurvey } from "./cookiesUtils.js"

export const routes = [
    {   
        path: '/', 
        name: 'start', 
        component: () => import("./views/StartView.vue"),
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
        component: () => import("./views/InstructionView.vue"),
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
        component: () => import("./views/PersonalSurvey.vue"),
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
        component: () => import("./views/SessionView.vue"),  
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
        component: () => import("./views/FinishView.vue"),
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
        component: () => import("./views/View404.vue"),
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
