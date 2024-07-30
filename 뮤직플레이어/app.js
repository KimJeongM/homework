import fetchData from './js/fetch.js'
import displaySong from './js/displaySong.js'; 
import {btnCtl, loadSong, setSongIndex, setData} from './js/btnCtl.js'; 
import {makeList, nowSong} from './js/makeList.js'

/* 남은것  : localStorage / 터치 적용 */

const init = async () =>{
    const url = './js/list.json';
    let data = await fetchData(url); 
    let songIndex = 0;
    await displaySong(data[0]); 
    await btnCtl(data, songIndex);
    await makeList(data, songIndex);

    document.addEventListener('elemAppendEvent', (e)=>{
        console.log('elemAppendEvent')
        loadSong()
    });
   
    document.addEventListener('songIndex', (e)=>{
        songIndex = e.detail; 
        setSongIndex(songIndex); 
    });

  

    document.addEventListener('sortEnd', (e)=>{
        const positions = e.detail.positions;
        songIndex = e.detail.songIndex;
        data = positions.map((i) => data[i]); 

        setSongIndex(songIndex); 
        setData(data);
    })

}

window.addEventListener('DOMContentLoaded', init)


