<template>
	<div class="flex flex-col flex-1" style="background-color: black;">
		<ControlsLayer v-if="!playToggled" @play="playVideo" @toggleFullScreen="toggleAppFullScreen"/>
		<AssessmentLayer v-if="videoEnded" />
		<video ref="videoElement" :controls="false" style="height: 100vh; width: 100vw;">
			<source src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4">
		</video>
	</div>
</template>
 
<script setup>
import { onMounted, onUnmounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router';
import ControlsLayer from '../components/ControlsLayer.vue'
import AssessmentLayer from '../components/AssessmentLayer.vue'

const appElement = inject('appElement') // from App.vue
const router = useRouter() // router element

const videoElement = ref()
const playToggled = ref(false)
const videoEnded = ref(false)

function toggleAppFullScreen() {
	if(!document.fullscreenElement) {
		appElement.requestFullscreen().catch(err => {
			console.log(`Error attempting to enable full-screen mode: ${err.message}`);
		})
	} else {
		document.exitFullscreen().catch(err => {
    		console.log(`Error attempting to exit full-screen mode: ${err.message}`);
  		})
	}
	
	// fullscreenToggled.value = true
}

function playVideo() {
	playToggled.value = true
	videoElement.value.addEventListener('ended', () => {
		videoEnded.value = true
		// router.push({name: 'start'})
	})
	videoElement.value.play()
}

onMounted(() => {
	console.log('mounted')
})

onUnmounted(() => {
	console.log('unmounted')
})

</script>

<style scoped>
video::-webkit-media-controls {
	display: none !important;
}
</style>