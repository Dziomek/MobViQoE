<template>
    <div id="menu-component" class="absolute top-5 right-5 z-20 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" :height="width < 1024 ? '30' : '50'" viewBox="0 -960 960 960"
            :width="width < 1024 ? '30' : '50'" fill="#E6E6E6" @click="toggleVisible">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
    </div>
    <Sidebar v-model:visible="visible" position="right">
        <div class="flex flex-col h-full justify-between">
            <div class="flex flex-col gap-10">
                <h2>{{ language == 'en' ? 'Select language' : 'Wybierz język' }}</h2>
                <Divider />
                <div @click="store.selectLanguage('pl')" class="flex gap-4 items-center cursor-pointer">
                    <div class="flex items-center gap-2">
                        <img src="../assets/poland.png">
                        <span>{{ language == 'en' ? 'Polish' : 'polski' }}</span>
                    </div>
                    <Tag v-if="language == 'pl'" value="wybrany" />
                </div>
                <div @click="store.selectLanguage('en')" class="flex gap-4 items-center cursor-pointer">
                    <div class="flex items-center gap-2">
                        <img src="../assets/united-states-of-america.png">
                        <span>{{ language == 'en' ? 'English' : 'angielski' }}</span>
                    </div>
                    <Tag v-if="language == 'en'" value="selected" />
                </div>
                <Divider />
            </div>
            <div class="flex justify-end">
                <span>MobiViQoE</span>
            </div>
        </div>
    </Sidebar>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from 'primevue/sidebar'
import Divider from 'primevue/divider'
import { useStore } from '../store.js'
import { storeToRefs } from 'pinia'
import Tag from 'primevue/tag'

const visible = ref(false)
const width = ref(window.innerWidth)

const store = useStore()
const { language } = storeToRefs(store)

function toggleVisible() {
    visible.value = !visible.value
}
</script>

<style>
.p-sidebar {
    background: black !important;
    color: #E6E6E6 !important;
}
</style>

<style scoped>
svg:hover {
    fill: antiquewhite
}
</style>
