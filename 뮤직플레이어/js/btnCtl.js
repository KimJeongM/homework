import displaySong from './displaySong.js'; 
import {nowSong} from './makeList.js';
import BtnDrag from './btnDrag.js';
import { timeShow } from "../util.js";

let isPlaying = false; 
let audioData;
let songIndex;
const btns = document.querySelector('.btns'); 
const progress = document.querySelector('.progress'); 
const volProgress = document.querySelector('.vol-progress');
//const audio = document.getElementById('audio');

const btnCtl = async (data, index) =>{
    audioData = await data;
    songIndex = await index; 

    btns.querySelector('.prev-btn').addEventListener('click', (e)=>{
        toNextSong(false); 
    }); 
    btns.querySelector('.next-btn').addEventListener('click', (e)=>{
        toNextSong(true); 
    });

    btns.querySelector('.play-btn').addEventListener('click', (e)=>{
        (isPlaying ? pauseSong() : playSong())
    });

    progress.querySelector('.progress-bar').addEventListener('click', (e)=>{
        e.stopImmediatePropagation();
        setProgress(e.offsetX); 
    });

    btns.querySelector('.volume-btn').addEventListener('click', (e)=>{
        btns.querySelector('.vol-progress').classList.toggle('show')
    }); 

    setVolume(0.5, true);
    loadSong();
}

const loadSong = () =>{
    audio.addEventListener('timeupdate', (e) =>{
        if(!isPlaying) return;
        const {duration, currentTime} = e.target; 
        const frac = currentTime / duration;

        progress.querySelector('.current').style.width = `${frac * 100}%` ;
        progress.querySelector('.cir').style.transform = `translateX(${frac * progress.clientWidth}px)`;
        progress.querySelector('.current-time').innerHTML = timeShow(audio.currentTime);
    });

    audio.addEventListener('ended', (e) =>{
        e.preventDefault();
        e.stopPropagation();
        toNextSong(true); 
    })

    document.addEventListener('cirDragEnd', (e)=>{
        if(e.detail == progress.querySelector('.progress-bar')){
            const t = progress.querySelector('.cir').style.transform.replace(/[^0-9.]/g, ''); 
            setTimeout(()=>{
                setProgress(t * 1); 
                //playSong();
            }); 
        }else{
            const v = volProgress.querySelector('.cir').style.transform.replace(/[^0-9.]/g, '');
            setVolume(v / volProgress.clientWidth);
        }
    }); 

    document.addEventListener('cirDragMove', (e)=>{
        if(e.detail == progress.querySelector('.progress-bar')){
            pauseSong();
        }
    })
    
    new BtnDrag(document.querySelector('.progress-bar'));
    new BtnDrag(document.querySelector('.vol-progress')); 
}

const setVolume = (val, f = false) =>{
    audio.volume = val;
    const volBtn = document.querySelector('.volume-btn .fas'); 
    volBtn.classList.value = (val == 0)? 'fas fa-volume-off' : (val == 1)?  'fas fa-volume-up' : 'fas fa-volume-down';
    
    if(f){
        volProgress.querySelector('.current').style.width = `${val * 100}%`;
        volProgress.querySelector('.cir').style.transform = `translateX(${volProgress.clientWidth * val}px)`
    }
}

const setProgress = (val) =>{
   var percent = val / progress.querySelector('.progress-bar').clientWidth; 
   if(percent == 0) return ; 
   audio.currentTime = percent * audio.duration; 
}

const setSongIndex = (index) =>{
    songIndex = index;
}

const setData = (data) => {
    audioData = data;
}

const pauseSong = () =>{
    console.log('pauseSong')
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

    const evt = new CustomEvent('songIndex', {detail : songIndex}); 
    document.dispatchEvent(evt); 

    displaySong(audioData[songIndex]);
    nowSong(songIndex);
    setProgress(0);
    playSong();
    console.log(isPlaying)
}

export {btnCtl, loadSong};