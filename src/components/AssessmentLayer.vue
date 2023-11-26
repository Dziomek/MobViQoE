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
					<BadIcon :size="40" />
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
					<PoorIcon :size="40" />
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
					<FairIcon :size="40" />
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
					<GoodIcon :size="40" />
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
					<ExcellentIcon :size="40" />
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
import { SURVEY_LENGTH } from '../videoConfig.js'
import ExcellentIcon from '../assets/icons/ExcellentIcon.vue'
import GoodIcon from '../assets/icons/GoodIcon.vue'
import FairIcon from '../assets/icons/FairIcon.vue'
import PoorIcon from '../assets/icons/PoorIcon.vue'
import BadIcon from '../assets/icons/BadIcon.vue'
import Rating from 'primevue/rating'
import MenuComponent from "./MenuComponent.vue"

const assessment = ref(null)
const accAvg = ref(getAccAvg())
const gyroAvg = ref(getGyroAvg())
const connectionDataAvg = ref(getConnectionDataAvg())

const store = useStore()
const { sessionId, language } = storeToRefs(store)

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