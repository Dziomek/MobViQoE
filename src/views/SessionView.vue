<template>
	<div class="flex flex-col" style="background-color: black;">
		<ControlsLayer v-if="!playToggled" @play="playVideo" @toggleFullScreen="toggleAppFullScreen" :video="video" />
		<AssessmentLayer v-if="videoEnded" @nextVideo="nextVideo" :accMeasurements="accMeasurements"
			:gyroMeasurements="gyroMeasurements" :video="video" :videosWatched="excludedIndexes.length"/>
		<!-- <AssessmentLayer :videoId="1"/> -->
		<video :key="randomIndex" ref="videoElement" :controls="false" style="height: 100vh; width: 100vw;">
			<source v-if="randomIndex == 0" src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4">
			<source v-else-if="randomIndex == 1" src="../assets/videos/vid1.mp4">
			<source v-else-if="randomIndex == 2" src="../assets/videos/vid2.mp4">
			<source v-else-if="randomIndex == 3" src="../assets/videos/vid3.mp4">
			<source v-else-if="randomIndex == 4" src="../assets/videos/vid4.mp4">
			<!-- <source :key="randomIndex" :src="dynamicSrc"> -->
		</video>
		<!-- <span style="color: white;">
			{{ accMeasurements.length }} {{  gyroMeasurements.length }}
		</span> -->
	</div>
</template>
 
<script setup>
import { onMounted, ref, inject, watch } from 'vue'
import { useRouter } from 'vue-router';
import ControlsLayer from '../components/ControlsLayer.vue'
import AssessmentLayer from '../components/AssessmentLayer.vue'
import SensorsComponent from '../components/SensorsComponent.vue'
import { VIDEO_CONFIG, SURVEY_LENGTH } from '../videoConfig.js'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import { setCookieBeforeSession } from '../cookiesComposables.js'

/// APP/ROUTER

const appElement = inject('appElement') // from App.vue
const router = useRouter() // router element

// STORE

const store = useStore()
const { sessionState } = storeToRefs(store)

/// VIDEO

const videoElement = ref()
const playToggled = ref(false)
const videoEnded = ref(false)
const randomIndex = ref(Math.floor(Math.random() * 5))
const video = ref(VIDEO_CONFIG[randomIndex.value])
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

function handleDeviceOrientation(event) {
			gyroData.value = {
				alpha: event.alpha, // Obrót wokół osi Z (stopnie od północy)
				beta: event.beta, // Pochylenie w przód/tył (stopnie)
				gamma: event.gamma, // Przechylenie w lewo/prawo (stopnie)
			}
			gyroMeasurements.value.push(gyroData.value)
		}

let accInterval
let accIntervalDelete

onMounted(() => {
	if ('DeviceMotionEvent' in window) {
		function handleDeviceMotion(event) {
			accData.value = {
				x: event.acceleration.x || 0,
				y: event.acceleration.y || 0,
				z: event.acceleration.z || 0,
			};
			accMeasurements.value.push(accData.value)
		}
		setInterval(() => {
			window.addEventListener('devicemotion', handleDeviceMotion)
		}, 3000); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
		setInterval(() => {
			window.removeEventListener('devicemotion', handleDeviceMotion)
		}, 3050); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
	} else {
		console.error('DeviceMotionEvent is not supported in this browser');
	}

	if ('DeviceOrientationEvent' in window) {
		accInterval = setInterval(() => {
			window.addEventListener('deviceorientation', handleDeviceOrientation)
		}, 3000); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
		accIntervalDelete = setInterval(() => {
			window.removeEventListener('deviceorientation', handleDeviceOrientation)
		}, 3050); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
	}

	setSessionState()
	setCookieBeforeSession(randomIndex.value, excludedIndexes.value)
})

watch(() => videoEnded.value,
() => {
	if(videoEnded.value) {
		window.removeEventListener('deviceorientation', handleDeviceOrientation)
		clearInterval(accInterval)
		clearInterval(accIntervalDelete)
	}
})

function nextVideo() {
	if(excludedIndexes.value.length == SURVEY_LENGTH) {
		router.push({ name: 'finish' })
		return
	}
	const randomNumber = Math.floor(Math.random() * 5)
	if (excludedIndexes.value.includes(randomNumber)) return nextVideo()
	else {
		randomIndex.value = randomNumber
		excludedIndexes.value.push(randomNumber)
		video.value = VIDEO_CONFIG[randomIndex.value]
		playToggled.value = false
		videoEnded.value = false
		///
		updateSessionState()
	}
}

function updateSessionState() {
	sessionState.value = {
		videoIndex: randomIndex.value,
		excludedIndexes: excludedIndexes.value
	}
	sessionStorage.setItem('sessionState', JSON.stringify(sessionState.value))
}

function setSessionState() {
	if(sessionStorage.getItem('sessionState')) {
		const item = JSON.parse(sessionStorage.getItem('sessionState'))
		randomIndex.value = item.videoIndex
		excludedIndexes.value = item.excludedIndexes
		sessionState.value = item
		video.value = VIDEO_CONFIG[randomIndex.value]
	} else {
		updateSessionState()
	}
}

</script>

<style scoped>
video::-webkit-media-controls {
	display: none !important;
}
</style>