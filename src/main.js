import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueVideoPlayer)
app.mount('#app')
