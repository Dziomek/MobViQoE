<template>
    <MenuComponent />
    <div id="instruction"
        class="flex flex-col w-full min-h-full justify-center items-center px-8 py-16 bg-layer-color overflow-auto">
        <div id="animated" class="flex flex-col gap-16 items-center w-full">
            <div class="flex flex-col items-center gap-8">
                <h1 class="text-title">
                    {{ language == 'en'
                        ? 'Information'
                        : 'Informacja'
                    }}
                </h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100" fill="#E6E6E6">
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>            
            </div>
            <div id="information" class="flex flex-col flex-wrap gap-8 text-light justify-start w-4/5">
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
                            <path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm40-80h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-40 400v-560 560Z"/>
                        </svg>
                        <h2 class="text-title">
                            {{ language == 'en'
                                ? '1) Personal survey'
                                : '1) Ankieta osobowa'
                            }}
                        </h2>
                    </div>
                    <p>
                        {{ language == 'en'
                            ? 'We will ask you to complete a short personal questionnaire that will help us better interpret the research results. The survey should take no longer than a minute'
                            : 'Poprosimy Cię o wypełnienie krótkiej ankiety osobowej, która pomoże nam lepiej zinterpretować wynik badania. Ankieta nie powinna zająć dłużej niż minutę'
                        }}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E6E6E6">
                            <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/>
                        </svg>
                    </p>
                </div>
                <div class="flex flex-col w-full break-normal gap-2">
                    <div class="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z"/>
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#E6E6E6">
                            <path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/>
                        </svg>
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
import MenuComponent from '../components/MenuComponent.vue';
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
