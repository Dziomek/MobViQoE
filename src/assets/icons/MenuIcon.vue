<template>
<svg xmlns="http://www.w3.org/2000/svg" :height="width < 1024 ? '30' : '50'" viewBox="0 -960 960 960" :width="width < 1024 ? '30' : '50'" fill="#E6E6E6">
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
</svg>
</template>

<script setup>
import { ref } from 'vue'
const width = ref(window.innerWidth)
</script>

<style scoped>
svg:hover {
    fill: antiquewhite
}
</style>