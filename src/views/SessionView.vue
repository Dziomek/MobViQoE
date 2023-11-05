<template>
	<div class="flex flex-col flex-1" style="background-color: black;">
		<ControlsLayer v-if="!playToggled" @play="playVideo" @toggleFullScreen="toggleAppFullScreen"/>
		<AssessmentLayer v-if="videoEnded" />
		<video ref="videoElement" :controls="false" style="height: 90vh; width: 90vw;">
			<source src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4">
		</video>
		<span style="color: white;">
			{{ accMeasurements.length }} {{  gyroMeasurements.length }}
		</span>
	</div>
</template>
 
<script setup>
import { onMounted, onUnmounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router';
import ControlsLayer from '../components/ControlsLayer.vue'
import AssessmentLayer from '../components/AssessmentLayer.vue'

/// APP/ROUTER

const appElement = inject('appElement') // from App.vue
const router = useRouter() // router element

/// VIDEO

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

onMounted(() => {
	if ('DeviceMotionEvent' in window) {
		window.addEventListener('devicemotion', (event) => {
			accData.value = {
				x: event.acceleration.x,
				y: event.acceleration.y,
				z: event.acceleration.z,
			}
			accMeasurements.value.push(accData.value)
			console.log(accMeasurements.value)
		})
	}
	
	if ('DeviceOrientationEvent' in window) {
		window.addEventListener('deviceorientation', (event) => {
			gyroData.value = {
				alpha: event.alpha,
				beta: event.beta, 
				gamma: event.gamma
			}
			gyroMeasurements.value.push(gyroData.value)
			console.log(gyroMeasurements.value)
		})
	}
})


</script>

<style scoped>
video::-webkit-media-controls {
	display: none !important;
}
</style>