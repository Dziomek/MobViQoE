<template>
	<RouterView/>
</template>


<script setup>
import { provide } from 'vue'

const appElement = document.getElementById('app')
provide('appElement', appElement)

</script>

<style scoped>
</style>
