<template>
    <div id="404error"
        class="flex flex-col w-full min-h-full justify-center items-center px-32 py-16 bg-layer-color overflow-auto">
        <div class="flex flex-col items-center gap-8">
            <h1 class="text-title">
                {{ language == 'en'
                    ? '404 Not Found'
                    : '404 Not Found'
                }}
            </h1>
            <ErrorIcon />
            <div class="flex flex-col flex-wrap gap-4 text-light text-center justify-center">
                <h2>
                    {{ language == 'en'
                        ? 'Page with this address does not exist'
                        : 'Strona o podanym adresie nie istnieje'
                    }}
                </h2>
                <h3>
                    {{ language == 'en'
                        ? 'Check if address you entered is valid'
                        : 'Sprawdź czy adres, który wpisałeś, jest poprawny'
                    }}
                </h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../store'
import ErrorIcon from '../assets/icons/ErrorIcon.vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const { language } = storeToRefs(store)
</script>