<template>
    <div class="flex flex-1 justify-end" :class="height > width ? 'transform rotate-90 origin-center' : ''">
        <video-player :width="width > height ? width : height" :height="height < width ? height : width" src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" 
            controls :loop="true" autoplay="play" muted responsive/>
    </div>
    
</template>

<script setup>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { onMounted, ref } from 'vue'

const height = ref(window.innerHeight)
const width = ref(window.innerWidth)

</script>