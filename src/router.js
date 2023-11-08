import { createRouter, createWebHistory } from "vue-router"
import StartView from "./views/StartView.vue"
import SessionView from "./views/SessionView.vue"
import PersonalSurvey from "./views/PersonalSurvey.vue"
import Instruction from "./views/Instruction.vue"

const routes = [
    { path: '/', name: 'start', component: StartView },
    { path: '/session', name: 'session', component: SessionView },
    { path: '/survey', name: 'survey', component: PersonalSurvey },
    { path: '/instruction', name: 'instruction', component: Instruction },
]

export const router = createRouter({
    history: createWebHistory(),
    routes, 
})