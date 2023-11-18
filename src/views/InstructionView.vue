<template>
    <div id="instruction" class="flex flex-col w-full h-full justify-center items-center px-8 py-16 gap-16">
        <h1>Instruction</h1>
        <Button @click="navigateToSurvey" label="Navigate to survey" outlined/>
    </div>
</template>

<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToSurvey() {
    router.push({ name: 'survey' })
}

</script>