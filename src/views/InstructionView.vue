<template>
    <MenuComponent />
    <div id="instruction"
        class="flex flex-col w-full min-h-full justify-center items-center px-32 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-full">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title">
                    {{ language == 'en'
                        ? 'Information'
                        : 'Informacja'
                    }}
                </h1>
                <InformationIcon />
            </div>
            <div id="information" class="flex flex-col flex-wrap gap-8 text-light justify-start w-2/3">
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <PersonalSurveyIcon width="40" height="40" />
                        <h2 class="text-title">
                            {{ language == 'en'
                                ? '1) Personal survey'
                                : '1) Ankieta osobowa'
                            }}
                        </h2>
                    </div>
                    <span>
                        {{ language == 'en'
                            ? 'We will ask you to complete a short personal questionnaire that will help us better interpret the research results. The survey should take no longer than a minute'
                            : 'Poprosimy Cię o wypełnienie krótkiej ankiety osobowej, która pomoże nam lepiej zinterpretować wynik badania. Ankieta nie powinna zająć dłużej niż minutę'
                        }}
                        <GoodIcon />
                    </span>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <CameraIcon width="40" height="40" />
                        <h2 class="text-title">
                            {{ language == 'en'
                                ? 'Video'
                                : 'Wideo'
                            }}
                        </h2>
                    </div>
                    <span>
                        {{ language == 'en'
                            ? 'A video with specially selected parameters will appear on the screen, which should affect its quality. It is not possible to stop and replay a given video.'
                            : 'Na ekranie ukaże się wideo o specjalnie dobranych parametrach, które powinny wpłynąć na jego jakość. Nie ma możliwości zatrzymywania i ponownego odtwarzania danego wideo.'
                        }}
                    </span>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <StarIcon />
                        <h2 class="text-title">
                            {{ language == 'en'
                                ? 'Assessment'
                                : 'Ocena'
                            }}
                        </h2>
                    </div>
                    <span>
                        {{ language == 'en'
                            ? 'We will ask you to rate the video. In this step you can rate how much you liked this video on a scale of 1 to 5.'
                            : 'Poprosimy Cię o ocenę wideo. W tym kroku możesz określić, jak bardzo podobało Ci się to wideo w skali od 1 do 5.'
                        }}
                    </span>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <h2>
                        {{ language == 'en'
                            ? `*The survey will consist of ${SURVEY_LENGTH} video sequences. If you don't want to, you don't have to rate everyone - you can stop the survey at any time.`
                            : `*Ankieta będzie składać się z ${SURVEY_LENGTH} sekwencji wideo. Jeśli nie masz ochoty, nie musisz oceniać wszystkich - ankietę można przerwać w każdej chwili.`
                        }}
                    </h2>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <h2>
                        {{ language == 'en'
                            ? '*After leaving a session, you can return to it within 24 hours.'
                            : '*Po opuszczeniu sesji istnieje możliwość powrotu do niej w ciągu 24h.'
                        }}
                    </h2>
                </div>
            </div>
            <Button @click="navigateToSurvey" icon="pi pi-book" :label="language == 'en' ? 'Start the survey' : 'Rozpocznij ankietę'" outlined />
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
}</style>