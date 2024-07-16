import displaySong from './displaySong.js'; 
import drag from './drag.js'; 
import {nowSong} from './makeList.js';


let isPlaying = false; 
let audioData;
let songIndex;
const btns = document.querySelector('.btns'); 
const progress = document.querySelector('.progress'); 
let audio 


const btnCtl = async (data, index) =>{
    audioData = await data;
    songIndex = await index; 
    audio = await document.getElementById('audio');

    btns.querySelector('.prev-btn').addEventListener('click', (e)=>{
        toNextSong(false); 
    }); 
    btns.querySelector('.next-btn').addEventListener('click', (e)=>{
        toNextSong(true); 
    });

    btns.querySelector('.play-btn').addEventListener('click', (e)=>{
        isPlaying? pauseSong() : playSong();
    });

    progress.querySelector('.progress-bar').addEventListener('click', (e)=>{
        setProgress(e.offsetX);
    })
}

const setProgress = (val) =>{
    const width =  progress.querySelector('.progress-bar').clientWidth; 
    audio.currentTime = (val / width) * audio.duration; 
}
const setSongIndex = (index) =>{
    songIndex = index;
}

const setData = (data) => {
    audioData = data;
}

const pauseSong = () =>{
    isPlaying = false;
    btns.querySelector('.play-btn > i').classList.replace('fa-pause', 'fa-play'); 
    audio.pause();
}

const playSong = () => {
    console.log('playSong')
    isPlaying = true; 
    btns.querySelector('.play-btn > i').classList.replace('fa-play', 'fa-pause'); 
    audio.play(); 
}

const toNextSong = (isNext) =>{
    if(isNext){
        songIndex++; 
        if(songIndex > audioData.length - 1){
            songIndex = 0
        }
    }else{
        songIndex--; 
        if(songIndex< 0){
            songIndex = audioData.length - 1
        }
    }

    let evt = new CustomEvent('songIndex', {detail : songIndex}); 
    document.dispatchEvent(evt); 
    displaySong(audioData[songIndex]);
    nowSong(songIndex);
    playSong();
    setProgress(0)
}

export {btnCtl, setProgress};