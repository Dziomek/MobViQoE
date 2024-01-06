<template>
	<RouterView/>
</template>


<script setup>
import { onMounted, provide } from 'vue'
import { useStore } from './store'
import { storeToRefs } from 'pinia'
import { getFiles } from './videoConfig'

const appElement = document.getElementById('app')
provide('appElement', appElement)

const store = useStore()
const { VIDEOS, VIDEOS_NUMBER, SURVEY_LENGTH } = storeToRefs(store)

onMounted(async () => {
	VIDEOS.value = await getFiles()
	VIDEOS_NUMBER.value = VIDEOS.value.length
	if(VIDEOS_NUMBER.value < SURVEY_LENGTH.value) SURVEY_LENGTH.value = VIDEOS_NUMBER.value
})

</script>

<style scoped>
</style>
