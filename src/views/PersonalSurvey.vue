<template>
    <MenuComponent />
    <div id="personal-survey"
        class="flex flex-col w-full min-h-full justify-center items-center px-8 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-4/5 text-light">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title text-center">{{ language == 'en' ? 'Personal survey' : 'Ankieta osobowa' }}</h1>
                <PersonalSurveyIcon width="100" height="100" />
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <AgeIcon />
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
                        <label :for="`${data.key}`">{{ data.labels ? language == 'en' ? data.labels.en : data.labels.pl : data.value }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <div class="flex">
                        <FemaleIcon />
                        <MaleIcon />
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
                        <label :for="`${data.key}`">{{ data.labels ? language == 'en' ? data.labels.en : data.labels.pl : data.value }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full break-normal gap-8">
                <div class="flex items-center gap-2">
                    <EyeglassesIcon />
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
                    <EyeIcon />
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
                        <Checkbox v-model="selectedSpatialBlindness" @change="impairmetsInputChange" inputId="4" :binary="true" />
                        <label for="4">
                            {{ language == 'en'
                                ? 'Spatial blindness'
                                : 'Ślepota przestrzenna'
                            }}
                        </label>
                    </div>
                    <div :key="5" class="flex gap-2">
                        <RadioButton v-model="selectedNoVisualImpairment" @change="noImpairmentInputChange" inputId="5" :value="true" />
                        <label for="5">
                            {{ language == 'en'
                                ? 'No visual impairment'
                                : 'Brak wad wzroku'
                            }}
                        </label>
                    </div>
                </div>
            </div>
            <Button @click="submitSurvey" :label="language == 'en' ? 'Submit' : 'Kontynuuj'" outlined :disabled="!checkSelected()" />
        </div>
        <!-- <div class="flex justify-center">
            <h1 class="text-title">Personal survey</h1>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Select gender</h2>
            <div class="flex items-center gap-16 flex-wrap">
                <div v-for="data in genderData" :key="data.key" class="flex gap-2">
                    <RadioButton v-model="selectedGender" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                    <label :for="`${data.key}`">{{ data.value }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Select age</h2>
            <div class="flex items-center gap-16 flex-wrap">
                <div v-for="data in ages" :key="data.key" class="flex gap-2">
                    <RadioButton v-model="selectedAge" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                    <label :for="`${data.key}`">{{ data.value }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Do you have lenses or glasses?</h2>
            <div class="flex items-center gap-16 flex-wrap">
                <div v-for="data in lensesOrGlasses" :key="data.key" class="flex gap-2">
                    <RadioButton v-model="selectedLensesOrGlasses" :inputId="`${data.key}`" name="dynamic" :value="data.value" />
                    <label :for="`${data.key}`">{{ data.value ? 'Yes' : 'No' }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8 items-center">
            <h2>Select visual impairments (if any)</h2>
            <div class="flex items-center gap-16 flex-wrap">
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
        </div> -->
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
import PersonalSurveyIcon from "../assets/icons/PersonalSurveyIcon.vue"
import AgeIcon from '../assets/icons/AgeIcon.vue'
import MaleIcon from '../assets/icons/MaleIcon.vue'
import FemaleIcon from '../assets/icons/FemaleIcon.vue'
import EyeglassesIcon from '../assets/icons/EyeglassesIcon.vue'
import EyeIcon from '../assets/icons/EyeIcon.vue'
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