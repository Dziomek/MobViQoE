<template>
	<div class="fixed top-0 left-0 flex flex-col w-full min-h-full overflow-auto" style="background-color: black;">
		<ControlsLayer v-if="!playToggled" @play="playVideo" @toggleFullScreen="toggleAppFullScreen" :video="video" />
		<AssessmentLayer v-if="videoEnded" @nextVideo="nextVideo" :accMeasurements="accMeasurements"
			:gyroMeasurements="gyroMeasurements" :connectionData="connectionData" :screenDimensions="screenDimensions" :windowDimensions="windowDimensions"
			 :video="video" :videosWatched="excludedIndexes.length" />
		<!-- <AssessmentLayer :videoId="1"/> -->
		<video class="fixed top-0 left-0" :key="randomIndex" ref="videoElement" :controls="false"
			style="height: 100vh; width: 100vw;">
			<source v-if="randomIndex == 0" src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4">
			<source v-else-if="randomIndex == 1" src="https://upload.wikimedia.org/wikipedia/commons/3/3d/2022-05-28%2C_Geese_in_the_Bear_Creek_Park%2C_Redmond%2C_Wasington%2C_video3.webm">
			<source v-else-if="randomIndex == 2" src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Badger_collecting_bedding_material.webm">
			<source v-else-if="randomIndex == 3" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Squirrel_eating_cicada.ogg">
			<source v-else-if="randomIndex == 4" src="https://upload.wikimedia.org/wikipedia/commons/8/8b/2021-08-11%2C_Bison_crosses_the_road%2C_Yellowstone_National_Park.webm">
			<!-- <source :key="randomIndex" :src="dynamicSrc"> -->
		</video>
		<!-- <span style="color: white;">
			{{ accMeasurements.length }} {{  gyroMeasurements.length }}
		</span> -->
	</div>
</template>
 
<script setup>
import { onMounted, ref, inject, watch, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router';
import { VIDEO_CONFIG, SURVEY_LENGTH } from '../videoConfig.js'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import { setCookieBeforeSession } from '../cookiesUtils.js'

const ControlsLayer = defineAsyncComponent(() => import('../components/ControlsLayer.vue'))
const AssessmentLayer = defineAsyncComponent(() => import('../components/AssessmentLayer.vue'))

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

const gyroMeasurements = ref([])
const accMeasurements = ref([])
const lightMeasurements = ref([])
const connectionData = ref({ effectiveType: '', measurements: [] })
const screenDimensions = ref({ width: 0, height: 0 })
const windowDimensions = ref({ width: 0, height: 0 })

function handleDeviceOrientation(event) {
	const gyroData = {
		alpha: event.alpha || 0,
		beta: event.beta || 0,
		gamma: event.gamma || 0,
	}
	gyroMeasurements.value.push(gyroData)
}

function handleDeviceMotion(event) {
	const accData = {
		x: event.acceleration.x || 0,
		y: event.acceleration.y || 0,
		z: event.acceleration.z || 0,
	};
	accMeasurements.value.push(accData)
}

function handleConnectionData() {
	const connection = navigator.connection
	const data = {
		downlink: connection.downlink,
		rtt: connection.rtt,
	}
	console.log(connectionData.value)
	connectionData.value.measurements.push(data)
	console.log('INTERNET MEASUREMENT NR', connectionData.value.measurements.length)
}

let accInterval
let accIntervalDelete
let gyroInterval
let gyroIntervalDelete
let connectionInterval

function nextVideo() {
	if (excludedIndexes.value.length == SURVEY_LENGTH) {
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
		accMeasurements.value = []
		gyroMeasurements.value = []
		connectionData.value = { effectiveType: '', measurements: [] }
		screenDimensions.value = { width: 0, height: 0 }
		windowDimensions.value = { width: 0, height: 0 }
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
	if (sessionStorage.getItem('sessionState')) {
		const item = JSON.parse(sessionStorage.getItem('sessionState'))
		randomIndex.value = item.videoIndex
		excludedIndexes.value = item.excludedIndexes
		sessionState.value = item
		video.value = VIDEO_CONFIG[randomIndex.value]
	} else {
		updateSessionState()
	}
}

watch(
	() => videoEnded.value,
	() => {
		if (videoEnded.value) {
			console.log('STOPPING EVENTS')
			/// ACC
			window.removeEventListener('devicemotion', handleDeviceMotion)
			clearInterval(accInterval)
			clearInterval(accIntervalDelete)

			// GYRO
			window.removeEventListener('deviceorientation', handleDeviceOrientation)
			clearInterval(gyroInterval)
			clearInterval(gyroIntervalDelete)

			// INTERNET
			clearInterval(connectionInterval)
		}
	}
)

watch(
	() => playToggled.value,
	() => {
		if (playToggled.value) {
			console.log('STARTING EVENTS')
			/// ACC
			if ('DeviceMotionEvent' in window) {
				accInterval = setInterval(() => {
					window.addEventListener('devicemotion', handleDeviceMotion)
				}, 3000)
				accIntervalDelete = setInterval(() => {
					window.removeEventListener('devicemotion', handleDeviceMotion)
				}, 3100)
			} else {
				console.error('DeviceMotionEvent is not supported in this browser');
			}
			/// GYRO
			if ('DeviceOrientationEvent' in window) {
				gyroInterval = setInterval(() => {
					window.addEventListener('deviceorientation', handleDeviceOrientation)
				}, 3000)
				gyroIntervalDelete = setInterval(() => {
					window.removeEventListener('deviceorientation', handleDeviceOrientation)
				}, 3100)
			}
			/// INTERNET
			if (navigator.connection) {
				const connection = navigator.connection
				connectionData.value.effectiveType = connection.effectiveType
				console.log(connectionData.value)
				handleConnectionData()
				connectionInterval = setInterval(handleConnectionData, 5000)
			} 
			/// DIMENSIONS
			
			//SCREEN
			screenDimensions.value.width = window.screen.width
			screenDimensions.value.height = window.screen.height

			//WINDOW
			windowDimensions.value.width = window.innerWidth
			windowDimensions.value.height = window.innerHeight

			console.log(screenDimensions.value, windowDimensions.value)
		}
	}
)

onMounted(() => {
	setSessionState()
	setCookieBeforeSession(randomIndex.value, excludedIndexes.value)
})

</script>

<style scoped>
video::-webkit-media-controls {
	display: none !important;
}
</style>