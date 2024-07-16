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
    detailInfo();
}

const detailInfo= () =>{
    const audio =  document.getElementById('audio'); 

    audio.addEventListener('loadedmetadata', (e)=>{
        progress.querySelector('.duration').innerHTML = timeShow(audio.duration);
    }); 

    audio.addEventListener('timeupdate', (e)=>{
        const {duration, currentTime} = e.target; 
        const progressPercent = (currentTime / duration) * 100; 
        progress.querySelector('.current').style.width = `${progressPercent}%` ;
        progress.querySelector('.current-time').innerHTML = timeShow(audio.currentTime);
    }); 

}

const timeShow = (time) =>{
    const minutes = addZero(Math.floor(time / 60)); 
    const seconds = addZero(Math.floor(time % 60));
    return `${minutes} : ${seconds}`; 
}

const addZero = (num) => num >= 10? num : '0' + num; 



export default displaySong; 