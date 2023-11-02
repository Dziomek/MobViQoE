import { createRouter, createWebHistory } from "vue-router"
import StartView from "./views/StartView.vue"
import SessionView from "./views/SessionView.vue"

const routes = [
    { path: '/', component: SessionView },
    { path: '/session', component: SessionView }
]

export const router = createRouter({
    history: createWebHistory(),
    routes, 
})