export const VIDEO_CONFIG = [
    // { index: 0, title: 'Big Buck Bunny', src: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
    // { index: 1, title: 'vid1', src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/2022-05-28%2C_Geese_in_the_Bear_Creek_Park%2C_Redmond%2C_Wasington%2C_video3.webm'},
    // { index: 2, title: 'vid2', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Badger_collecting_bedding_material.webm'},
    // { index: 3, title: 'vid3', src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Squirrel_eating_cicada.ogg'},
    // { index: 4, title: 'vid4', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/2021-08-11%2C_Bison_crosses_the_road%2C_Yellowstone_National_Park.webm'},
    { index: 0, title: 'RUST_beach', src: 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/rust_beach_excellent.mp4'},
    { index: 1, title: 'NETFLIX_ship3', src: 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/netflix_sheep3_bad.mp4'},
    { index: 2, title: 'NETFLIX_stairs', src: 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/netflix_stairs_fair.mp4'},
    { index: 3, title: 'NETFLIX_ship4', src: 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/netflix_sheep4_bad.mp4'},
    { index: 4, title: 'NETFLIX_cave', src: 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/netflix_cave_fair.mp4'},
    { index: 5, title: 'NETFLIX_cliff', src: 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/netflix_cliff_bad.mp4'},
]

export const VIDEOS_NUMBER = VIDEO_CONFIG.length

export let SURVEY_LENGTH = 3

if(SURVEY_LENGTH > VIDEOS_NUMBER) SURVEY_LENGTH = VIDEOS_NUMBER

