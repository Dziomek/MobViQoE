<template>
	<RouterView/>
</template>


<script setup>
import { provide, onBeforeMount } from 'vue'
import { useStore } from './store'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const appElement = document.getElementById('app')
provide('appElement', appElement)

const store = useStore()
const { sessionId } = storeToRefs(store)

onBeforeMount(() => {
	sessionId.value = uuidv4()
	console.log(sessionId.value)
})

</script>

<style scoped>
</style>
