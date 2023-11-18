<template>
	<MenuComponent />
    <div id="assessment-layer" class="absolute top-0 left-0 w-full min-h-full z-10 flex flex-col items-center 
	justify-center bg-layer-color text-light text-center px-8 py-16 gap-16 overflow-auto ">
		<h1 class="text-title">How can you evaluate the video quality?</h1>
		<!-- <h1>{{ video.title }}</h1> -->
		<!-- <div class="flex gap-20 flex-wrap">
			<div class="flex items-center gap-2">
        		<RadioButton v-model="assessment" name="excellent" value="Excellent" />
				<ExcellentIcon size="40"/>
        		<label class="text-xl" for="excellent">Excellent</label>
    		</div>
    		<div class="flex items-center gap-2">
        		<RadioButton v-model="assessment" name="good" value="Good" />
				<GoodIcon size="40"/>
        		<label class="text-xl" for="good">Good</label>
    		</div>
			<div class="flex items-center gap-2">
				<RadioButton v-model="assessment" name="fair" value="Fair" />
				<FairIcon size="40"/>
				<label class="text-xl" for="fair">Fair</label>
			</div>
			<div class="flex items-center gap-2">
				<RadioButton v-model="assessment" name="poor" value="Poor" />
				<PoorIcon size="40"/>
				<label class="text-xl" for="poor">Poor</label>
			</div>
			<div class="flex items-center gap-2">
				<RadioButton v-model="assessment" name="bad" value="Bad" />
				<BadIcon size="40"/>
				<label class="text-xl" for="bad">Bad</label>
			</div>
		</div> -->
		<Rating v-model="assessment" :cancel="false"/>
		<div class="flex gap-5 h-[1rem]">
			<div v-if="assessment == 1" class="flex gap-5 items-center">
				<h2 class="text-title">Your score: </h2>
				<div class="flex gap-2 items-center">
					<BadIcon :size="40"/>
					<span class="text-xl">Bad</span>
				</div>
			</div>
			<div v-if="assessment == 2" class="flex gap-5 items-center">
				<h2 class="text-title">Your score: </h2>
				<div class="flex gap-2 items-center">
					<PoorIcon :size="40"/>
					<span class="text-xl">Poor</span>
				</div>
			</div>
			<div v-if="assessment == 3" class="flex gap-5 items-center">
				<h2 class="text-title">Your score: </h2>
				<div class="flex gap-2 items-center">
					<FairIcon :size="40"/>
					<span class="text-xl">Fair</span>
				</div>
			</div>
			<div v-if="assessment == 4" class="flex gap-5 items-center">
				<h2 class="text-title">Your score: </h2>
				<div class="flex gap-2 items-center">
					<GoodIcon :size="40"/>
					<span class="text-xl">Good</span>
				</div>
			</div>
			<div v-if="assessment == 5" class="flex gap-5 items-center">
				<h2 class="text-title">Your score: </h2>
				<div class="flex gap-2 items-center">
					<ExcellentIcon :size="40"/>
					<span class="text-xl">Excellent</span>
				</div>
			</div>
		</div>
		<Button icon="pi pi-play" :disabled="!assessment" @click="submitAssessment" :label="videosWatched != SURVEY_LENGTH ? 'Next video' : 'Finish'" outlined size="large" />
	</div>
</template>

<script setup>
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore"
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
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
import CameraIcon from "../assets/icons/CameraIcon.vue"
import MenuComponent from "./MenuComponent.vue"

const assessment = ref(null)
const accAvg = ref(getAccAvg())
const gyroAvg = ref(getGyroAvg())

const store = useStore()
const { sessionId } = storeToRefs(store)

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
	videosWatched :{
		type: Number,
		required: true,
		default: 0
	}
})

async function submitAssessment() {
	await updateDoc(doc(measurementsRef, sessionId.value), {
        scores: arrayUnion({ videoId: props.video.index, score: assessment.value, accAvg: accAvg.value, gyroAvg: gyroAvg.value  })
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
		acc.beta =+ val.beta
		acc.gamma += val.gamma
		return acc
	}, { alpha: 0, beta: 0, gamma: 0 })

	return {
		alpha: reduced.alpha / dataLength,
		beta: reduced.beta / dataLength,
		gamma: reduced.gamma / dataLength
	}
}
</script>

<style>
/* #assessment-layer .p-radiobutton .p-radiobutton-box {
	width: 3rem !important;
	height: 3rem !important;
}

#assessment-layer .p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
	width: 2.25rem !important;
	height: 2.25rem !important;
}

#assessment-layer .p-radiobutton {
	width: 3rem !important;
	height: 3rem !important;
}  */
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
</style>