<template>
	<RouterView/>
</template>


<script setup>
import { provide, onMounted } from 'vue'
import { useStore } from './store'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { db } from './firebaseConfig'
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"

const appElement = document.getElementById('app')
provide('appElement', appElement)

const store = useStore()
const { sessionId } = storeToRefs(store)

const measurementsRef = collection(db, "measurements")

async function initDocument() {
	
}

onMounted(() => {
	sessionId.value = uuidv4()
	console.log(sessionId.value)
})

</script>

<style scoped>
</style>
