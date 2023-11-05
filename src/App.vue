<script setup>
	import { provide } from 'vue'
	
	const appElement = document.getElementById('app')
	provide('appElement', appElement)
</script>

<template>
	<RouterView/>
</template>

<style scoped>
</style>
