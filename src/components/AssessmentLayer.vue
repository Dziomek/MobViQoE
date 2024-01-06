<template>
	<MenuComponent />
	<div id="assessment-layer" class="absolute top-0 left-0 w-full min-h-full z-10 flex flex-col items-center 
	justify-center bg-layer-color text-light text-center px-8 py-16 gap-16 overflow-auto">
		<h1 class="text-title">
			{{ language == 'en'
				? 'How can you evaluate the video quality?'
				: 'Jak oceniasz jakość tego wideo?'
			}}
		</h1>
		<Rating v-model="assessment" :cancel="false" />
		<div class="flex gap-5 h-[1rem]">
			<div v-if="assessment == 1" class="flex gap-5 items-center">
				<h2 class="text-title">
					{{ language == 'en'
						? 'Your score:'
						: 'Twoja ocena:'
					}}
				</h2>
				<div class="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
						<path
							d="M480-420q-68 0-123.5 38.5T276-280h408q-25-63-80.5-101.5T480-420Zm-168-60 44-42 42 42 42-42-42-42 42-44-42-42-42 42-44-42-42 42 42 44-42 42 42 42Zm250 0 42-42 44 42 42-42-42-42 42-44-42-42-44 42-42-42-42 42 42 44-42 42 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
					</svg>
					<span class="text-xl">
						{{ language == 'en'
							? 'Bad'
							: 'Źle'
						}}
					</span>
				</div>
			</div>
			<div v-if="assessment == 2" class="flex gap-5 items-center">
				<h2 class="text-title">
					{{ language == 'en'
						? 'Your score:'
						: 'Twoja ocena:'
					}}
				</h2>
				<div class="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
						<path
							d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
					</svg>
					<span class="text-xl">
						{{ language == 'en'
							? 'Poor'
							: 'Słabo'
						}}
					</span>
				</div>
			</div>
			<div v-if="assessment == 3" class="flex gap-5 items-center">
				<h2 class="text-title">
					{{ language == 'en'
						? 'Your score:'
						: 'Twoja ocena:'
					}}
				</h2>
				<div class="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
						:fill="fill">
						<path
							d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm20 180h240v-60H360v60ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
					</svg>
					<span class="text-xl">
						{{ language == 'en'
							? 'Fair'
							: 'Średnio'
						}}
					</span>
				</div>
			</div>
			<div v-if="assessment == 4" class="flex gap-5 items-center">
				<h2 class="text-title">
					{{ language == 'en'
						? 'Your score:'
						: 'Twoja ocena:'
					}}
				</h2>
				<div class="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
						<path
							d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
					</svg>
					<span class="text-xl">
						{{ language == 'en'
							? 'Good'
							: 'Dobrze'
						}}
					</span>
				</div>
			</div>
			<div v-if="assessment == 5" class="flex gap-5 items-center">
				<h2 class="text-title">
					{{ language == 'en'
						? 'Your score:'
						: 'Twoja ocena:'
					}}
				</h2>
				<div class="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
						<path
							d="M480-260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260ZM312-520l44-42 42 42 42-42-84-86-86 86 42 42Zm250 0 42-42 44 42 42-42-86-86-84 86 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
					</svg>
					<span class="text-xl">
						{{ language == 'en'
							? 'Excellent'
							: 'Znakomicie'
						}}
					</span>
				</div>
			</div>
		</div>
		<Button :icon="videosWatched != SURVEY_LENGTH ? 'pi pi-play' : 'pi pi-check'" :disabled="!assessment"
			@click="submitAssessment"
			:label="videosWatched != SURVEY_LENGTH ? language == 'en' ? 'Next video' : 'Nastepne wideo' : language == 'en' ? 'Finish' : 'Zakończ'"
			outlined size="large" />
	</div>
</template>

<script setup>
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore"
import Button from 'primevue/button'
import { ref } from 'vue'
import { db } from '../firebaseConfig'
import { useStore } from "../store"
import { storeToRefs } from 'pinia'
// import { SURVEY_LENGTH } from '../videoConfig.js'
import Rating from 'primevue/rating'
import MenuComponent from "./MenuComponent.vue"

const assessment = ref(null)
const accAvg = ref(getAccAvg())
const gyroAvg = ref(getGyroAvg())
const connectionDataAvg = ref(getConnectionDataAvg())

const store = useStore()
const { sessionId, language, SURVEY_LENGTH } = storeToRefs(store)

const measurementsRef = collection(db, "measurements")

const emits = defineEmits(['nextVideo'])

const props = defineProps({
	video: {
		type: Object,
		required: true,
		default: {}
	},
	accMeasurements: {
		type: Array,
		required: true,
		default: []
	},
	gyroMeasurements: {
		type: Array,
		required: true,
		default: []
	},
	screenDimensions: {
		type: Object,
		required: true,
		default: { width: 0, height: 0 }
	},
	windowDimensions: {
		type: Object,
		required: true,
		default: { width: 0, height: 0 }
	},
	connectionData: {
		type: Object,
		required: true,
		default: { type: '', measurements: [] }
	},
	videosWatched: {
		type: Number,
		required: true,
		default: 0
	}
})

async function submitAssessment() {
	await updateDoc(doc(measurementsRef, sessionId.value), {
		scores: arrayUnion({
			videoId: props.video.index,
			score: assessment.value,
			accAvg: accAvg.value,
			gyroAvg: gyroAvg.value,
			connectionData: connectionDataAvg.value,
			screenDimensions: props.screenDimensions,
			windowDimensions: props.windowDimensions
		})
	})
	emits('nextVideo')
}

function getAccAvg() {
	const dataLength = props.accMeasurements.length
	const reduced = props.accMeasurements.reduce((acc, val) => {
		acc.x += val.x
		acc.y += val.y
		acc.z += val.z
		return acc
	}, { x: 0, y: 0, z: 0 })

	return {
		x: reduced.x / dataLength,
		y: reduced.y / dataLength,
		z: reduced.z / dataLength
	}
}

function getGyroAvg() {
	const dataLength = props.gyroMeasurements.length
	const reduced = props.gyroMeasurements.reduce((acc, val) => {
		acc.alpha += val.alpha
		acc.beta += val.beta
		acc.gamma += val.gamma
		return acc
	}, { alpha: 0, beta: 0, gamma: 0 })

	return {
		alpha: reduced.alpha / dataLength,
		beta: reduced.beta / dataLength,
		gamma: reduced.gamma / dataLength
	}
}

function getConnectionDataAvg() {
	const dataLength = props.connectionData.measurements.length
	const reduced = props.connectionData.measurements.reduce((acc, val) => {
		acc.downlink += val.downlink,
			acc.rtt += val.rtt
		return acc
	}, { downlink: 0, rtt: 0 })

	return {
		effectiveType: props.connectionData.effectiveType,
		downlink: reduced.downlink / dataLength,
		rtt: reduced.rtt / dataLength,
	}
}
</script>

<style>
.p-rating {
	gap: 1rem !important;
}

.p-rating .p-rating-item .p-rating-icon.p-icon {
	width: 2rem !important;
	height: 2rem !important;
}

.p-rating .p-rating-item.p-focus {
	box-shadow: none !important;
	border: none !important
}

@media (min-width: 1024px) {
	.p-rating {
		gap: 4rem !important;
	}

	.p-rating .p-rating-item .p-rating-icon.p-icon {
		width: 5rem !important;
		height: 5rem !important;
	}

	.p-rating .p-rating-item.p-focus {
		box-shadow: none !important;
		border: none !important
	}
}
</style> 