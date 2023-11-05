import { createRouter, createWebHistory } from "vue-router"
import StartView from "./views/StartView.vue"
import SessionView from "./views/SessionView.vue"

const routes = [
    { path: '/', name: 'start', component: StartView },
    { path: '/session', name: 'session', component: SessionView }
]

export const router = createRouter({
    history: createWebHistory(),
    routes, 
})