<template>
    <div id="menu-component" class="absolute top-5 right-5 z-20 cursor-pointer">
        <MenuIcon @click="toggleVisible" />
    </div>
    <Sidebar v-model:visible="visible" position="right">
        <div class="flex flex-col h-full justify-between">
            <div class="flex flex-col gap-10">
                <h2>{{ language == 'en' ? 'Select language' : 'Wybierz język' }}</h2>
                <Divider />
                <div @click="store.selectLanguage('pl')" class="flex gap-2 items-center cursor-pointer">
                    <img src="../assets/poland.png">
                    <span>{{ language == 'en' ? 'Polish' : 'polski' }}</span>
                </div>
                <div @click="store.selectLanguage('en')" class="flex gap-2 items-center cursor-pointer">
                    <img src="../assets/united-states-of-america.png">
                    <span>{{ language == 'en' ? 'English' : 'angielski' }}</span>
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
import MenuIcon from '../assets/icons/MenuIcon.vue'
import { ref } from 'vue'
import Sidebar from 'primevue/sidebar'
import Divider from 'primevue/divider'
import { useStore } from '../store.js'
import { storeToRefs } from 'pinia'

const visible = ref(false)

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
