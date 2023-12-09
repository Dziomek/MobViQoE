<template>
    <MenuComponent />
    <div id="personal-survey"
        class="flex flex-col w-full min-h-full justify-center items-center px-8 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-4/5 text-light">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title text-center">{{ language == 'en' ? 'Personal survey' : 'Ankieta osobowa' }}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100" fill="#E6E6E6">
                    <path
                        d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm40-80h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-40 400v-560 560Z" />
                </svg>
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
                        <path
                            d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z" />
                    </svg>
                    <h2 class="text-title">
                        {{ language == 'en'
                            ? 'How old are you?'
                            : 'Ile masz lat?'
                        }}
                    </h2>
                </div>
                <div class="flex items-center gap-16 w-full flex-wrap">
                    <div v-for="data in ages" :key="data.key" class="flex gap-2">
                        <RadioButton v-model="selectedAge" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                        <label :for="`${data.key}`">{{ data.labels ? language == 'en' ? data.labels.en : data.labels.pl :
                            data.value }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
                            fill="#E6E6E6">
                            <path
                                d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
                            fill="#E6E6E6">
                            <path
                                d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z" />
                        </svg>
                    </div>
                    <h2 class="text-title">
                        {{ language == 'en'
                            ? 'Select gender'
                            : 'Wybierz płeć'
                        }}</h2>
                </div>
                <div class="flex items-center gap-16 w-full flex-wrap">
                    <div v-for="data in genderData" :key="data.key" class="flex gap-2">
                        <RadioButton v-model="selectedGender" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                        <label :for="`${data.key}`">{{ data.labels ? language == 'en' ? data.labels.en : data.labels.pl :
                            data.value }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
                        <path
                            d="M274-360q31 0 55.5-18t34.5-47l15-46q16-48-8-88.5T302-600H161l19 157q5 35 31.5 59t62.5 24Zm412 0q36 0 62.5-24t31.5-59l19-157H659q-45 0-69 41t-8 89l14 45q10 29 34.5 47t55.5 18Zm-412 80q-66 0-115.5-43.5T101-433L80-600H40v-80h262q44 0 80.5 21.5T440-600h81q21-37 57.5-58.5T659-680h261v80h-40l-21 167q-8 66-57.5 109.5T686-280q-57 0-102.5-32.5T520-399l-15-45q-2-7-4-14.5t-4-21.5h-34q-2 12-4 19.5t-4 14.5l-15 46q-18 54-63.5 87T274-280Z" />
                    </svg>
                    <h2 class="text-title">
                        {{ language == 'en'
                            ? 'Do you have lenses or glasses?'
                            : 'Czy nosisz okulary lub soczewki kontaktowe?'
                        }}
                    </h2>
                </div>
                <div class="flex items-center gap-16 w-full flex-wrap">
                    <div v-for="data in lensesOrGlasses" :key="data.key" class="flex gap-2">
                        <RadioButton v-model="selectedLensesOrGlasses" :inputId="`${data.key}`" name="dynamic"
                            :value="data.value" />
                        <label :for="`${data.key}`">{{ data.value ? language == 'en' ? 'Yes' : 'Tak' : language == 'en' ?
                            'No' : 'Nie' }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
                        <path
                            d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
                    <h2 class="text-title">
                        {{ language == 'en'
                            ? 'Select visual impairments (if any)'
                            : 'Zaznacz wady wzroku, jeśli jakieś posiadasz'
                        }}
                    </h2>
                </div>
                <div class="flex items-center gap-16 w-full flex-wrap">
                    <div :key="1" class="flex gap-2">
                        <Checkbox v-model="selectedMyopia" @change="impairmetsInputChange" inputId="1" :binary="true" />
                        <label for="1">
                            {{ language == 'en'
                                ? 'Myopia'
                                : 'Krótkowzroczność'
                            }}
                        </label>
                    </div>
                    <div :key="2" class="flex gap-2">
                        <Checkbox v-model="selectedForesight" @change="impairmetsInputChange" inputId="2" :binary="true" />
                        <label for="2">
                            {{ language == 'en'
                                ? 'Foresight'
                                : 'Dalekowzroczność'
                            }}
                        </label>
                    </div>
                    <div :key="3" class="flex gap-2">
                        <Checkbox v-model="selectedDaltonism" @change="impairmetsInputChange" inputId="3" :binary="true" />
                        <label for="3">
                            {{ language == 'en'
                                ? 'Daltonism'
                                : 'Daltonizm'
                            }}
                        </label>
                    </div>
                    <div :key="4" class="flex gap-2">
                        <Checkbox v-model="selectedSpatialBlindness" @change="impairmetsInputChange" inputId="4"
                            :binary="true" />
                        <label for="4">
                            {{ language == 'en'
                                ? 'Spatial blindness'
                                : 'Ślepota przestrzenna'
                            }}
                        </label>
                    </div>
                    <div :key="5" class="flex gap-2">
                        <RadioButton v-model="selectedNoVisualImpairment" @change="noImpairmentInputChange" inputId="5"
                            :value="true" />
                        <label for="5">
                            {{ language == 'en'
                                ? 'No visual impairment'
                                : 'Brak wad wzroku'
                            }}
                        </label>
                    </div>
                </div>
            </div>
            <Button @click="submitSurvey" :label="language == 'en' ? 'Submit' : 'Kontynuuj'" outlined
                :disabled="!checkSelected()" />
        </div>
    </div>
</template>

<script setup>
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from '../firebaseConfig.js'
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import RadioButton from "primevue/radiobutton"
import Button from "primevue/button"
import { useRouter } from 'vue-router'
import { useStore } from '../store.js'
import { storeToRefs } from "pinia"
import MenuComponent from "../components/MenuComponent.vue"
import Checkbox from 'primevue/checkbox'

const store = useStore()
const { sessionId, language } = storeToRefs(store)

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

const genderData = [{ key: 1, value: 'Male', labels: { en: 'Male', pl: 'Mężczyzna' } },
{ key: 2, value: 'Female', labels: { en: 'Female', pl: 'Kobieta' } },
{ key: 3, value: 'Do not want to give', labels: { en: 'Do not want to give', pl: 'Nie chcę podawać' } }]
const ages = [{ key: 1, value: 'Under 18', labels: { en: 'Under 18', pl: 'Poniżej 18' } }, { key: 2, value: '18-25' }, { key: 3, value: '25-30' }, { key: 4, value: '30-35' },
{ key: 5, value: '40-50' }, { key: 6, value: '50-60' }, { key: 7, value: '60-70' }]
const lensesOrGlasses = [{ key: 1, value: true }, { key: 2, value: false }]

async function submitSurvey() {
    await setDoc(doc(measurementsRef, sessionId.value), {
        user: {
            gender: selectedGender.value,
            age: selectedAge.value,
            lensesOrGlasses: selectedLensesOrGlasses.value,
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

<style scoped>
#animated {
    animation: fadeIn ease-in .9s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
}
</style>