<template>
	<MenuComponent />
    <div class="absolute top-0 left-0 w-full min-h-full max-h-screen z-10 flex flex-col justify-center items-center bg-layer-color text-light text-center px-8 py-16 gap-16 overflow-auto">
		<h1 class="text-title"> {{ video.title }}</h1>
		<div class="flex flex-col items-center gap-8">
			<div class="flex flex-col gap-1">
				<h2>
				{{ language == 'en' 
				? 
				'It is recommended to enable fullscreen mode. Click below to toggle' 
				: 
				'Zaleca się włączenie trybu pełnoekranowego. Możesz to zrobić klikając poniższy przycisk'
				}}
				</h2>
				<h3 v-if="language == 'en'">
					(You can change it at any time by clicking 
					<span class="underline">F11</span> 
					on your computer or the 
					<span class="underline">back button</span> 
					on your phone)
				</h3>
				<h3 v-else="language == 'en'">
					(Możesz to zmienić w każdej chwili klikając 
					<span class="underline">F11</span> 
					na komputerze lub
					<span class="underline">przycisk kroku w tył</span> 
					na telefonie)
				</h3>
			</div>
			<button>
				<FullscreenIcon @click="$emit('toggleFullScreen')"></FullscreenIcon>
			</button>
		</div>
		<div class="flex flex-col items-center gap-6">
			<h2>
				{{ language == 'en' 
				? 
				'Press the button below to start the video' 
				: 
				'Kliknij poniższy przycisk by rozpocząć wideo'
				}}
			</h2>
			<button>
				<StartIcon @click="$emit('play')"></StartIcon>
			</button>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import FullscreenIcon from '../assets/icons/FullscreenIcon.vue'
import StartIcon from '../assets/icons/StartIcon.vue'
import { useStore } from '../store';
import MenuComponent from './MenuComponent.vue';

const store = useStore()
const { language } = storeToRefs(store)

defineEmits(['play', 'toggleFullScreen'])
defineProps({
	video: {
		type: Object,
		required: true,
		default: { index: -1, title: 'Title'}
	}
})
</script>