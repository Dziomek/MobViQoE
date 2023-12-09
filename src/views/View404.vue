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
            <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100"
                fill="#E6E6E6">
                <path
                    d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
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
import { storeToRefs } from 'pinia'

const store = useStore()
const { language } = storeToRefs(store)
</script>