import displaySong from './displaySong.js'; 
import {nowSong} from './makeList.js';
import btnDrag from './btnDrag.js';

let isPlaying = false; 
let audioData;
let songIndex;
const btns = document.querySelector('.btns'); 
const progress = document.querySelector('.progress'); 
const volProgress = document.querySelector('.vol-progress');

const btnCtl = async (data, index) =>{
    audioData = await data;
    songIndex = await index; 
    setVolume(0.5, true);

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
        e.stopImmediatePropagation();
        console.log('barClick')
        setProgress(e.offsetX); 
    });

    btns.querySelector('.volume-btn').addEventListener('click', (e)=>{
        btns.querySelector('.vol-progress').classList.toggle('show')
    }); 

    document.addEventListener('cirDragEnd', (e)=>{
       const d = e.detail; 
        if(d == progress.querySelector('.progress-bar')){
            const t = progress.querySelector('.cir').style.transform.replace(/[^0-9]/g, ''); 
            setTimeout(()=>{
                setProgress(t); 
            }); 
        }else{
            const v = volProgress.querySelector('.cir').style.transform.replace(/[^0-9]/g, '');
            setVolume(v / volProgress.clientWidth);
        }
    })

    
    btnDrag(document.querySelector('.progress-bar'));
    btnDrag(document.querySelector('.vol-progress')); 
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
}

export {btnCtl};