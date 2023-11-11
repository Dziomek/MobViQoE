<template>
    <div id="instruction" class="flex flex-col w-full h-full justify-center items-center py-16 gap-16">
        <h1>Instruction</h1>
        <Button @click="navigateToSurvey" label="Navigate to survey" outlined/>
    </div>
</template>

<script setup>
import Button from 'primevue/button'
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function navigateToSurvey() {
    router.push({ name: 'survey' })
}

onMounted(() => {
    console.log(route)
})

</script>