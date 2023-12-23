export const VIDEO_CONFIG = [
    // { index: 0, title: 'Big Buck Bunny', src: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
    // { index: 1, title: 'vid1', src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/2022-05-28%2C_Geese_in_the_Bear_Creek_Park%2C_Redmond%2C_Wasington%2C_video3.webm'},
    // { index: 2, title: 'vid2', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Badger_collecting_bedding_material.webm'},
    // { index: 3, title: 'vid3', src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Squirrel_eating_cicada.ogg'},
    // { index: 4, title: 'vid4', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/2021-08-11%2C_Bison_crosses_the_road%2C_Yellowstone_National_Park.webm'},
    { index: 1, title: 'RUST_beach', src: new URL('../videos/rust_beach_excellent.mp4', import.meta.url).href},
]

export const VIDEOS_NUMBER = VIDEO_CONFIG.length

export let SURVEY_LENGTH = 3

if(SURVEY_LENGTH > VIDEOS_NUMBER) SURVEY_LENGTH = VIDEOS_NUMBER
