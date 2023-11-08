<template>
    <div class="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center bg-layer-color text-light py-16 gap-16 text-center">
		<h1> {{ video.title }}</h1>
		<div class="flex flex-col items-center gap-8">
			<h2>It is recommended to enable fullscreen mode. Click here to toggle</h2>
			<button>
				<FullscreenIcon @click="$emit('toggleFullScreen')"></FullscreenIcon>
			</button>
		</div>
		<div class="flex flex-col items-center gap-8">
			<h2>Press the button below to start the video</h2>
			<button>
				<StartIcon @click="$emit('play')"></StartIcon>
			</button>
		</div>
	</div>
</template>

<script setup>
import FullscreenIcon from '../assets/FullscreenIcon.vue'
import StartIcon from '../assets/StartIcon.vue'

defineEmits(['play', 'toggleFullScreen'])
defineProps({
	video: {
		type: Object,
		required: true,
		default: { index: -1, title: 'Title'}
	}
})
</script>