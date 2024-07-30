import { timeShow } from "../util.js";
const player = document.querySelector('.player-container'); 
const musicInfoElem = player.querySelector('.music-info'); 
const progress = player.querySelector('.progress');

const displaySong = (songInfo) =>{
    const {artist, image, source, title} = songInfo; 
    const musicInfo = `
                <div class="music-img"><img src="${image}" alt=""></div>
                <div class="music-text">
                    <p class="title">${title}</p>
                    <p class="artist">${artist}</p>
                </div>
                <audio src="${source}" id="audio"></audio>
                `; 
    musicInfoElem.innerHTML = musicInfo;

    const elemAppendEvent = new CustomEvent('elemAppendEvent', {detail : 'test'}); 
    document.dispatchEvent(elemAppendEvent);

    detailInfo();
}

const detailInfo= () =>{
    audio.addEventListener('loadedmetadata', (e)=>{
        progress.querySelector('.duration').innerHTML = timeShow(audio.duration);
    }); 
}



export default displaySong; 