<template>
    <svg xmlns="http://www.w3.org/2000/svg" :height="`${size}`" viewBox="0 -960 960 960" :width="`${size}`" :fill="fill">
        <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 80
    },
    fill: {
        type: String,
        default: '#E6E6E6'
    }
})
</script>

<style scoped>
svg:hover {
    fill: antiquewhite;
}
</style>