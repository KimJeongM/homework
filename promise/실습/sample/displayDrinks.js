// 
import getElement from './getElement.js'; 
import { hideLoading } from './loading.js';

const displayDrinks =  async ({drinks}) =>{
    const section = getElement('.list'); 
    const title = getElement('.title'); 

    if(!drinks){
        hideLoading();
        title.textContent = 'sorry, no drink'; 
        section.innerHTML = null; 
        return;  
    }

    const newDrinks = drinks.map((drink) =>{
        const {idDrink : id, strDrink : name, strDrinkThumb:image} = drink; 
        return `<li class="item" data-id="${id}">
        <a href="./drinks.html">
            <img src="${image}" alt=${name}>
            <p class="name">${name}</p>
        </a>
    </li>`
    }).join('');
    hideLoading();
    title.textContent = ''; 
    section.innerHTML = newDrinks; 
    return section;
}



export default displayDrinks; 