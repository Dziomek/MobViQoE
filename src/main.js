import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { router } from './router'
// import VueVideoPlayer from '@videojs-player/vue'
// import 'video.js/dist/video-js.css'
import './style.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
// app.use(VueVideoPlayer)
app.use(PrimeVue)
app.mount('#app')
