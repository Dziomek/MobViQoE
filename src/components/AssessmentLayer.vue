<template>
    <div id="assessment-layer" class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center bg-layer-color text-light py-16 gap-16">
		<h1>How can you evaluate the video quality?</h1>
		<div class="flex gap-20">
			<div class="flex items-center gap-2">
        		<RadioButton v-model="assessment" name="excellent" value="Excellent" />
        		<label class="text-xl" for="excellent">Excellent</label>
    		</div>
    		<div class="flex items-center gap-2">
        		<RadioButton v-model="assessment" name="good" value="Good" />
        		<label class="text-xl" for="good">Good</label>
    		</div>
			<div class="flex items-center gap-2">
				<RadioButton v-model="assessment" name="fair" value="Fair" />
				<label class="text-xl" for="fair">Fair</label>
			</div>
			<div class="flex items-center gap-2">
				<RadioButton v-model="assessment" name="poor" value="Poor" />
				<label class="text-xl" for="poor">Poor</label>
			</div>
			<div class="flex items-center gap-2">
				<RadioButton v-model="assessment" name="bad" value="Bad" />
				<label class="text-xl" for="bad">Bad</label>
			</div>
			<!-- {{ accAvg }} {{ accMeasurements.length }} {{ gyroMeasurements.length }} -->
		</div>
		<Button :disabled="!assessment" @click="submitAssessment" :label="videosWatched != SURVEY_LENGTH ? 'Next video' : 'Finish'" outlined size="large" />
		
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

const assessment = ref(null)
const accAvg = ref(getAccAvg())

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
        scores: arrayUnion({ videoId: props.video.index, score: assessment.value })
    })
	emits('nextVideo')
}

function getAccAvg() {
	const dataLength = props.accMeasurements.length
	const recuded = props.accMeasurements.reduce((acc, val) => {
		acc.x += val.x
		acc.y += val.y
		acc.z += val.z
		return acc
	}, { x: 0, y: 0, z: 0 })
	
	return {
		x: recuded.x / dataLength,
		y: recuded.y / dataLength,
		z: recuded.z / dataLength
	}
}
</script>

<style>
#assessment-layer .p-radiobutton .p-radiobutton-box {
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
}
</style>