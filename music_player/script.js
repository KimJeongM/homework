const image = document.querySelector('img'); 
const title = document.getElementById('title'); 
const artist = document.getElementById('artist'); 
const music = document.querySelector('audio'); 
const progressContainer = document.getElementById('progress-container'); 
const progress = document.getElementById('progress'); 
const currentTimeEl = document.getElementById('current-time'); 
const durationEl = document.getElementById('duration'); 
const prevBtn = document.getElementById('prev'); 
const playBtn = document.getElementById('play'); 
const nextBtn = document.getElementById('next'); 

const songs = [
    {
        name: "music-1",
        displayName: "Adventures",
        artist: "A Himitsu",
    },
    {
        name: "music-2",
        displayName: "High",
        artist: "JPB",
    },
    {
        name: "music-3",
        displayName: "We Are One",
        artist: "Vexento",
    },
];
let songIndex; 
let isPlaying = false; 

function loadSong(song){
    title.textContent = song.displayName; 
    artist.textContent = song.artist; 
    music.src = `music/${song.name}.mp3`; 
    image.src = `img/${song.name.replace('music', 'img')}.jpg`; 
}

function playSong(){
    isPlaying = true; 
    playBtn.classList.replace('fa-play', 'fa-pause'); 
    playBtn.setAttribute('title', 'Pause'); 
    music.play(); 

}

function pauseSong(){
    isPlaying = false; 
    playBtn.classList.replace('fa-pause', 'fa-play'); 
    playBtn.setAttribute('title', 'Play'); 
    music.pause(); 
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement; 
        const progressPercent = (currentTime / duration) * 100; 
        progress.style.width = `${progressPercent}%`; 

        const durationMinutes = Math.floor(duration / 60); 
        let durationSeconds = Math.floor(duration % 60); 
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes} : ${durationSeconds}`
        }

        const currentMinutes = Math.floor(currentTime / 60); 
        let currentSeconds = Math.floor(currentTime % 60); 
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`; 
    }
}

function init(){
    songIndex = 0; 
    loadSong(songs[songIndex]); 

    playBtn.addEventListener('click', (e)=>{
        isPlaying? pauseSong() : playSong();
    }); 
    nextBtn.addEventListener('click', (e)=>{
        toNextSong(true); 
    }); 
    prevBtn.addEventListener('click', (e)=>{
        toNextSong(false); 
    }); 
    music.addEventListener('timeupdate', updateProgressBar); 
    music.addEventListener('ended', ()=>{
        toNextSong(true); 
    }); 

    progressContainer.addEventListener('click', setProgressBar)
}

function setProgressBar(e){
    const width = this.clientWidth; 
    const clickX = e.offsetX;
    const {duration} = music
    console.dir(music)
    music.currentTime = (clickX / width) * duration;
}

function toNextSong(isNext){
    if(isNext){
        songIndex ++; 
        if(songIndex > songs.length - 1){
            songIndex = 0; 
        }
    }else{
        songIndex --; 
        if(songIndex < 0){
            songIndex = songs.length - 1; 
        }
    }
    loadSong(songs[songIndex]); 
    playSong();
}

//-----------

init()
