<template>
  	{{ accMeasurements.length }}
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'

defineProps({
	accMeasurements: {
		type: Array,
		required: true,
		default: []
	}
})

const gyroMeasurements = ref([])
const accMeasurements = ref([])
const lightMeasurements = ref([])

const lastAccMeasurement = ref({ x: 0, y: 0, z: 0 })
const lastGyroMeasurement = ref(null)

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
		gyroMeasurements.value.push({
			alpha: event.alpha,
			beta: event.beta,
			gamma: event.gamma
		})
	}
	window.addEventListener('devicemotion', handleDeviceMotion)
	window.addEventListener('deviceorientation', handleDeviceOrientation)
})
</script>

