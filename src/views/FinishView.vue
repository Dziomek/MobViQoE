<template>
    <div id="instruction" class="flex flex-col w-full h-full justify-center items-center py-16 gap-16">
        <h1>Finish!</h1>
        <h2>Thank you for completing the test</h2>
        <h2>You can close the page or return to start</h2>
        <Button @click="navigateToStart" label="Get started" outlined/>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

function navigateToStart() {
    router.push({ name: 'start' })
}
</script>