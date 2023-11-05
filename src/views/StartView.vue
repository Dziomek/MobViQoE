<template>
    StartView
    <button @click="router.push({name: 'session'})">Naigate to session</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>
