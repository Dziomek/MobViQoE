<template>
    <div class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center bg-layer-color text-light py-16 gap-16 text-center">
		<h1 class="text-title"> {{ video.title }}</h1>
		<div class="flex flex-col items-center gap-8">
			<div class="flex flex-col gap-1">
				<h2>It is recommended to enable fullscreen mode. Click below to toggle</h2>
				<h3>(You can change it at any time by clicking 
					<span class="underline">F11</span> 
					on your computer or the 
					<span class="underline">back button</span> 
					on your phone)
				</h3>
			</div>
			
			<button>
				<FullscreenIcon @click="$emit('toggleFullScreen')"></FullscreenIcon>
			</button>
		</div>
		<div class="flex flex-col items-center gap-6">
			<h2>Press the button below to start the video</h2>
			<button>
				<StartIcon @click="$emit('play')"></StartIcon>
			</button>
		</div>
	</div>
</template>

<script setup>
import FullscreenIcon from '../assets/icons/FullscreenIcon.vue'
import StartIcon from '../assets/icons/StartIcon.vue'

defineEmits(['play', 'toggleFullScreen'])
defineProps({
	video: {
		type: Object,
		required: true,
		default: { index: -1, title: 'Title'}
	}
})
</script>