<template>
    <div class="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-layer-color">
		<div class="relative flex flex-col z-100">
			<span>Video nr 1</span>
			<div class="flex">
				<button>
					<StartIcon @click="$emit('play')"></StartIcon>
				</button>
				<button>
					<FullscreenIcon @click="$emit('toggleFullScreen')"></FullscreenIcon>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import FullscreenIcon from '../assets/FullscreenIcon.vue'
import StartIcon from '../assets/StartIcon.vue'

defineEmits(['play', 'toggleFullScreen'])
</script>