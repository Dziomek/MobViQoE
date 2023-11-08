<template>
    <div id="personal-survey" class="flex flex-col w-full h-full justify-center items-center py-16 gap-16">
        <div class="flex justify-center">
            <h1>Personal survey</h1>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Select gender</h2>
            <div class="flex gap-16">
                <div v-for="data in genderData" :key="data.key" class="flex gap-2">
                    <RadioButton v-model="selectedGender" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                    <label :for="`${data.key}`">{{ data.value }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Select age</h2>
            <div class="flex gap-16">
                <div v-for="data in ages" :key="data.key" class="flex gap-2">
                    <RadioButton v-model="selectedAge" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                    <label :for="`${data.key}`">{{ data.value }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Do you have lenses or glasses?</h2>
            <div class="flex gap-16">
                <div v-for="data in lensesOrGlasses" :key="data.key" class="flex gap-2">
                    <RadioButton v-model="selectedLensesOrGlasses" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                    <label :for="`${data.key}`">{{ data.value ? 'Yes' : 'No' }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Select visual impairments (if any)</h2>
            <div class="flex gap-16">
                <div :key="1" class="flex gap-2">
                    <RadioButton v-model="selectedMyopia" @change="impairmetsInputChange" inputId="1" name="dynamic" :value="true" />
                    <label for="1">Myopia</label>
                </div>
                <div :key="1" class="flex gap-2">
                    <RadioButton v-model="selectedForesight" @change="impairmetsInputChange" inputId="1" name="dynamic" :value="true" />
                    <label for="1">Foresight</label>
                </div>
                <div :key="1" class="flex gap-2">
                    <RadioButton v-model="selectedDaltonism" @change="impairmetsInputChange" inputId="1" name="dynamic" :value="true" />
                    <label for="1">Daltonism</label>
                </div>
                <div :key="1" class="flex gap-2">
                    <RadioButton v-model="selectedSpatialBlindness" @change="impairmetsInputChange" inputId="1" name="dynamic" :value="true" />
                    <label for="1">Spatial blindness</label>
                </div>
                <div :key="1" class="flex gap-2">
                    <RadioButton v-model="selectedNoVisualImpairment" @change="noImpairmentInputChange" inputId="1" name="dynamic" :value="true" />
                    <label for="1">No visual impairment</label>
                </div>
            </div>
        </div>
        <Button @click="submitSurvey" label="Submit and start session" outlined :disabled="!checkSelected()"/>
    </div>
    
</template>

<script setup>
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from '../firebaseConfig.js'
import { onMounted, ref, watchEffect } from 'vue'
import RadioButton from "primevue/radiobutton"
import Button from "primevue/button"
import { useRouter } from 'vue-router'
import { useStore } from '../store.js'
import { storeToRefs } from "pinia"

const store = useStore()
const { sessionId } = storeToRefs(store)

const measurementsRef = collection(db, "measurements")
const router = useRouter()

const selectedGender = ref(null)
const selectedAge = ref(null)
const selectedLensesOrGlasses = ref(null)
const selectedMyopia = ref(false)
const selectedForesight = ref(false)
const selectedDaltonism = ref(false)
const selectedSpatialBlindness = ref(false)
const selectedNoVisualImpairment = ref(false)

const genderData = [{key: 1, value: 'Male'}, {key: 2, value: 'Female'}, {key: 3, value: 'Do not want to give'}]
const ages = [{key: 1, value: 'Under 18'}, {key: 2, value: '18-25'}, {key: 3, value: '25-30'}, {key: 4, value: '30-35'}, 
    {key: 5, value: '40-50'}, {key: 6, value: '50-60'}, {key: 7, value: '60-70'}]
const lensesOrGlasses = [{key: 1, value: true}, {key: 2, value: false}]
// const visualImpairments = [{key: 1, value: 'Myopia', vModel: selectedMyopia}, {key: 2, value: 'Foresight', vModel: selectedForesight}, 
//     {key: 3, value: 'Daltonism', vModel: selectedDaltonism}, {key: 4, value: 'Spatial blindness', vModel: selectedSpatialBlindness}, 
//     {key: 5, value: 'No visual impairment', vModel: selectedNoVisualImpairment}]

async function submitSurvey() {
    await setDoc(doc(measurementsRef, sessionId.value), {
        user: {
            gender: selectedGender.value,
            age: selectedAge.value,
            visualImpairments: {
                lensesOrGlasses: selectedLensesOrGlasses.value,
                myopia: selectedMyopia.value,
                foresight: selectedForesight.value,
                daltonism: selectedDaltonism.value,
                spatialBlindness: selectedSpatialBlindness.value,
                noVisualImpairment: selectedNoVisualImpairment.value
            }
        }
    })
    router.push({ name: 'session' })
}

function checkSelected() {
    return selectedGender.value && selectedAge.value && selectedLensesOrGlasses.value != null &&
    (selectedMyopia.value || selectedForesight.value || selectedDaltonism.value 
    || selectedSpatialBlindness.value || selectedNoVisualImpairment.value)
}

function impairmetsInputChange() {
    selectedNoVisualImpairment.value = false
}

function noImpairmentInputChange() {
    selectedMyopia.value = false
    selectedForesight.value = false
    selectedDaltonism.value = false
    selectedSpatialBlindness.value = false
}

</script>