<template>
    <MenuComponent />
    <div id="instruction" class="flex flex-col w-full min-h-full justify-center items-center px-32 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-full">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title">{{ language == 'en' ? 'Information' : 'Informacja' }}</h1>
                <InformationIcon />
            </div>
            <div id="information" class="flex flex-col flex-wrap gap-8 text-light justify-start w-2/3">
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <PersonalSurveyIcon width="40" height="40"/>
                        <h2 class="text-title">1) Personal survey</h2>
                    </div>
                    <span>
                        Poprosimy Cię o wypełnienie krótkiej ankiety osobowej, która pomoże nam lepiej zinterpretować wynik badania. 
                        Ankieta nie powinna zająć dłużej niż minutę. <GoodIcon />
                    </span>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <CameraIcon width="40" height="40"/>
                        <h2 class="text-title">2) Video</h2>
                    </div>
                    <span>
                        Na ekranie ukaże się wideo o specjalnie dobranych parametrach, które powinny wpłynąć na jego jakość. Nie ma możliwości zatrzymywania i ponownego odtwarzania danego wideo.
                    </span>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <StarIcon />
                        <h2 class="text-title">3) Assessment</h2>
                    </div>
                    <span>
                        Poprosimy Cię o ocenę wideo. W tym kroku możesz określić, jak bardzo podobało Ci się to wideo w skali od 1 do 5.
                    </span>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <h2>*Ankieta będzie składać się z {{ SURVEY_LENGTH }} sekwencji wideo. Jeśli nie masz ochoty, nie musisz oceniać wszystkich - ankietę można przerwać
                        w każdej chwili.
                    </h2>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <h2>*Po opuszczeniu sesji istnieje możliwość powrotu do niej w ciągu 24h.
                    </h2>
                </div>
            </div>
            <Button @click="navigateToSurvey" icon="pi pi-book" label="Rozpocznij ankietę" outlined/>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import InformationIcon from '../assets/icons/InformationIcon.vue'
import MenuComponent from '../components/MenuComponent.vue';
import PersonalSurveyIcon from '../assets/icons/PersonalSurveyIcon.vue'
import GoodIcon from '../assets/icons/GoodIcon.vue';
import CameraIcon from '../assets/icons/CameraIcon.vue';
import StarIcon from '../assets/icons/StarIcon.vue'
import { SURVEY_LENGTH } from '../videoConfig';
import { useStore } from '../store';
import { storeToRefs } from 'pinia';

const router = useRouter()

const store = useStore()
const { language } = storeToRefs(store)

function navigateToSurvey() {
    router.push({ name: 'survey' })
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