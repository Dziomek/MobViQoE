import { createRouter, createWebHistory } from "vue-router"
import StartView from "./views/StartView.vue"
import SessionView from "./views/SessionView.vue"
import PersonalSurvey from "./views/PersonalSurvey.vue"
import Instruction from "./views/Instruction.vue"

const routes = [
    { path: '/', name: 'start', component: StartView },
    { 
        path: '/instruction', 
        name: 'instruction', 
        component: Instruction,
        beforeEnter: (to, from, next) => {
            if(from.name != 'start') {
                router.push({ name: 'start' })
            }
            next()
        } 
    },
    { 
        path: '/survey', 
        name: 'survey', 
        component: PersonalSurvey ,
        beforeEnter: (to, from, next) => {
            if(from.name != 'instruction') {
                router.push({ name: 'start' })
            }
            next()
        }
    },
    {   path: '/session', 
        name: 'session', 
        component: SessionView,  
        beforeEnter: (to, from, next) => {
            if(from.name != 'survey') {
                router.push({ name: 'start' })
            } 
            next()
        }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes, 
})