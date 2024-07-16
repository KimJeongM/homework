import displaySong from "./displaySong.js";
const list = document.querySelector('.list-container > .list'); 
const makeList = (data, index) =>{
    let songIndex = index;
    let audioData = data;
    const itemes = data.map((item, index)=>{
        const {artist, image, source, title} = item; 
        return `
            <li class="item">
                <a href="#" data-music="${source}" data-id="${index}">
                    <span class="img"><img src="${image}" alt=""></span>
                    <div class="music-info">
                        <p class="title">${title}</p>
                        <p class="artist">${artist}</p>
                    </div>
                </a>
                <button type="button" class="sort-btn"><i class="fas fa-grip-lines"></i></button>
            </li>
        `
    }).join(''); 
    
    list.innerHTML = itemes;
    list.addEventListener('click', (e) =>{
        e.preventDefault(); 
        let target = e.target;
        while(target.tagName  !== 'A'){
            target = target.parentNode; 
            if(target.tagName == 'BODY'){
                target = null; 
                return; 
            }
        }
        songIndex = target.dataset.id; 
        displaySong(audioData[songIndex]);
        nowSong(songIndex);

        const clickEvent= new Event('click', {bubbles : true});
        const evt = new CustomEvent('songIndex', {detail : songIndex}); 
        document.dispatchEvent(evt); 
        document.querySelector('.play-btn').dispatchEvent(clickEvent);
    })
}

const nowSong = (id) => {
    console.log(id);
    [...list.querySelectorAll('.item')].forEach((item, index)=>{
        item.closest('.item').classList.remove('now')
        if(index === id * 1){
            const parent = item.closest('.item'); 
            parent.classList.add('now');
        }
    }); 
}

export {makeList, nowSong}