<template>
    
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

onMounted(() => {
	if ('Accelerometer' in window) {
		accMessage.value = 'Acc'
	} else {
		accMessage.value = 'No acc'
	}
	if ('Gyroscope' in window) {
		gyroMessage.value = 'Gyro'
	} else {
		gyroMessage.value = 'No gyro'
	}
	if ('AmbientLightSensor' in window) {
		lightMessage.value = 'Light'
	} else {
		lightMessage.value = 'No light'
	}

	if ('DeviceMotionEvent' in window) {
		window.addEventListener('devicemotion', (event) => {
			accData.value = {
				x: event.acceleration.x,
				y: event.acceleration.y,
				z: event.acceleration.z,
			};
		});
	}
	
	if ('DeviceOrientationEvent' in window) {
		window.addEventListener('deviceorientation', (event) => {
			gyroData.value.alpha = event.alpha; // Obrót wokół osi Z (stopnie od północy)
			gyroData.value.beta = event.beta;   // Pochylenie w przód/tył (stopnie)
			gyroData.value.gamma = event.gamma; // Przechylenie w lewo/prawo (stopnie)
		});
	}

	window.addEventListener('devicelight', (event) => {
		lightLevel.value = event.value;
		// Tutaj możesz przetwarzać dane o poziomie światła
	});
})
</script>