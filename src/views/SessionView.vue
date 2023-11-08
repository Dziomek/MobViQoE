<template>
	<div class="flex flex-col" style="background-color: black;">
		<ControlsLayer v-if="!playToggled" @play="playVideo" @toggleFullScreen="toggleAppFullScreen"  :video="video" />
		<AssessmentLayer v-if="videoEnded"  @nextVideo="nextVideo"
			:videoId="1" :accMeasurements="accMeasurements" :gyroMeasurements="gyroMeasurements" :video="video" />
		<!-- <AssessmentLayer :videoId="1"/> -->
		<video :key="randomIndex" ref="videoElement" :controls="false" style="height: 100vh; width: 100vw;">
			<source v-if="randomIndex == 0" src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4">
			<source v-else-if="randomIndex == 1" src="../assets/videos/vid1.mp4">
			<source v-else-if="randomIndex == 2" src="../assets/videos/vid2.mp4">
			<source v-else-if="randomIndex == 3" src="../assets/videos/vid3.mp4">
			<source v-else-if="randomIndex == 4" src="../assets/videos/vid4.mp4">
		</video>
		<!-- <span style="color: white;">
			{{ accMeasurements.length }} {{  gyroMeasurements.length }}
		</span> -->
	</div>
</template>
 
<script setup>
import { onMounted, onUnmounted, ref, inject, watch } from 'vue'
import { useRouter } from 'vue-router';
import ControlsLayer from '../components/ControlsLayer.vue'
import AssessmentLayer from '../components/AssessmentLayer.vue'
import SensorsComponent from '../components/SensorsComponent.vue'
import { videoConfig } from '../videoConfig.js'

/// APP/ROUTER

const appElement = inject('appElement') // from App.vue
const router = useRouter() // router element

/// VIDEO

const videoElement = ref()
const playToggled = ref(false)
const videoEnded = ref(false)
const randomIndex = ref(Math.floor(Math.random() * 5))
const video = ref(videoConfig[randomIndex.value])
const excludedIndexes = ref([randomIndex.value])

function toggleAppFullScreen() {
	if (!document.fullscreenElement) {
		appElement.requestFullscreen().catch(err => {
			console.log(`Error attempting to enable full-screen mode: ${err.message}`);
		})
	} else {
		document.exitFullscreen().catch(err => {
			console.log(`Error attempting to exit full-screen mode: ${err.message}`);
		})
	}
}
function playVideo() {
	playToggled.value = true
	videoElement.value.addEventListener('ended', () => {
		videoEnded.value = true
		// router.push({name: 'start'})
	})
	videoElement.value.play()
}

/// SENSORS

const gyroData = ref({ // gyroscope
	alpha: null,
	beta: null,
	gamma: null
})
const accData = ref({ // accelerometer
	x: null,
	y: null,
	z: null
})
const lightData = ref() // light sensor

const gyroMeasurements = ref([])
const accMeasurements = ref([])
const lightMeasurements = ref([])

const lastAccMeasurement = ref({ x: 0, y: 0, z: 0 })
const lastGyroMeasurement = ref({ alpha: 0, beta: 0, gamma: 0})

onMounted(() => {
	function handleDeviceMotion(event) {
		const newMeasurement = {
			x: event.acceleration.x,
			y: event.acceleration.y,
			z: event.acceleration.z,
		}
		if (
			Math.abs(newMeasurement.x - lastAccMeasurement.value.x) >= 1 ||
			Math.abs(newMeasurement.y - lastAccMeasurement.value.y) >= 1 ||
			Math.abs(newMeasurement.z - lastAccMeasurement.value.z) >= 1
		) {
			accMeasurements.value.push(newMeasurement);
			lastAccMeasurement.value = newMeasurement
		}
	}
	function handleDeviceOrientation(event) {
		const newMeasurement = {
			alpha: event.alpha,
			beta: event.beta,
			gamma: event.gamma
		}
		if (
			Math.abs(newMeasurement.alpha - lastAccMeasurement.value.alpha) >= 1 ||
			Math.abs(newMeasurement.beta - lastAccMeasurement.value.beta) >= 1 ||
			Math.abs(newMeasurement.gamma - lastAccMeasurement.value.gamma) >= 1
		) {
			gyroMeasurements.value.push(newMeasurement);
			lastGyroMeasurement.value = newMeasurement
		}

	}
	window.addEventListener('devicemotion', handleDeviceMotion)
	window.addEventListener('deviceorientation', handleDeviceOrientation)
})

function nextVideo() {
	const randomNumber = Math.floor(Math.random() * 5)
	if(excludedIndexes.value.includes(randomNumber)) return nextVideo()
	else { 
		randomIndex.value = randomNumber
		excludedIndexes.value.push(randomNumber)
		video.value = videoConfig[randomIndex.value]
		playToggled.value = false
		videoEnded.value = false
	}
}

</script>

<style scoped>
video::-webkit-media-controls {
	display: none !important;
}
</style>