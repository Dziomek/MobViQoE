<template>
	<div class="flex flex-col">
		<div>
			{{ lightMessage }}
		</div>
		<div>
			{{ gyroMessage }}
		</div>
		<div>
			{{ accMessage }}
		</div>
		<div>
			{{ accData }}
		</div>
		<div>
			{{ accMeasurements.length }}
		</div>
		<div>
			{{ gyroData }}
		</div>
		<div>
			{{ gyroMeasurements.length }}
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const accMessage = ref()
const gyroMessage = ref()
const lightMessage = ref()
const gyroData = ref({
	alpha: null,
	beta: null,
	gamma: null
})
const accData = ref({
	x: null,
	y: null,
	z: null
})
const lightLevel = ref()

const accMeasurements = ref([0])
const gyroMeasurements = ref([0])

onMounted(() => {
	// if (window.Accelerometer) {
	// 	accMessage.value = 'Acc'
	// 	// const acl = new Accelerometer({ frequency: 10 })
	// 	// acl.addEventListener("reading", () => {
	// 	// 	accMessage.value = `Acceleration ${acl.x} ${acl.y} ${acl.z}`
	// 	// });

	// 	// acl.start();
	// } else {
	// 	accMessage.value = 'No acc'
	// }
	// if ('Gyroscope' in window) {
	// 	gyroMessage.value = 'Gyro'
	// } else {
	// 	gyroMessage.value = 'No gyro'
	// }
	// if ('AmbientLightSensor' in window) {
	// 	lightMessage.value = 'Light'
	// } else {
	// 	lightMessage.value = 'No light'
	// }

	// if ('DeviceMotionEvent' in window) {
	// 	function handleDeviceMotion(event) {
	// 		accData.value = {
	// 			x: event.acceleration.x || 0,
	// 			y: event.acceleration.y || 0,
	// 			z: event.acceleration.z || 0,
	// 		};
	// 		accMeasurements.value.push(accData.value)
	// 	}
	// 	setInterval(() => {
	// 		window.addEventListener('devicemotion', handleDeviceMotion)
	// 	}, 5000); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
	// 	setInterval(() => {
	// 		window.removeEventListener('devicemotion', handleDeviceMotion)
	// 	}, 5005); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
	// } else {
	// 	console.error('DeviceMotionEvent is not supported in this browser');
	// }

	// if ('DeviceOrientationEvent' in window) {
	// 	function handleDeviceOrientation(event) {
	// 		gyroData.value = {
	// 			alpha: event.alpha, // Obrót wokół osi Z (stopnie od północy)
	// 			beta: event.beta, // Pochylenie w przód/tył (stopnie)
	// 			gamma: event.gamma, // Przechylenie w lewo/prawo (stopnie)
	// 		}
	// 		gyroMeasurements.value.push(gyroData.value)
	// 	}
	// 	setInterval(() => {
	// 		window.addEventListener('deviceorientation', handleDeviceOrientation)
	// 	}, 5000); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
	// 	setInterval(() => {
	// 		window.removeEventListener('deviceorientation', handleDeviceOrientation)
	// 	}, 5005); // Ustaw interwał czasowy na 1000 milisekund (1 sekunda)
	// }

	// window.addEventListener('devicelight', (event) => {
	// 	lightLevel.value = event.value;
	// 	// Tutaj możesz przetwarzać dane o poziomie światła
	// });
})
</script>