<template>
    <div id="instruction" class="flex flex-col w-full h-full justify-center items-center py-16 gap-16">
        <h1>MobiViQoE</h1>
        <Button @click="navigateToInstruction" label="Get started" outlined/>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

function navigateToInstruction() {
    router.push({ name: 'instruction' })
}

</script>
