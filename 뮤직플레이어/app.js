import fetchData from './js/fetch.js'
import displaySong from './js/displaySong.js'; 
import {btnCtl, loadSong} from './js/btnCtl.js'; 
import {makeList, nowSong} from './js/makeList.js'


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
    });

    document.addEventListener('dataUpdata', (e) =>{
        data = e.detail; 
    })

}

window.addEventListener('DOMContentLoaded', init)


